import { useRoute } from '@react-navigation/native'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import type { ProductRouteProp } from '../types/RootStackParamList'

const Product = (): JSX.Element => {
  const route = useRoute<ProductRouteProp>()
  const { category } = route.params

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#072E0A',
      justifyContent: 'space-between'
    },
    inner: {
      paddingVertical: 24,
      paddingHorizontal: 27,
      alignItems: 'center'
    },
    category: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff'
    }
  })

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.category}>{category}</Text>
      </ScrollView>
    </View>
  )
}

export default Product
