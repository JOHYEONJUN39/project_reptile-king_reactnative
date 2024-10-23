import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Rating from '../common/Rating'
import { useNavigation } from '@react-navigation/native'
import type { ProductNavigationProp } from '../../types/RootStackParamList'
import type { ProductProp } from '../../types/ProductType'

const Product = ({ id, img_urls, name, price, starAvg, reviewCount }: ProductProp): JSX.Element => {
  const charge = 3000
  const navigation = useNavigation<ProductNavigationProp>()
  const parsedImgUrls = JSON.parse(img_urls)
  const navigateProduct = (): void => {
    navigation.navigate('Product', { productCode: id })
  }

  return (
    <TouchableOpacity style={styles.productBox} onPress={navigateProduct}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: parsedImgUrls.thumbnail }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.price}>{`${price.toLocaleString()}원`}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Rating rating={starAvg} />
          <Text style={{ color: '#fff' }}>({reviewCount ? reviewCount : 0})</Text>
        </View>
        {/* <Text style={{ color: '#fff', marginTop: 2 }}>{charge === 0 ? '무료배송' : `${charge}원`}</Text> */}
        <Text style={{ color: '#fff', marginTop: 2 }}>배송비: 3000원</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  productBox: {
    flexBasis: '50%',
    height: 300,
    padding: 5,
    backgroundColor: '#1C5B20',
    borderColor: '#072E0A',
    borderWidth: 1.5,
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

export default Product
