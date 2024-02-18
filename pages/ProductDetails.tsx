import React from 'react'
import { View, Text } from 'react-native'
import type { ProductRouteProp } from '../types/RootStackParamList'
import { useRoute } from '@react-navigation/native'

const ProductDetails = (): JSX.Element => {
  const route = useRoute<ProductRouteProp>()
  const { productCode } = route.params
  return (
    <View>
      <Text>{productCode}</Text>
    </View>
  )
}

export default ProductDetails
