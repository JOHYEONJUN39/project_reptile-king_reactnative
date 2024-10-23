import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import CommunityLayout from '../components//layout/community'
import Line from '../components/common/Line'
import PostTitle from '../components/community/PostTitle'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import axios from 'axios'
import type { CommunityNavigationProp } from '../types/RootStackParamList'
import type { Category, UserPost } from '../types/Community'

const Community = (): JSX.Element => {
  const [postsByCategory, setPostsByCategory] = useState<Record<number, UserPost[]>>({})
  const [categories, setCategories] = useState<Category[]>([])
  const navigation = useNavigation<CommunityNavigationProp>()
  const fetchPostsByCategory = async (categoryId: number): Promise<void> => {
    try {
      const response = await axios.get(`http://3.38.185.224:8000/api/posts/category/${categoryId}`)
      setPostsByCategory(prevState => ({ ...prevState, [categoryId]: response.data.data }))
    } catch (error) {
      console.error(error)
    }
  }
  // 카테고리 가져오기
  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await axios.get<Category[]>('http://3.38.185.224:8000/api/categories')
      const postCategories = response.data.filter(category => category.division === 'posts')
      setCategories(postCategories)
      // 각 카테고리별로 게시글 가져오기
      postCategories.forEach(category => {
        void fetchPostsByCategory(category.id)
      })
    } catch (error) {
      console.error('카테고리를 불러오는 데 실패했습니다.', error)
    }
  }
  useFocusEffect(
    useCallback(() => {
      void fetchCategories().then(() => {
      })
    }, [])
  )

  const navigateToPosts = (categoryId: number, categoryName: string): void => {
    navigation.navigate('Posts', { categoryId, categoryName })
  }
  return (
    <CommunityLayout title='爬虫類あれこれ' subtitle='一緒に遊びましょう！'>
      <View style={styles.inner}>
        {categories.map((category) => (
          <View key={category.id} style={styles.titleContainer}>
            <TouchableOpacity onPress={() => { navigateToPosts(category.id, category.name) }}>
              <Text style={styles.titleFont}>#{category.name} 最新投稿</Text>
            </TouchableOpacity>
            <Line color='#39823E' weight={2} mV={8} />
            {postsByCategory[Number(category.id)]?.map((post) => (
              <PostTitle key={post.id} category={post.category_name} title={post.title} id={post.id}/>
            ))}
          </View>
        ))}
      </View>
    </CommunityLayout>
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
  inner: {
    paddingTop: 32,
    paddingHorizontal: 16
  },
  post: {
    backgroundColor: '#1C5B20',
    flex: 1,
    padding: 12
  },
  titleContainer: {
    height: 'auto',
    marginBottom: 24
  }
})

export default Community
