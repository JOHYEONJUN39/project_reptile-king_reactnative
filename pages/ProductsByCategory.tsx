import { useRoute } from '@react-navigation/native'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import type { ProductRouteProp } from '../types/RootStackParamList'
import Product from '../components/Product'
import productData from '../assets/ProductData.json'

const ProductsByCategory = (): JSX.Element => {
  const route = useRoute<ProductRouteProp>()
  const { category } = route.params

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#072E0A',
      justifyContent: 'space-between'
    },
    inner: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    category: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      paddingVertical: 10,
      paddingLeft: 4
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <ScrollView contentContainerStyle={styles.inner}>
        {productData.map(product => <Product key={product.code} product={product} />)}
      </ScrollView>
    </View>
  )
}

export default ProductsByCategory
