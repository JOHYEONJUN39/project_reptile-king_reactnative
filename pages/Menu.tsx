import { View, StyleSheet, ScrollView, Text } from 'react-native'
import Category from '../components/Category'
import type { CategoryList } from '../types/CategoryList'
import CategoryData from '../assets/categoryData.json'

const Menu = (): JSX.Element => {
  const categories: CategoryList[] = CategoryData

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
    shopping: {
      paddingTop: 12,
      paddingHorizontal: 20,
      alignItems: 'flex-start',
      backgroundColor: '#1C5B20'
    },
    text: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    }
  })

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.shopping}>
          <Text style={styles.text} >쇼핑</Text>
        </View>
        <View style={styles.categoryBox}>
          {categories.map((category, index) => (
          <Category
            key={index}
            name={category.name}
            image={category.image}
          />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Menu
