import SubmitButton from '../../components/common/SubmitButton'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import Line from '../common/Line'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import type { Category } from '../../types/Community'
import type { CommunityNavigationProp } from '../../types/RootStackParamList'

const CommunityFooter = (): JSX.Element => {
  const navigation = useNavigation()
  const communityNavigation = useNavigation<CommunityNavigationProp>()
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await axios.get<Category[]>('http://54.180.158.4:8000/api/categories')
      const categories = response.data.filter((category: Category) => category.division === 'posts')
      const subCategories = response.data.filter((category: Category) => category.division === 'subPosts')
      console.log('하단 카테고리', subCategories)
      setCategories(categories)
      setSubCategories(subCategories)
    } catch (error) {
      console.error('카테고리를 불러오는 중 오류가 발생했습니다.', error)
    }
  }
  useEffect(() => {
    void fetchCategories()
  }, [])

  const navigateToPosts = (categoryId: number, categoryName: string): void => {
    communityNavigation.navigate('Posts', { categoryId, categoryName })
  }

  const navigateToWrite = (): void => {
    // TODO: 로그인 여부 확인 후 글쓰기 페이지로 이동
    navigation.navigate('Write' as never)
  }

  const handleSearchSubmit = (): void => {
    if (searchQuery.trim() !== '') {
      communityNavigation.navigate('CommunitySearch', { searchQuery })
    }
  }
  return (
    <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
      <SubmitButton label='글쓰기' onPress={navigateToWrite} buttonStyle={styles.submitButton} textStyle={{ fontSize: 18, fontWeight: '500' }}/>
      {/* 인기글 section */}
      <TouchableOpacity style={styles.hotPostContainer} activeOpacity={0.8}>
        <Image
          source={{ uri: 'https://i.ibb.co/ftK8PNj/image.jpg' }}
          style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.overlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.hotPost}>
          <Text style={[styles.titleFont, styles.hotPostTitle]} numberOfLines={1}>지구에서 가장 파충류를 잘 알고있는 사람?</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.commonFont}>1달전 ・</Text>
            <Text style={styles.commonFont}> 4,139</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* 검색 section */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialIcons name='search' size={24} color='#fff' />
        <Text style={styles.commonFont}>검색어를 입력하세요</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder='검색어 입력 후 키보드의 검색 버튼 클릭'
        placeholderTextColor='#fff'
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
      />
      {/* 카테고리 section */}
      <View style={styles.categoryContainer}>
        {categories
          .map((category) => (
            <View key={category.id}>
              <TouchableOpacity onPress={() => { navigateToPosts(Number(category.id), category.name) }}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
              </TouchableOpacity>
              <Line color='#39823E' weight={2} mV={12} />
              {subCategories
                .filter((subCategory) => (subCategory.parent_id) === String(category.id))
                .map((subCategory) => (
                <TouchableOpacity key={subCategory.id} style={{ marginLeft: 20 }}>
                  <Text style={styles.category}># {subCategory.name}</Text>
                </TouchableOpacity>
                ))}
            </View>
          ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleFont: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  },
  commonFont: {
    color: '#fff',
    fontSize: 16
  },
  submitButton: {
    backgroundColor: '#39823E',
    width: '100%',
    paddingVertical: 4
  },
  hotPostContainer: {
    height: 300,
    position: 'relative',
    marginBottom: 24
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 8
  },
  hotPost: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 20,
    borderRadius: 8
  },
  hotPostTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  searchInput: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    height: 55,
    padding: 8,
    marginTop: 12,
    borderRadius: 8,
    borderColor: '#39823E',
    borderWidth: 1
  },
  categoryContainer: {
    justifyContent: 'space-between',
    marginVertical: 12
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12
  },
  category: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 6
  }
})

export default CommunityFooter
