import { View, StyleSheet, ScrollView, Text } from 'react-native'
import Category from '../components/market/Category'
import type { CategoryData } from '../types/Community'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Menu = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await axios.get<CategoryData[]>('http://3.38.185.224:8000/api/categories')
      const categories = response.data.filter((category: CategoryData) => category.division === 'goods')
      console.log('카테고리', categories)
      setCategories(categories)
    } catch (error) {
      console.error('카테고리를 불러오는 중 오류가 발생했습니다.', error)
    }
  }
  useEffect(() => {
    void fetchCategories()
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleBox}>
          <Text style={styles.title}>ショッピング</Text>
        </View>
        <View style={styles.categoryBox}>
          {categories.map((category, index) => (
          <Category
            key={index}
            id={category.id}
            name={category.name}
            image={category.img_url}
          />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

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

export default Menu
