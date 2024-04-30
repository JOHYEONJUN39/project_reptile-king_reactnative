import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import SubmitButton from '../components/common/SubmitButton'
import Input from '../components/common/Input'
import Grass from '../components/common/Grass'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { refreshToken } from '../api/auth/refreshToken'

const Login = (): JSX.Element => {
  const { control, handleSubmit } = useForm()

  const navigation = useNavigation()

  const onsubmit = async (data: any): Promise<void> => {
    try {
      console.log('data:', data)
      const response = await axios.post('http://54.180.158.4:8000/api/login', data)
      console.log('response:', response)
      await AsyncStorage.setItem('authToken', response.headers.authorization as string)
      navigation.navigate('Market' as never)
    } catch (error) {
      console.error('로그인 에러', error)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      void refreshToken()
    }, 50 * 60 * 1000)

    return () => { clearInterval(interval) }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.filed}>로그인</Text>
        <Input
          name='email'
          control={control}
          placeholder='이메일을 입력해주세요.'
          rules={{
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '이메일 형식에 맞게 입력해주세요.'
            }
          }}
        />
        <Text style={styles.filed}>비밀번호</Text>
        <Input
          name='password'
          control={control}
          placeholder='비밀번호를 입력해주세요.'
          secureText={true}
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
        <SubmitButton label='로그인' onPress={handleSubmit(onsubmit)} />
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={styles.footerText}>회원이 아니신가요?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('SignUp' as never) }}>
              <Text style={styles.footerLink}>지금 회원가입!</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.footerText}>비밀번호를 잊으셨나요?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('EmailCredential' as never) }}>
              <Text style={styles.footerLink}>비밀번호 재설정!</Text>
            </TouchableOpacity>
          </View>
        </View>
      <Grass />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072E0A'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  },
  filed: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8
  },
  footer: {
    flexDirection: 'row'
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#ffffff'
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3'
  }
})

export default Login
