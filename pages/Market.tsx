import { View, StyleSheet, ScrollView, TouchableOpacity, Text, useWindowDimensions, Image } from 'react-native'
import type { CategoryList } from '../types/ProductType'
import Category from '../components/Category'
import shoppingData from '../assets/shoppingData.json'
import Line from '../components/Line'
import ProductBox from '../components/ProductBox'
import productData from '../assets/ProductData.json'

const Market = (): JSX.Element => {
  const windowWidth = useWindowDimensions().width

  const categories: CategoryList[] = shoppingData

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
          {productData.map((product, index) => (
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
