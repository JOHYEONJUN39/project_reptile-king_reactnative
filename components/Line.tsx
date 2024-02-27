import { View, StyleSheet } from 'react-native'

interface LineProps {
  color?: string
  weight?: number
  mV?: number
  direction?: 'row' | 'column'
}

const Line = ({ color, weight, mV, direction }: LineProps): JSX.Element => {
  const styles = StyleSheet.create({
    line: {
      width: direction === 'row' ? weight : '100%',
      height: direction === 'row' ? '100%' : weight,
      backgroundColor: color,
      marginVertical: mV
    }
  })

  return (
    <View style={styles.line} />
  )
}

export default Line
