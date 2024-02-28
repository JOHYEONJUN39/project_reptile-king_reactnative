import React from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import Rating from '../common/Rating'
import type { ReviewData } from '../../types/ProductType'

interface ReviewProps {
  review: ReviewData
}

const Review = ({ review }: ReviewProps): JSX.Element => {
  const { profileImage, nickname, rating, date, productImage, content } = review
  return (
    <View style={styles.reviewContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image source={{ uri: 'https://i.postimg.cc/qRpzCTff/image.webp' ?? profileImage }} style={styles.profileImage} />
        <View>
          <Text style={styles.nickname}>{nickname}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Rating rating={rating} size={16} />
            <Text style={styles.createdAt}>{date}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
        <Image source={{ uri: productImage }} style={styles.productImage} />
        <TextInput style={{ width: '70%', height: 'auto', color: '#fff', marginLeft: 10, fontWeight: '500', lineHeight: 20 }} editable={false} multiline={true}>
          {content}
        </TextInput>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  reviewContainer: {
    width: '100%',
    height: 'auto',
    paddingBottom: 20
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  nickname: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  createdAt: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10
  }
})

export default Review
