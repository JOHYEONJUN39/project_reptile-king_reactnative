import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import RNPickerSelect from 'react-native-picker-select'
import { MaterialIcons } from '@expo/vector-icons'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '../components/common/Input'
import SubmitButton from '../components/common/SubmitButton'
import CommunityLayout from '../components/layout/community'
import ImagePicker from 'expo-image-picker'
import { S3Client } from '@aws-sdk/client-s3'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { CommunityRouteProp } from '../types/RootStackParamList'
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from '@env'
import { useUploadImagesToS3 } from '../hooks/useUploadImagesToS3'

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
})

const useFetchCategories = (): void => {
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [allSubCategories, setAllSubCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const response = await axios.get('http://54.180.158.4:8000/api/categories')
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

    fetchCategories()
  }, [])

  return { categories, subCategories, setSubCategories, allSubCategories }
}

const EditPost = (): JSX.Element => {
  const route = useRoute<CommunityRouteProp>()
  const { uploadImages } = useUploadImagesToS3(s3Client, 'capstone-project-pachungking')
  const { postId } = route.params
  const navigation = useNavigation();
  const richText = useRef(null);
  const { control, handleSubmit, setValue } = useForm()
  const { categories, subCategories, setSubCategories, allSubCategories } = useFetchCategories(); // useFetchCategories는 이전 코드 참조
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedImageUris, setSelectedImageUris] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.get(`http://54.180.158.4:8000/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const postData = response.data
        setValue('title', postData.title)
        setSelectedMainCategory(postData.category.parent_id); // 가정: 메인 카테고리 ID를 바로 사용할 수 있음
        setSelectedSubCategory(postData.category_id); // 가정: 서브 카테고리 ID를 바로 사용할 수 있음
        richText.current?.setContentHTML(postData.content);
      } catch (error) {
        console.error('글 데이터를 불러오는 데 실패했습니다.', error);
        Alert.alert('오류', '글 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchPostData();
  }, [postId]);

  const convertImageToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error("Error converting image to Base64", e);
    }
  }

  const onPressAddImage = async () => {
    // 사용자 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('사진 라이브러리에 접근하기 위해 권한이 필요합니다.')
      return
    }
    // 라이브러리를 열어서 사용자가 이미지를 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1
    })
    // 사용자가 이미지를 선택하지 않았을 경우 함수 종료
    if (result.canceled) {
      return
    }
    const localImageUri = result.assets[0].uri;
    const base64Image = await convertImageToBase64(localImageUri)
    const uniqueId = generateUniqueId();
    const imageTag = `<img src="${base64Image}" id="${uniqueId}" style="width: 100%; height: auto">`
    richText.current?.insertHTML(imageTag)
    setSelectedImageUris(prevUris => [...prevUris, { uri: localImageUri, id: uniqueId }]) // 이미지 URI와 함께 식별자 저장
    richText.current?.insertText('\n')
  }

  const generateUniqueId = () => {
    return `id-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const onSubmit = async (data) => {
    try {
      let html = await richText.current?.getContentHtml()

      // 이미지를 S3에 업로드하고 URL 배열을 가져옴
      const imageData = selectedImageUris.map(({ uri, id }) => ({ url: uri, id }))
      const imgUrls = await uploadImages(imageData)

      // HTML 내의 base64 이미지 URL을 S3 URL로 교체
      imgUrls.forEach(({ url, id }) => {
        const imgRegex = new RegExp(`(<img [^>]*id="${id}"[^>]*>)`, 'g')
        console.log('imgRegex', imgRegex)
        html = html.replace(imgRegex, `<img src="${url}">`)
      })
      console.log('변환 후 html', html)
      const postData = {
        title: data.title,
        content: html,
        category_id: selectedSubCategory,
        img_urls: imgUrls.map(img => img.url)
      }
      const token = await AsyncStorage.getItem('authToken')
      await axios.patch(`http://54.180.158.4:8000/api/posts/${postId}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('글이 성공적으로 작성되었습니다.')
      navigation.goBack()
    } catch (error) {
      console.error('글 작성에 실패했습니다.', error)
      alert('글 작성에 실패했습니다.')
    }
  }
  return (
    <CommunityLayout title='파충류 이모저모' subtitle='주인님 같이 놀아요!' footer={false}>
      <View style={styles.inner}>
        {/* 제목 입력란 */}
        <Input
          name='title'
          control={control}
          placeholder='제목을 입력하세요'
          style={styles.input}
        />
        {/* 메인 카테고리 */}
        <RNPickerSelect
          onValueChange={(value: string) => { setSelectedMainCategory(value) }}
          placeholder={{ label: '메인 카테고리 선택', value: null }}
          items={categories}
          style={pickerSelectStyles}
          Icon={() => <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff" />}
        />
        {/* 서브 카테고리 */}
        <RNPickerSelect
          onValueChange={(value: string) => { setSelectedSubCategory(value) }}
          placeholder={{ label: '서브 카테고리 선택', value: null }}
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
              placeholder={'내용을 입력하세요...'}
              useContainer={false}
            />
          {/* 에디터의 툴바 */}
        </SafeAreaView>
        <SubmitButton
          label='작성완료'
          onPress={handleSubmit(onSubmit)}
          buttonStyle={styles.submitButton}
          textStyle={{ fontSize: 18, fontWeight: '500' }}
        />
      </View>
    </CommunityLayout>
  );
};

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

export default EditPost
