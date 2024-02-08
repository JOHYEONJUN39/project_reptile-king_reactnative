import { View, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import type { CategoryList } from '../types/CategoryList'
import Category from '../components/Category'
import CategoryData from '../assets/categoryData.json'

const Market = (): JSX.Element => {
  const windowWidth = useWindowDimensions().width

  const categories: CategoryList[] = CategoryData

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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24
    },
    eventBox: {
      width: windowWidth * 0.8,
      height: 120,
      backgroundColor: '#fff',
      borderRadius: 16,
      marginBottom: 24,
      overflow: 'hidden',
      alignItems: 'center'
    },
    categoryScrollView: {
      minWidth: windowWidth * 0.8,
      flexDirection: 'row',
      overflow: 'scroll'
    }
  })

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <TouchableOpacity style={styles.eventBox}>
          <Image source={{ uri: 'https://i.ibb.co/qrvMYwr/image.png' }} style={{ width: '100%', height: '100%' }} />
        </TouchableOpacity>
        <ScrollView horizontal={true} contentContainerStyle={styles.categoryScrollView} showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
          <Category
            key={index}
            name={category.name}
            image={category.image}
          />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  )
}

export default Market
