import { View, StyleSheet, ScrollView, TouchableOpacity, Text, useWindowDimensions, Image } from 'react-native'
import type { CategoryList } from '../types/CategoryList'
import Category from '../components/Category'
import CategoryData from '../assets/categoryData.json'
import Line from '../components/Line'
import ProductBox from '../components/ProductBox'

const data = [
  {
    id: 1,
    title: '이탈리아 베네치아 장인이 손수 한땀한땀 열심히 제작한 사육장 세트',
    image: 'https://i.postimg.cc/W3zLYSvP/image.png',
    price: '₩ 35,000'
  },
  {
    id: 2,
    title: '이탈리아 베네치아 장인이 손수 한땀한땀 열심히 제작한 사육장',
    image: 'https://i.postimg.cc/sx1jSsX7/image.jpg',
    price: '₩ 35,000'
  },
  {
    id: 3,
    title: '이탈리아 베네치아 장인이 손수 한땀한땀 열심히 제작한 채집통',
    image: 'https://i.postimg.cc/0Q4gTmkK/image.png',
    price: '₩ 35,000'
  },
  {
    id: 4,
    title: '이탈리아 베네치아 장인이 손수 열심히 제작한 바닥재',
    image: 'https://i.postimg.cc/BQrSLWGP/image.jpg',
    price: '₩ 35,000'
  },
  {
    id: 5,
    title: '한마리 한마리 열심히 사육한 밀웜',
    image: 'https://i.postimg.cc/hGqtYkyR/image.jpg',
    price: '₩ 35,000'
  },
  {
    id: 6,
    title: '이탈리아 베네치아 야자수',
    image: 'https://i.postimg.cc/T3vx2rrr/image.png',
    price: '₩ 35,000'
  }
]

const Market = (): JSX.Element => {
  const windowWidth = useWindowDimensions().width

  const categories: CategoryList[] = CategoryData

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#072E0A',
      justifyContent: 'space-between'
    },
    inner: {
      paddingVertical: 24,
      alignItems: 'center'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24
    },
    eventBox: {
      width: windowWidth * 0.9,
      height: 120,
      backgroundColor: '#fff',
      borderRadius: 16,
      marginBottom: 24,
      overflow: 'hidden'
    },
    categoryScrollView: {
      minWidth: windowWidth * 0.8,
      flexDirection: 'row',
      overflow: 'scroll'
    },
    offerTitle: {
      fontSize: 24,
      fontWeight: '400',
      marginBottom: 24,
      color: '#fff'
    },
    offerBox: {
      width: windowWidth * 0.9,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginBottom: 24
    }
  })

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <TouchableOpacity style={styles.eventBox}>
          <Image source={{ uri: 'https://i.ibb.co/qrvMYwr/image.png' }} style={{ width: '100%', height: '100%' }} />
        </TouchableOpacity>
        <ScrollView horizontal={true} contentContainerStyle={styles.categoryScrollView} showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
          <Category
            key={index}
            name={category.name}
            image={category.image}
          />
          ))}
        </ScrollView>
        <Line color='#39823E' weight={4} mV={12} />
        <Text style={styles.offerTitle}>오늘의 추천 상품</Text>
        <View style={styles.offerBox}>
          {data.map((item, index) => (
            <ProductBox key={index} title={item.title} image={item.image} price={item.price}/>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Market
