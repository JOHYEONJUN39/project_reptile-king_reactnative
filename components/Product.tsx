import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Rating from './Rating'
import { useNavigation } from '@react-navigation/native'
import type { ProductNavigationProp } from '../types/RootStackParamList'
import type { ProductProps } from '../types/ProductType'

const Product = ({ product }: ProductProps): JSX.Element => {
  const { name, image, price, rating, review, charge, code } = product
  const navigation = useNavigation<ProductNavigationProp>()
  const styles = StyleSheet.create({
    productBox: {
      width: '49%',
      height: 300,
      paddingVertical: 5,
      paddingHorizontal: 5,
      marginBottom: 10,
      backgroundColor: '#1C5B20',
      justifyContent: 'space-between'
    },
    imageContainer: {
      alignItems: 'center',
      width: '100%',
      height: '65%'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    textContainer: {
      alignItems: 'flex-start',
      width: '100%'
    },
    name: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500'
    },
    price: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    }
  })
  const navigateProduct = (): void => {
    navigation.navigate('Product', { productCode: code })
  }
  return (
    <TouchableOpacity style={styles.productBox} onPress={navigateProduct}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Rating rating={rating} />
          <Text style={{ color: '#fff' }}>({review})</Text>
        </View>
        <Text style={{ color: '#fff', marginTop: 2 }}>{charge === 0 ? '무료배송' : `${charge}원`}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Product
