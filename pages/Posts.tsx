import React, { useState } from 'react'
import CommunityLayout from '../components/layout/community'
import { ScrollView, StyleSheet, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import Category from '../components/market/Category'
import shoppingData from '../assets/shoppingData.json'
import { Text } from 'react-native-elements'
import { Button } from '@rneui/themed'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import Line from '../components/common/Line'

const Posts = (): JSX.Element => {
  const categories = shoppingData
  const [selectedSort, setSelectedSort] = useState<string>('전체글')
  const handleSortSelect = (sortType: string): void => {
    setSelectedSort(sortType)
  }

  const getButtonStyle = (sortType: string): ViewStyle => ({
    ...styles.button,
    opacity: selectedSort === sortType ? 1 : 0.5
  })

  const loadMorePosts = (): void => {
    // TODO: 서버에서 추가 데이터 가져오기
    // const morePosts = [/* 추가 데이터 */]
    // setPosts([...posts, ...morePosts])
  }
  return (
    <CommunityLayout title='파충류 이모저모' subtitle='주인님 같이 놀아요!'>
      <ScrollView horizontal={true} contentContainerStyle={styles.categoryContainer} showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <Category
          key={index}
          name={category.name}
          image={category.image}
          />
        ))}
      </ScrollView>
      <View style={styles.postsContainer}>
        {/* 게시글 목록 */}
        <View style={styles.sortList}>
          <Text style={styles.titleFont}>도마뱀</Text>
        </View>
        {/* 소팅 목록 */}
        <View style={styles.sortList}>
          <Text style={styles.titleFont}>정렬:</Text>
          <Button buttonStyle={styles.button} radius={0}>
            <Entypo name='news' size={15} color='#fff'/>
            <Text style={styles.commonFont}>전체글</Text>
          </Button>
          <Button
            buttonStyle={getButtonStyle('인기순')}
            onPress={() => { handleSortSelect('인기순') }}
            radius={0}>
            <MaterialIcons name='local-fire-department' size={15} color='#fff'/>
            <Text style={styles.commonFont}>인기순</Text>
          </Button>
          <Button buttonStyle={styles.button} radius={0}>
            <Entypo name='new' size={15} color='#fff'/>
            <Text style={styles.commonFont}>최신순</Text>
          </Button>
          <Button buttonStyle={styles.button} radius={0}>
            <MaterialIcons name='keyboard-arrow-down' size={24} color='#fff'/>
            <Text style={styles.commonFont}>등록순</Text>
          </Button>
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.titleFont}>AI 도마뱀 인식 솔루션, React.js, Laravel 같이 진행해보실분 모집합니다 선착순 5명 !! ~~</Text>
          <Text style={styles.commonFont} numberOfLines={4}>안녕하세요 서울대학교 대학생 창업팀 갈아만든2%입니다! 이 그룹은 2022년 10월에 결성되어 2023 예비 창업패키지 선정, 2024 SNUBIZ 최우수 선정으로 누적 지원금을 300만</Text>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.commonFont}>by 갈아만든2%</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.commonFont}>2022-10-10</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="remove-red-eye" size={16} color="#fff" />
              <Text style={styles.commonFont}>20</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="chat" size={16} color="#fff" />
              <Text style={styles.commonFont}>100</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="favorite" size={16} color="#fff" />
              <Text style={styles.commonFont}>10</Text>
            </View>
          </View>
          <Line color='#B1D074' weight={2} mV={8} />
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.titleFont}>AI 도마뱀 인식 솔루션, React.js, Laravel 같이 진행해보실분 모집합니다 선착순 5명 !! ~~</Text>
          <Text style={styles.commonFont} numberOfLines={4}>안녕하세요 서울대학교 대학생 창업팀 갈아만든2%입니다! 이 그룹은 2022년 10월에 결성되어 2023 예비 창업패키지 선정, 2024 SNUBIZ 최우수 선정으로 누적 지원금을 300만</Text>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.commonFont}>by 갈아만든2%</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.commonFont}>2022-10-10</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="remove-red-eye" size={16} color="#fff" />
              <Text style={styles.commonFont}>20</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="chat" size={16} color="#fff" />
              <Text style={styles.commonFont}>100</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="favorite" size={16} color="#fff" />
              <Text style={styles.commonFont}>10</Text>
            </View>
          </View>
          <Line color='#B1D074' weight={2} mV={8} />
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.titleFont}>AI 도마뱀 인식 솔루션, React.js, Laravel 같이 진행해보실분 모집합니다 선착순 5명 !! ~~</Text>
          <Text style={styles.commonFont} numberOfLines={4}>안녕하세요 서울대학교 대학생 창업팀 갈아만든2%입니다! 이 그룹은 2022년 10월에 결성되어 2023 예비 창업패키지 선정, 2024 SNUBIZ 최우수 선정으로 누적 지원금을 300만</Text>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.commonFont}>by 갈아만든2%</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.commonFont}>2022-10-10</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="remove-red-eye" size={16} color="#fff" />
              <Text style={styles.commonFont}>20</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="chat" size={16} color="#fff" />
              <Text style={styles.commonFont}>100</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="favorite" size={16} color="#fff" />
              <Text style={styles.commonFont}>10</Text>
            </View>
          </View>
          <Line color='#B1D074' weight={2} mV={8} />
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.titleFont}>AI 도마뱀 인식 솔루션, React.js, Laravel 같이 진행해보실분 모집합니다 선착순 5명 !! ~~</Text>
          <Text style={styles.commonFont} numberOfLines={4}>안녕하세요 서울대학교 대학생 창업팀 갈아만든2%입니다! 이 그룹은 2022년 10월에 결성되어 2023 예비 창업패키지 선정, 2024 SNUBIZ 최우수 선정으로 누적 지원금을 300만</Text>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.commonFont}>by 갈아만든2%</Text>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.commonFont}>2022-10-10</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="remove-red-eye" size={16} color="#fff" />
              <Text style={styles.commonFont}>20</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="chat" size={16} color="#fff" />
              <Text style={styles.commonFont}>100</Text>
            </View>
            <View style={styles.infoText}>
              <MaterialIcons name="favorite" size={16} color="#fff" />
              <Text style={styles.commonFont}>10</Text>
            </View>
          </View>
          <Line color='#B1D074' weight={2} mV={8} />
        </View>
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
    marginTop: 24
  },
  postsContainer: {
    backgroundColor: '#1C5B20',
    flex: 1,
    padding: 12,
    marginHorizontal: 16
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

export default Posts
