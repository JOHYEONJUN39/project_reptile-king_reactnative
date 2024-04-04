import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  label: string
  onPress: () => void
  buttonStyle?: object
  textStyle?: object
}

const SubmitButton = ({ label, onPress, buttonStyle, textStyle }: Props): JSX.Element => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonLabel, textStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#467FD3',
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 24,
    marginBottom: 24
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    color: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 24
  }
})

export default SubmitButton
