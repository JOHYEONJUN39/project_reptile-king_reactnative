import { View, StyleSheet } from 'react-native'
import { Octicons } from '@expo/vector-icons'

interface RatingProps {
  rating: number
  size?: number
};

const Rating = ({ rating, size }: RatingProps): JSX.Element => {
  const filledStars = Math.floor(rating)
  const emptyStars = Array(5 - filledStars).fill('star')
  const starArray = [...Array(filledStars).fill('star-fill'), ...emptyStars]

  return (
    <View style={styles.rating}>
      {starArray.map((type, index) => {
        return <Octicons key={index} name={type} size={size} color={type === 'star-fill' ? '#FF80DB' : '#fff'}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})

export default Rating
