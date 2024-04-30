import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { CommunityNavigationProp } from '../../types/RootStackParamList'

interface Props {
  category: string
  title: string
  id: number
}

const PostTitle = ({ category, title, id: postId }: Props): JSX.Element => {
  const navigation = useNavigation<CommunityNavigationProp>()
  const navigateToPosts = (postId: number): void => {
    navigation.navigate('Post', { postId })
  }
  return (
    <TouchableOpacity style={styles.posts} activeOpacity={0.8} onPress={() => { navigateToPosts(postId) }}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryFont} numberOfLines={1}>{category}</Text>
      </View>
      <View style={{ maxWidth: '75%' }}>
        <Text style={styles.commonFont} numberOfLines={1}>{title}</Text>
      </View>
    </TouchableOpacity>
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
