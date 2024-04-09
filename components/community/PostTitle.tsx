import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  category: string
  title: string
}

const PostTitle = ({ category, title }: Props): JSX.Element => {
  return (
    <View style={styles.posts}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryFont} numberOfLines={1}>{category}</Text>
      </View>
      <View style={{ maxWidth: '75%' }}>
        <Text style={styles.commonFont} numberOfLines={1}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    maxWidth: '20%',
    backgroundColor: '#39823E',
    padding: 5,
    marginRight: 8,
    borderRadius: 5
  },
  categoryFont: {
    color: '#fff',
    fontSize: 12
  },
  commonFont: {
    color: '#fff',
    fontSize: 16
  },
  posts: {
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default PostTitle
