import React, { useEffect, useRef, useState } from 'react'
import CommunityLayout from '../components/layout/community'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import Input from '../components/common/Input'
import { useForm } from 'react-hook-form'
import RNPickerSelect from 'react-native-picker-select'
import { MaterialIcons } from '@expo/vector-icons'
import SubmitButton from '../components/common/SubmitButton'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { S3Client } from '@aws-sdk/client-s3'
import type { CategoryData, CategoryItem } from '../types/Community'
import { useUploadImagesToS3 } from '../hooks/useUploadImagesToS3'
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from '@env'

interface CategoryState {
  categories: CategoryItem[]
  subCategories: CategoryItem[]
  allSubCategories: CategoryItem[]
  setSubCategories: (subCategories: CategoryItem[]) => void
}

interface ImageUri {
  uri: string
  id: string
}

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
})

const useFetchCategories = (): CategoryState => {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [subCategories, setSubCategories] = useState<CategoryItem[]>([])
  const [allSubCategories, setAllSubCategories] = useState<CategoryItem[]>([])

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const response = await axios.get<CategoryData[]>('http://3.38.185.224:8000/api/categories')
        console.log('response', response.data)
        const mainCategories = response.data.filter(category => category.division === 'posts').map(category => ({
          label: category.name,
          value: String(category.id)
        }))
        setCategories(mainCategories)

        const subCategoriesData = response.data.filter(category => category.division === 'subPosts').map(category => ({
          label: category.name,
          value: String(category.id),
          parentId: String(category.parent_id)
        }))
        setSubCategories(subCategoriesData)
        setAllSubCategories(subCategoriesData)
      } catch (error) {
        console.error('카테고리를 불러오는 데 실패했습니다.', error)
      }
    }

    void fetchCategories()
  }, [])

  return { categories, subCategories, setSubCategories, allSubCategories }
}

