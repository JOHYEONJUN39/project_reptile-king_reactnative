import { View, Text, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'

interface ProgressBarProps {
  score: string
  percentage: number
  width: number
  height: number
  color: string
}

const ProgressBar = ({ score, percentage, width, height, color }: ProgressBarProps): JSX.Element => {
  return (
    <View style={styles.progressBar}>
      <Text style={styles.text}>{score}점</Text>
      <Progress.Bar progress={percentage} width={width} height={height} color={color} unfilledColor='#fff'/>
      <Text style={styles.text}>{Math.round(percentage * 100)}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 5
  },
  progressBar: {
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default ProgressBar
