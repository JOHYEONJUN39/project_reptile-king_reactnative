import React, { useEffect, useState } from 'react'
import CommunityLayout from '../components/layout/community'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { Text } from 'react-native-elements'
import { Button } from '@rneui/themed'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import Line from '../components/common/Line'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import type { CommunityNavigationProp, CommunityRouteProp } from '../types/RootStackParamList'
import type { UserPost } from '../types/Community'
import RenderHtml from 'react-native-render-html'
import FormattedDate from '../components/common/FormattedDate'

const CommunitySearch = (): JSX.Element => {
  const navigation = useNavigation<CommunityNavigationProp>()
  const route = useRoute<CommunityRouteProp>()
  const { searchQuery } = route.params
  const [selectedSort, setSelectedSort] = useState<string>('전체글')
  const [posts, setPosts] = useState<UserPost[]>([])
  const [page, setPage] = useState(1) // 페이지 번호
  const navigateToPosts = (postId: number): void => {
    navigation.navigate('Post', { postId })
  }
  const handleSortSelect = (sortType: string): void => {
    setSelectedSort(sortType)
  }

  const getButtonStyle = (sortType: string): ViewStyle => ({
    ...styles.button,
    opacity: selectedSort === sortType ? 1 : 0.5
  })

  const loadMorePosts = async (): Promise<void> => {
    const nextPage = page + 1
    const url = `http://54.180.158.4:8000/api/posts/search?search=${encodeURIComponent(searchTerm)}?page=${searchQuery}`
    try {
      const response = await axios.get<UserPost[]>(url)
      setPosts(prevPosts => [...prevPosts, ...response.data.data])
      setPage(nextPage)
    } catch (error) {
      console.error(error)
    }
  }
  const fetchPosts = async (): Promise<void> => {
    const url = `http://54.180.158.4:8000/api/posts/search?search=${encodeURIComponent(searchQuery)}`
    try {
      const response = await axios.get<UserPost[]>(url)
      setPosts(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    void fetchPosts() // 첫 페이지 로드
  }, [searchQuery])
  return (
    <CommunityLayout title='파충류 이모저모' subtitle='주인님 같이 놀아요!'>
      <View style={styles.postsContainer}>
        {/* 게시글 목록 */}
        <View style={styles.sortList}>
          <Text style={styles.titleFont}>{searchQuery} 검색결과:</Text>
        </View>
        {/* 소팅 목록 */}
        <View style={styles.sortList}>
          <Text style={styles.titleFont}>정렬:</Text>
          {/* 전체글 */}
          <Button
            buttonStyle={getButtonStyle('전체글')}
            onPress={() => { handleSortSelect('전체글') }}
            radius={0}
          >
            <Entypo name='news' size={15} color='#fff'/>
            <Text style={styles.commonFont}>전체글</Text>
          </Button>
          {/* 인기순 */}
          <Button
            buttonStyle={getButtonStyle('인기순')}
            onPress={() => { handleSortSelect('인기순') }}
            radius={0}
          >
            <MaterialIcons name='local-fire-department' size={15} color='#fff'/>
            <Text style={styles.commonFont}>인기순</Text>
          </Button>
          {/* 최신순 */}
          <Button
            buttonStyle={getButtonStyle('최신순')}
            onPress={() => { handleSortSelect('최신순') }}
            radius={0}
          >
            <Entypo name='new' size={15} color='#fff'/>
            <Text style={styles.commonFont}>최신순</Text>
          </Button>
          {/* 등록순 */}
          <Button
            buttonStyle={getButtonStyle('등록순')}
            onPress={() => { handleSortSelect('등록순') }}
            radius={0}
          >
            <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff'/>
            <Text style={styles.commonFont}>등록순</Text>
          </Button>
        </View>
        {/* 게시글 */}
        {posts.map((post) => (
          <TouchableOpacity key={post.id} style={styles.postContainer} onPress={() => { navigateToPosts(post.id) }}>
            <Text style={styles.titleFont} numberOfLines={3}>{post.title}</Text>
            <View style={{ maxHeight: 100, overflow: 'hidden', marginTop: 8 }}>
              <RenderHtml
                contentWidth={90}
                source={{
                  html: `<div style="color: white; font-size: 16px;">${post.content}</div>`
                }}
                tagsStyles={{ p: { marginVertical: 0 } }}
              />
            </View>
            <View style={styles.info}>
              <View style={styles.infoText}>
                <Text style={styles.commonFont}>by </Text>
                <Text style={[styles.commonFont, { fontWeight: 'bold' }]}>{post.nickname}</Text>
              </View>
              <View style={styles.infoText}>
                <FormattedDate dateString={post.created_at} />
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.infoText}>
                <MaterialIcons name='remove-red-eye' size={16} color='#fff'/>
                <Text style={styles.commonFont}>{post.views}</Text>
              </View>
              <View style={styles.infoText}>
                <MaterialIcons name='chat' size={16} color='#fff'/>
                <Text style={styles.commonFont}>{post.length}</Text>
              </View>
              <View style={styles.infoText}>
                <MaterialIcons name='favorite' size={16} color='#fff'/>
                <Text style={styles.commonFont}>{post.likes}</Text>
              </View>
            </View>
            <Line color='#B1D074' weight={2} mV={8}/>
          </TouchableOpacity>
        ))}
        {/* 더 불러오기 */}
        <Button
          onPress={loadMorePosts}
          buttonStyle={{ backgroundColor: 'transparent' }}
          titleStyle={styles.leadMoreTitle}
          title="더 보기"
        />
      </View>
    </CommunityLayout>
  )
}

const styles = StyleSheet.create({
  titleFont: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  commonFont: {
    color: '#fff',
    fontSize: 16
  },
  categoryContainer: {
    minWidth: 500,
    flexDirection: 'row',
    overflow: 'scroll',
    marginTop: 32
  },
  postsContainer: {
    backgroundColor: '#1C5B20',
    flex: 1,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 24
  },
  sortList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8
  },
  button: {
    width: 65,
    height: 30,
    padding: 0,
    opacity: 0.5,
    backgroundColor: 'transparent'
  },
  postContainer: {
    padding: 12
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 12
  },
  infoText: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leadMoreTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    shadowColor: '#B1D074',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7
  }
})

export default CommunitySearch
