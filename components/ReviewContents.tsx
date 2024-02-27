import { View, Text, StyleSheet } from 'react-native'
import Rating from '../components/Rating'
import Line from '../components/Line'
import type { ProductProps } from '../types/ProductType'
import ProgressBar from '../components/ProgressBar'
import Review from './Review'

interface ReviewContentsProps {
  reviewData: ProductProps | null
}

const ReviewContents = ({ reviewData }: ReviewContentsProps): JSX.Element => {
  if (reviewData === null) {
    return <View><Text>리뷰 데이터가 없습니다.</Text></View>
  }
  const { totalReview, reviewsByScore, rating } = reviewData
  const percentageByScore: Record<string, number> = {}
  for (const score in reviewsByScore) {
    percentageByScore[score] = reviewsByScore[score] / totalReview
  }
  return (
    <View style={styles.container} >
      <View style={styles.numOfReviewContainer}>
        <Text style={styles.numOfReview}>리뷰</Text>
        <Text style={[styles.numOfReview, { color: '#FF80DB', marginLeft: 5 }]}>{totalReview}</Text>
      </View>
      <View style={styles.reviewRatingContainer}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{rating}</Text>
          <Rating rating={rating} size={20} />
        </View>
        <Line color='#FF80DB' weight={2} direction='row'/>
        <View style={styles.progressBarContainer}>
          {Object.entries(percentageByScore).sort((a, b) => Number(b[0]) - Number(a[0])).map(([score, percentage]) => (
            <ProgressBar key={score} score={score} percentage={percentage} width={100} height={7} color='#FF80DB' />
          ))}
        </View>
      </View>
      <Line color='#39823E' weight={2} mV={20}/>
      {reviewData.review.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  numOfReviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  numOfReview: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  reviewRatingContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#39823E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  rating: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  progressBarContainer: {
    width: '50%',
    justifyContent: 'center'
  }
})

export default ReviewContents
