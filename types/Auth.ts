import type { Control, FieldValues, RegisterOptions } from 'react-hook-form'

export interface AuthInput {
  name: string
  control: Control<FieldValues>
  rules?: RegisterOptions
  placeholder?: string
  placeholderTextColor?: string
  style?: object
  secureText?: boolean
}
