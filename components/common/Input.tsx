import { Text, TextInput, StyleSheet } from 'react-native'
import { useController } from 'react-hook-form'
import type { AuthInput } from '../../types/Auth'

const Input = ({ name, control, rules, placeholder, style }: AuthInput): JSX.Element => {
  const { field, fieldState: { error } } = useController({
    control,
    defaultValue: '',
    name,
    rules
  })

  return (
    <>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        style={[styles.input, style]}
        placeholder={placeholder}
        maxLength={30}
      />
      {error !== null && error !== undefined && <Text style={styles.error}>{error.message}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    height: 48,
    padding: 8,
    fontSize: 16
  },
  error: {
    fontSize: 12,
    color: '#ffffff'
  }
})

export default Input
