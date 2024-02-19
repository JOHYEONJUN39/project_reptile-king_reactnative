import { View, StyleSheet, ScrollView, Text } from 'react-native'
import Category from '../components/Category'
import type { CategoryList } from '../types/ProductType'
import shoppingData from '../assets/shoppingData.json'
import breedData from '../assets/breedData.json'

const Menu = (): JSX.Element => {
  const products: CategoryList[] = shoppingData
  const breeds: CategoryList[] = breedData

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#072E0A'
    },
    categoryBox: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexWrap: 'wrap',
      flexDirection: 'row',
      backgroundColor: '#1C5B20'
    },
    titleBox: {
      paddingTop: 12,
      paddingHorizontal: 20,
      marginTop: 20,
      alignItems: 'flex-start',
      backgroundColor: '#1C5B20'
    },
    title: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    }
  })

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleBox}>
          <Text style={styles.title} >쇼핑</Text>
        </View>
        <View style={styles.categoryBox}>
          {products.map((product, index) => (
          <Category
            key={index}
            name={product.name}
            image={product.image}
          />
          ))}
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title}>사육</Text>
        </View>
        <View style={styles.categoryBox}>
          {breeds.map((product, index) => (
          <Category
            key={index}
            name={product.name}
            image={product.image}
          />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Menu
