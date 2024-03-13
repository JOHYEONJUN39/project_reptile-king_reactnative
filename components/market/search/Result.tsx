import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface ResultProps {
  text: string
  searchQuery: string
}

const Result = ({ text, searchQuery }: ResultProps): JSX.Element => {
  const parts = text !== '' ? text.split(new RegExp(`(${searchQuery})`, 'gi')) : []
  return (
    <TouchableOpacity style={styles.resultContainer}>
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