const Write = (): JSX.Element => {
  const navigation = useNavigation()
  const { uploadImages } = useUploadImagesToS3(s3Client, 'capstone-project-pachungking')
  const richText = useRef<RichEditor>(null)
  const { control, handleSubmit } = useForm()
  const { categories, subCategories, setSubCategories, allSubCategories } = useFetchCategories()
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [selectedImageUris, setSelectedImageUris] = useState<ImageUri[]>([])

  useEffect(() => {
    if (selectedMainCategory !== null) {
      console.log(allSubCategories)
      const filteredSubCategories = allSubCategories.filter(subCategory => subCategory.parentId === selectedMainCategory)
      setSubCategories(filteredSubCategories)
      setSelectedSubCategory(null)
    } else {
      setSubCategories(allSubCategories)
    }
  }, [selectedMainCategory, allSubCategories])

  const convertImageToBase64 = async (uri: string): Promise<string | ArrayBuffer | null> => {
    try {
      const response = await fetch(uri)
      const blob = await response.blob()
      return await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => { resolve(reader.result) }
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    } catch (e: any) {
      return `Error converting image to Base64: ${e}`
    }
  }

  const onPressAddImage = async (): Promise<void> => {
    if (richText.current === null) {
      return
    }
    // 사용자 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('ライブラリ権限が必要です')
      return
    }
    // 라이브러리를 열어서 사용자가 이미지를 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4
    })
    // 사용자가 이미지를 선택하지 않았을 경우 함수 종료
    if (result.canceled) {
      return
    }
    const localImageUri = result.assets[0].uri
    const base64Image = await convertImageToBase64(localImageUri)
    // string타입이 아닌 null, ArrayBuffer 등이 반환되었을 경우 함수 종료
    if (typeof base64Image !== 'string') {
      console.error('base64Image is not a string')
      return
    }
    const uniqueId = generateUniqueId()
    const imageTag = `<img src="${base64Image}" id="${uniqueId}" style="width: 100%; height: auto">`
    richText.current.insertHTML(imageTag)
    // 이미지 URI랑 식별자 같이 저장
    setSelectedImageUris(prevUris => [...prevUris, { uri: localImageUri, id: uniqueId }])
    richText.current.insertText('\n')
  }

  const generateUniqueId = (): string => {
    return `id-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    try {
      let html = await richText.current?.getContentHtml()

      // 이미지를 S3에 업로드하고 URL 배열을 가져옴
      const imageData = selectedImageUris.map(({ uri, id }) => ({ url: uri, id }))
      const imgUrls = await uploadImages(imageData)

      // HTML 내의 base64 이미지 URL을 S3 URL로 교체
      imgUrls.forEach(({ url, id }) => {
        const imgRegex = new RegExp(`(<img [^>]*id="${id}"[^>]*>)`, 'g')
        console.log('imgRegex', imgRegex)
        html = html?.replace(imgRegex, `<img src="${url}">`)
      })
      const postData = {
        title: data.title,
        content: html,
        category_id: selectedSubCategory,
        img_urls: imgUrls.map(img => img.url)
      }
      const token = await AsyncStorage.getItem('authToken')
      await axios.post('http://3.38.185.224:8000/api/posts', postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // alert('글이 성공적으로 작성되었습니다.')
      navigation.goBack()
    } catch (error) {
      console.error('投稿に失敗しました', error)
      // alert('글 작성에 실패했습니다.')
    }
  }
  return (
    <CommunityLayout title='爬虫類あれこれ' subtitle='一緒に遊びましょう！' footer={false}>
      <View style={styles.inner}>
        {/* 제목 입력란 */}
        <Input
          name='title'
          control={control}
          placeholder='タイトルを入力してください'
          style={styles.input}
        />
        {/* 메인 카테고리 */}
        <RNPickerSelect
          onValueChange={(value: string) => { setSelectedMainCategory(value) }}
          placeholder={{ label: 'メインカテゴリー', value: null }}
          items={categories}
          style={pickerSelectStyles}
          Icon={() => <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff" />}
        />
        {/* 서브 카테고리 */}
        <RNPickerSelect
          onValueChange={(value: string) => { setSelectedSubCategory(value) }}
          placeholder={{ label: 'サブカテゴリー', value: null }}
          items={subCategories}
          style={pickerSelectStyles}
          Icon={() => <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff" />}
          value={selectedSubCategory}
        />
        <SafeAreaView style={styles.container}>
          {/* 리치 텍스트 에디터 */}
          <RichToolbar
            style={styles.richBar}
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.insertImage,
              actions.setStrikethrough
            ]}
            onPressAddImage={onPressAddImage}
            iconTint={'#fff'}
            selectedIconTint={'#2095F2'}
            selectedButtonStyle={{ backgroundColor: 'transparent' }}
          />
            <RichEditor
              ref={richText}
              style={styles.rich}
              editorStyle={{ backgroundColor: 'transparent', color: '#fff', placeholderColor: '#fff' }}
              placeholder={'本文を入力してください'}
              useContainer={false}
            />
          {/* 에디터의 툴바 */}
        </SafeAreaView>
        <SubmitButton
          label='投稿する'
          onPress={handleSubmit(onSubmit)}
          buttonStyle={styles.submitButton}
          textStyle={{ fontSize: 18, fontWeight: '500' }}
        />
      </View>
    </CommunityLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  richBar: {
    backgroundColor: '#39823E',
    borderRadius: 5,
    marginBottom: 32
  },
  rich: {
    width: '100%',
    minHeight: 300,
    height: 'auto',
    borderColor: '#39823E',
    borderWidth: 1,
    borderRadius: 5
  },
  input: {
    backgroundColor: 'transparent',
    color: '#fff',
    borderColor: '#39823E',
    borderWidth: 1,
    marginVertical: 8
  },
  submitButton: {
    backgroundColor: '#39823E',
    width: '100%',
    borderRadius: 5
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#fff',
    height: 48,
    borderRadius: 5,
    borderColor: '#39823E',
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    fontSize: 16
  },
  inputAndroid: { color: '#fff', fontSize: 16 },
  iconContainer: {
    top: 20,
    right: 8
  }
})

export default Write
