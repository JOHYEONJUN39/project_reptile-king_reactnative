import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Result from '../components/market/search/Result'
import products from '../assets/ProductData.json'

const Search = (): JSX.Element => {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const goBack = (): void => {
    navigation.goBack()
  }

  // useEffect(() => {
  //   const fetchResults = async (): Promise<void> => {
  //     if (searchQuery.trim() === '') {
  //       setResults([])
  //       return
  //     }
  //     try {
  //       const response = await axios.get(`YOUR_API_URL/search?query=${searchQuery}`)
  //       setResults(response.data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   fetchResults().catch(console.error)
  // }, [searchQuery])
  useEffect(() => {
    const fetchResults = (): void => {
      if (searchQuery.trim() === '') {
        setResults([])
        return
      }

      // 상품 이름을 기반으로 필터링합니다.
      const filteredResults = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setResults(filteredResults)
    }

    fetchResults()
  }, [searchQuery])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <TouchableOpacity style={styles.iconContainer} onPress={goBack}>
            <MaterialIcons name='arrow-back-ios-new' size={24} color='white' />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <FontAwesome name="search" size={18} color="#888" style={{ marginHorizontal: 8 }}/>
            <TextInput
              style={styles.input}
              placeholder="검색어를 입력해주세요."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            <MaterialIcons name="cancel" size={18} color="#888" style={{ marginHorizontal: 6 }}/>
          </View>
        </View>
      </View>
      <View style={styles.results}>
      <FlatList
        data={results}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item }) => <Result text={item.name} searchQuery={searchQuery} code={item.code}/>}
        style={{ width: '100%' }}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072E0A'
  },
  header: {
    backgroundColor: '#072E0A',
    height: 104,
    justifyContent: 'flex-end'
  },
  headerInner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  back: {
    fontSize: 18,
    color: '#ffffff'
  },
  inputContainer: {
    width: '80%',
    height: 34,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 8,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#888'
  },
  results: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  }
})

export default Search
