import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import type { CategoryList } from '../../types/ProductType'
import { useNavigation } from '@react-navigation/native'
import type { ProductNavigationProp } from '../../types/RootStackParamList'

const Category = ({ id, image, name }: CategoryList): JSX.Element => {
  const navigation = useNavigation<ProductNavigationProp>()
  const imageUrl = image ?? 'defaultImageUrl'
  const productsByCategory = (): void => {
    navigation.navigate('ProductsByCategory', { categoryId: id })
  }

  const styles = StyleSheet.create({
    categoryBox: {
      width: 80,
      height: 80,
      marginBottom: 10,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center'
    },
    categoryImg: {
      width: 60,
      height: 60,
      borderRadius: 40,
      marginBottom: 4
    },
    category: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fff'
    }
  })

  return (
    <TouchableOpacity style={styles.categoryBox} onPress={productsByCategory}>
      <Image source={{ uri: imageUrl }} style={styles.categoryImg} />
      <Text style={styles.category}>{name}</Text>
    </TouchableOpacity>
  )
}

export default Category
