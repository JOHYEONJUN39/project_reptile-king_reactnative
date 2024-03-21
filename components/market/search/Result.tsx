import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import type { ProductNavigationProp } from '../../../types/RootStackParamList'

interface ResultProps {
  text: string
  searchQuery: string
  code: string
}

const Result = ({ text, searchQuery, code }: ResultProps): JSX.Element => {
  const navigation = useNavigation<ProductNavigationProp>()
  const navigateProduct = (): void => {
    navigation.navigate('Product', { productCode: code })
  }
  const parts = text !== '' ? text.split(new RegExp(`(${searchQuery})`, 'gi')) : []
  return (
    <TouchableOpacity style={styles.resultContainer} onPress={navigateProduct}>
      <FontAwesome name="search" size={20} color="#fff" style={{ marginHorizontal: 8 }}/>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>
        {parts.map((part, index) => (
          <Text key={index} style={part.toLowerCase() === searchQuery.toLowerCase() ? { color: '#4E88F8' } : undefined}>
            {part}
          </Text>
        ))}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  resultContainer: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8
  }
})

export default Result
