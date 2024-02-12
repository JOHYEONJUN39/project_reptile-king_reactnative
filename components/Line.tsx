import { View, StyleSheet } from 'react-native'

interface LineProps {
  color?: string
  weight?: number
  mV?: number
}

const Line = ({ color, weight, mV }: LineProps): JSX.Element => {
  const styles = StyleSheet.create({
    line: {
      height: weight,
      backgroundColor: color,
      width: '100%',
      marginVertical: mV
    }
  })

  return (
    <View style={styles.line} />
  )
}

export default Line
