import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, TouchableOpacity, RefreshControl } from 'react-native'
import type { ProductRouteProp } from '../types/RootStackParamList'
import { useRoute } from '@react-navigation/native'
import Rating from '../components/common/Rating'
import Line from '../components/common/Line'
import { MaterialIcons } from '@expo/vector-icons'
import type { ProductProp } from '../types/ProductType'
import productList from '../assets/ProductData.json'
import MovingLine from '../components/animation/MovingLine'
import getDeliveryDay from '../hooks/getDeliveryDay'
import ImageScroll from '../components/market/ImageScroll'
import ReviewContents from '../components/market/ReviewContents'
import ProductFooter from '../components/footer/ProductFooter'
import axios from 'axios'

const ProductDetails = (): JSX.Element => {
  const screenWidth = useWindowDimensions().width
  const route = useRoute<ProductRouteProp>()
  const { productCode } = route.params
  const [product, setProduct] = useState<ProductProp | null>(null)
  const [activeTab, setActiveTab] = useState('商品情報')
  const [refreshing, setRefreshing] = useState(false)
  const tabData = [
    {
      name: '상품정보',
      position: 13
    },
    {
      name: '리뷰',
      position: 75
    }
  ]

  useEffect(() => {
    const fetchProductData = async (): Promise<void> => {
      try {
        const response = await axios.get(`http://3.38.185.224:8000/api/goods/${productCode}`)
        console.log('제발 그만해 좀', response.data)
        setProduct(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    void fetchProductData()
  }, [productCode])

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true)
  //   // 데이터호출 API 추가시 사용
  //   setTimeout(() => { setRefreshing(false) }, 2000)
  // }, [])

  // 데이터호출 API 추가시 사용
  // useEffect(() => {
  //   const fetchProductData = async (): Promise<void> => {
  //     try {
  //       const response = await axios.get<ProductList[]>('../assets/ProductData.json')
  //       const productData = response.data.find((item: ProductList) => item.product.code === productCode)
  //       if (productData !== undefined && productData !== null) {
  //         setProduct(productData.product)
  //       } else {
  //         console.error('상품을 찾을 수 없습니다.')
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   void fetchProductData()
  // }, [productCode])

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.inner}
        stickyHeaderIndices={[4]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor='#fff'
            title='スワイプして再度読み！'
            titleColor='#fff'
          />
        }
      >
        <Image
          source={{ uri: product?.img_urls?.main }} 
          style={{ width: screenWidth, height: screenWidth }} 
        />
        <View style={styles.detail}>
          {/* <Text style={styles.text}>{product?.seller}</Text> */}
          <Text style={styles.name}>{product?.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Rating rating={product?.staravg ? product?.staravg : 0} />
            <Text style={[styles.text, { marginLeft: 5 }]}>{product?.staravg ? product?.staravg : 0}</Text>
          </View>
          <Text style={styles.name}>{product?.price.toLocaleString()}원</Text>
        </View>
        <Line color='#39823E' weight={2} mV={2} />
        <View style={styles.delivery}>
          <View style={styles.deliveryInfo}>
            <Text style={styles.text}>お得</Text>
            <Text style={[styles.text, { marginLeft: 5 }]}>{`${Math.round(Number(product?.price) * 0.001)}P 支給`}</Text>
          </View>
          <View style={styles.deliveryInfo}>
            <Text style={styles.text}>配送</Text>
            <Text style={[styles.text, { marginLeft: 5 }]}>
              {/* {product?.charge === 0 ? '무료배송 / 일반택배' : `${product?.charge}원 / 일반택배`} */}
              300円 / 一般配送
            </Text>
          </View>
          <View style={styles.eta}>
            <MaterialIcons name='delivery-dining' size={24} color='#fff' style={{ marginRight: 5 }} />
            <Text style={styles.text}>{getDeliveryDay()}(曜日) 到着予定</Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#072E0A' }}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => { setActiveTab('商品情報') }} style={styles.menuTap}>
              <Text style={[styles.text, { color: activeTab === '商品情報' ? '#FF80DB' : '#fff' }]}>商品情報</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setActiveTab('レビュー') }} style={styles.menuTap}>
              <Text style={[styles.text, { color: activeTab === 'レビュー' ? '#FF80DB' : '#fff' }]}>レビュー</Text>
            </TouchableOpacity>
          </View>
          <MovingLine activeTab={activeTab} tabData={tabData}/>
          <Line color='#39823E' weight={2} />
        </View>
        <Image
          source={{ uri: product?.img_urls?.main }} 
          style={{ width: screenWidth, height: screenWidth }} 
        />

      </ScrollView>
      <ProductFooter id={productCode} price={product?.price ?? 0} name={product?.name} img={product?.img_urls?.main}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072E0A'
  },
  inner: {
    paddingVertical: 24
  },
  detail: {
    width: '100%',
    height: 140,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  },
  delivery: {
    width: '100%',
    height: 'auto',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  eta: {
    width: '100%',
    height: 'auto',
    borderRadius: 5,
    backgroundColor: '#39823E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5
  },
  menu: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  menuTap: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ProductDetails
