import { Image, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native'

interface ProductBoxProps {
  title: string
  image: string
  price: string
}

const ProductBox = ({ title, image, price }: ProductBoxProps): JSX.Element => {
  const windowWidth = useWindowDimensions().width
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
  return (
    <TouchableOpacity style={styles.content}>
      <Image source={{ uri: image }} style={{ width: '100%', height: itemWidth - 5, borderRadius: 15 }} />
      <Text style={styles.product} numberOfLines={2}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </TouchableOpacity>
  )
}

export default ProductBox
