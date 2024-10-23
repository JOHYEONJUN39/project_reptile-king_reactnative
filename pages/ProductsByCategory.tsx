import { useRoute } from '@react-navigation/native'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import type { ProductRouteProp } from '../types/RootStackParamList'
import Product from '../components/market/Product'
import axios from 'axios'
import { useEffect, useState } from 'react'
import type { ProductPageRes, ProductProp } from '../types/ProductType'

const ProductsByCategory = (): JSX.Element => {
  const route = useRoute<ProductRouteProp>()
  const { categoryId } = route.params

  const [productData, setProductData] = useState<ProductProp[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [noMoreData, setNoMoreData] = useState(false)

  const fetchCategories = async (requestedPage: number = 1): Promise<void> => {
    if (loading) return
    setLoading(true)
    try {
      const response = await axios.get<ProductPageRes>(`http://3.38.185.224:8000/api/goods/category/${categoryId}?page=${requestedPage}`)
      const responseData = response.data
      setProductData(requestedPage === 1 ? responseData.data : [...productData, ...responseData.data])
      setPage(requestedPage)
      console.log(response.data)
      if (responseData.current_page === responseData.last_page) {
        setNoMoreData(true)
      }
      setLoading(false)
    } catch (error) {
      console.error('상품 데이터를 불러오는 중 에러가 발생했습니다.', error)
    }
  }
  useEffect(() => {
    void fetchCategories()
  }, [])

  const loadMoreGoods = (): void => {
    console.log(noMoreData)
    console.log(loading)
    if (noMoreData || loading) return
    void fetchCategories(page + 1)
  }

  const renderFooter = (): JSX.Element => {
    if (noMoreData) {
      return <Text>상품을 모두 불러왔습니다.</Text>
    }
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={productData}
        renderItem={({ item }) => <Product key={item.id} {...item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.inner}
        onEndReached={loadMoreGoods}
        onEndReachedThreshold={0.5}
        numColumns={2}
        key={'two-columns'}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072E0A',
    justifyContent: 'space-between'
  },
  inner: {
    justifyContent: 'center'
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 10,
    paddingLeft: 4
  },
  leadMoreTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    shadowColor: '#B1D074',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center'
  }
})

export default ProductsByCategory
