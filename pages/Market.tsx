import { View, StyleSheet, ScrollView, TouchableOpacity, Text, useWindowDimensions, Image } from 'react-native'
import Category from '../components/market/Category'
import Line from '../components/common/Line'
import ProductBox from '../components/market/ProductBox'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { CategoryData } from '../types/Community'
import type { ProductProp } from '../types/ProductType'

const Market = (): JSX.Element => {
  const windowWidth = useWindowDimensions().width
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [productData, setProductData] = useState<ProductProp[]>([])

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

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await axios.get<CategoryData[]>('http://3.38.185.224:8000/api/categories')
      const categories = response.data.filter((category: CategoryData) => category.division === 'goods')
      setCategories(categories)
    } catch (error) {
      console.error('카테고리를 불러오는 중 오류가 발생했습니다.', error)
    }
  }

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await axios.get<ProductProp[]>('http://3.38.185.224:8000/api/goods')
      setProductData(response.data)
    } catch (error) {
      console.error('상품을 불러오는 중 오류가 발생했습니다.', error)
    }
  }

  useEffect(() => {
    void fetchCategories()
    void fetchProducts()
  }, [])

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
            id={category.id}
            name={category.name}
            image={category.img_url}
          />
          ))}
        </ScrollView>
        <Line color='#39823E' weight={4} mV={12} />
        <Text style={styles.offerTitle}>おすすめ商品</Text>
        <View style={styles.offerBox}>
          {productData.map((product: ProductProp, index) => (
          <ProductBox
            key={index}
            product={product}
          />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Market
