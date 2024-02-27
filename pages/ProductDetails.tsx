import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, Button } from 'react-native'
import type { ImageLoadEventData, NativeSyntheticEvent } from 'react-native'
import type { ProductRouteProp } from '../types/RootStackParamList'
import { useRoute } from '@react-navigation/native'
import Rating from '../components/Rating'
import Line from '../components/Line'
import { MaterialIcons } from '@expo/vector-icons'
import type { ProductProps } from '../types/ProductType'
import productList from '../assets/ProductData.json'
import MovingLine from '../components/animation/MovingLine'
import getDeliveryDay from '../hooks/getDeliveryDay'
import ReviewContents from '../components/ReviewContents'

interface ImageDimension {
  width: number
  height: number
}

const ProductDetails = (): JSX.Element => {
  const screenWidth = useWindowDimensions().width
  const route = useRoute<ProductRouteProp>()
  const { productCode } = route.params
  const [product, setProduct] = useState<ProductProps | null>(null)
  const [activeTab, setActiveTab] = useState('상품정보')
  const tabData = [
    {
      name: '상품정보',
      position: 15
    },
    {
      name: '리뷰',
      position: 77
    }
  ]

  useEffect(() => {
    const productData = productList.find((item: ProductProps) => item.code === productCode)
    if (productData !== undefined && productData !== null) {
      setProduct(productData as ProductProps)
    } else {
      console.error('Product not found')
    }
  }, [productCode])

  // API로 변경시 사용
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
  const [imageHeights, setImageHeights] = useState<number[]>([])
  const onImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>, index: number): void => {
    const { width, height } = (event.nativeEvent.source as unknown) as ImageDimension
    const imageHeight = height * (screenWidth / width)
    setImageHeights(prev => {
      const newHeights = [...prev]
      newHeights[index] = imageHeight
      return newHeights
    })
  }
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.inner}
      >
        <Image source={{ uri: product?.image }} style={{ width: screenWidth, height: screenWidth }}/>
        <View style={styles.detail}>
          <Text style={styles.text}>{product?.seller}</Text>
          <Text style={styles.name}>{product?.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Rating rating={4} />
            <Text style={[styles.text, { marginLeft: 5 }]}>{product?.totalReview}</Text>
          </View>
          <Text style={styles.name}>{product?.price.toLocaleString()}원</Text>
        </View>
        <Line color='#39823E' weight={2} mV={2} />
        <View style={styles.delivery}>
          <View style={styles.deliveryInfo}>
            <Text style={styles.text}>혜택</Text>
            <Text style={[styles.text, { marginLeft: 5 }]}>{`${Math.round(Number(product?.price) * 0.001)}P 지급`}</Text>
          </View>
          <View style={styles.deliveryInfo}>
            <Text style={styles.text}>배송</Text>
            <Text style={[styles.text, { marginLeft: 5 }]}>
              {product?.charge === 0 ? '무료배송 / 일반택배' : `${product?.charge}원 / 일반택배`}
            </Text>
          </View>
          <View style={styles.eta}>
            <MaterialIcons name='delivery-dining' size={24} color='#fff' style={{ marginRight: 5 }} />
            <Text style={styles.text}>{getDeliveryDay()}(요일) 도착 예정</Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.menu}>
            <Button
              title="상품정보"
              onPress={() => { setActiveTab('상품정보') }}
              color={activeTab === '상품정보' ? '#FF80DB' : '#fff'}
            />
            <Button
              title="리뷰"
              onPress={() => { setActiveTab('리뷰') }}
              color={activeTab === '상품정보' ? '#fff' : '#FF80DB'}
            />
          </View>
          <MovingLine activeTab={activeTab} tabData={tabData}/>
          {activeTab === '상품정보'
            ? (
              <View style={{ width: '100%' }}>
                {product?.contentImage?.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={{ width: screenWidth, height: imageHeights[index] ?? screenWidth }}
                    onLoad={(event) => { onImageLoad(event, index) }}
                  />
                ))}
              </View>
              )
            : (
                <ReviewContents reviewData={product} />
              )
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072E0A',
    justifyContent: 'space-between'
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
  footerContainer: {
    width: '100%',
    height: 'auto'
  },
  menu: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default ProductDetails
