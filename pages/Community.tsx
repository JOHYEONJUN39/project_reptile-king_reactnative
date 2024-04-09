import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import CommunityLayout from '../components//layout/community'
import Line from '../components/common/Line'
import PostTitle from '../components/community/PostTitle'
import { useNavigation } from '@react-navigation/native'

interface PostData {
  category: string
  posts: string[]
}

const generatePosts = (): PostData[] => {
  const categories = ['도마뱀', '뱀', '거북이', '이구아나', '카멜레온']
  const titles = [
    '오늘의 파충류 관찰기',
    '새로운 친구를 소개합니다',
    '파충류 건강 관리 팁',
    '내 파충류와의 재미있는 일화',
    '파충류를 위한 최고의 사육 환경'
  ]
  // 각 카테고리별로 임시 포스트 데이터 생성
  return categories.map(category => ({
    category,
    posts: Array.from({ length: 5 }, () => titles[Math.floor(Math.random() * titles.length)])
  }))
}

const Community = (): JSX.Element => {
  const navigation = useNavigation()
  const sortCategory = (): void => {
    navigation.navigate('Posts' as never)
  }
  const data = generatePosts()
  return (
    <CommunityLayout title='파충류 이모저모' subtitle='주인님 같이 놀아요!'>
      <View style={styles.inner}>
        {/* 최신글 section */}
        <View style={styles.post}>
          {data.map(({ category, posts }) => (
            <View key={category} style={styles.titleContainer}>
              <TouchableOpacity onPress={sortCategory}>
                <Text style={styles.titleFont}>{category} 최신글</Text>
              </TouchableOpacity>
              <Line color='#39823E' weight={2} mV={8} />
              {posts.map((title, index) => (
                <PostTitle key={index} category={category} title={title} />
              ))}
            </View>
          ))}
        </View>
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
    paddingTop: 24,
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
