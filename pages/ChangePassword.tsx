import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import axios from 'axios'
import type { VerifyAuthRouteProp } from '../types/RootStackParamList'
import { useNavigation, useRoute } from '@react-navigation/native'
import ResetPasswordLayout from '../components/layout/ResetPassword'
import Input from '../components/common/Input'
import SubmitButton from '../components/common/SubmitButton'

const ChangePassword = (): JSX.Element => {
  const navigation = useNavigation()
  const route = useRoute<VerifyAuthRouteProp>()
  const { email } = route.params
  const { control, handleSubmit, watch } = useForm<FieldValues>()

  const onsubmit = async (data: FieldValues): Promise<void> => {
    const requestData = {
      email,
      password: data.password,
      password_confirmation: data.confirmPassword
    }
    console.log('requestData:', requestData)
    await axios.patch('http://54.180.158.4:8000/api/forget-password/change-password', requestData)
      .then(response => {
        console.log('response:', response)
        Alert.alert('비밀번호 재설정', '비밀번호가 변경되었습니다. 다시 로그인해주세요.')
        navigation.navigate('Login' as never)
      })
      .catch(error => {
        if (error.response.status === 400) {
          Alert.alert('비밀번호 재설정', '')
        }
      })
  }

  return (
    <ResetPasswordLayout>
      <Input
        name="password"
        placeholder="새 비밀번호"
        control={control}
        rules={{
          required: '비밀번호를 입력해주세요.',
          minLength: { value: 8, message: '비밀번호는 최소 8글자여야 합니다.' },
          maxLength: { value: 16, message: '비밀번호는 최대 16글자까지 입력 가능합니다.' },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@*&\-_]{8,16}$/,
            message: '비밀번호는 8~16자의 영어 대, 소문자, 숫자, !@*&-_만 입력 가능합니다.'
          }
        }}
      />
      <View style={{ marginBottom: 8 }}/>
      <Input
        name='confirmPassword'
        placeholder="새 비밀번호 확인"
        control={control}
        rules={{
          validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.'
        }}
      />
      <SubmitButton label='비밀번호 변경' onPress={handleSubmit(onsubmit)} buttonStyle={style.buttonContainer} textStyle={style.titleFont}/>
    </ResetPasswordLayout>
  )
}

const style = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleFont: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
})

export default ChangePassword
