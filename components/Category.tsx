import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import type { CategoryList } from '../types/CategoryList'

const Category = ({ image, name }: CategoryList): JSX.Element => {
  const styles = StyleSheet.create({
    categoryBox: {
      width: 80,
      height: 80,
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
    <TouchableOpacity style={styles.categoryBox}>
      <Image source={{ uri: image }} style={styles.categoryImg} />
      <Text style={styles.category}>{name}</Text>
    </TouchableOpacity>
  )
}

export default Category
