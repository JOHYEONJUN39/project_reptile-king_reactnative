import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Result from '../components/market/search/Result'
import products from '../assets/ProductData.json'

const Search = (): JSX.Element => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  
  const goBack = (): void => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchResults = async (): Promise<void> => {
      if (searchQuery.trim() === '') {
        setResults([]);
        return;
      }

      setLoading(true); // 로딩 시작

      try {
        const response = await axios.get('http://3.38.185.224:8000/api/goods');
        const products = response.data; // API에서 가져온 상품 데이터

        // 상품 이름을 기반으로 필터링합니다.
        const filteredResults = products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setResults(filteredResults);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchResults();
  }, [searchQuery]);

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
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="cancel" size={18} color="#888" style={{ marginHorizontal: 6 }}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.results}>
        {loading ? (
          <ActivityIndicator size="large" color="#6200ea" /> // 로딩 인디케이터
        ) : (
          <>
            {results.length === 0 && searchQuery.trim() !== '' ? (
              <Text style={styles.noResults}>일치하는 상품이 없습니다.</Text>
            ) : (
              <FlatList
                data={results}
                keyExtractor={(item) => item.id?.toString()}
                renderItem={({ item }) => <Result text={item.name} searchQuery={searchQuery} code={item.code}/>}
                style={{ width: '100%' }}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
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
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  }
})

export default Search
