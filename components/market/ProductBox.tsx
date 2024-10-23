import { Image, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native'
import type { ProductProp } from '../../types/ProductType'
import { useNavigation } from '@react-navigation/native'
import type { ProductNavigationProp } from '../../types/RootStackParamList'

const ProductBox = ({ product }: { product: ProductProp }): JSX.Element => {
  const { name, img_urls, price, id } = product
  const parsedImgUrls = JSON.parse(img_urls)
  const windowWidth = useWindowDimensions().width
  const navigation = useNavigation<ProductNavigationProp>()
  const itemWidth = windowWidth * 0.9 / 2
  const styles = StyleSheet.create({
    content: {
      width: itemWidth - 5,
      marginBottom: 10
    },
    image: {
      width: '100%',
      height: itemWidth - 5,
      borderRadius: 15
    },
    product: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
      marginTop: 6
    },
    price: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    }
  })
  const navigateProduct = (): void => {
    navigation.navigate('Product', { productCode: id })
  }
  return (
    <TouchableOpacity style={styles.content} onPress={navigateProduct}>
      <Image source={{ uri: parsedImgUrls.thumbnail }} style={{ width: '100%', height: itemWidth - 5, borderRadius: 15 }} />
      <Text style={styles.product} numberOfLines={2}>{name}</Text>
      <Text style={styles.price}>{`${price.toLocaleString()}円`}</Text>
    </TouchableOpacity>
  )
}

export default ProductBox
