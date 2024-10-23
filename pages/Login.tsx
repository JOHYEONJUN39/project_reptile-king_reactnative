import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import SubmitButton from '../components/common/SubmitButton'
import Input from '../components/common/Input'
import Grass from '../components/common/Grass'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect } from 'react'

const Login = (): JSX.Element => {
  const { control, handleSubmit } = useForm()

  const navigation = useNavigation()

  const onsubmit = async (data: any): Promise<void> => {
    const token = await AsyncStorage.getItem('notificationToken')
    console.log('token:', token)
    try {
      data = {
        email: 'yjkeong@naver.com',
        password: 'Qwer!1234',
        notificationToken: token,
        platform: 'ios'
      }
      const response = await axios.post('http://3.38.185.224:8000/api/login', data)
      console.log('response:', response)
      await AsyncStorage.setItem('authToken', response.headers.authorization as string)
      await AsyncStorage.setItem('isLoggedIn', '1')
      console.log('jwt:', response.headers.authorization)
      navigation.navigate('Market' as never)
    } catch (error) {
      console.error('로그인 에러', error)
    }
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     void checkLogin()
  //   }, [])
  // )

  // const checkLogin = async (): Promise<void> => {
  //   const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
  //   if (isLoggedIn === '1') {
  //     navigation.navigate('MyPage' as never)
  //   }
  // }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.filed}>ログイン</Text>
        <Input
          name='email'
          control={control}
          placeholder='メールアドレスを入力してください'
          rules={{
            // required: '이메일을 입력해주세요.',
            // pattern: {
            //   value: /\S+@\S+\.\S+/,
            //   message: '이메일 형식에 맞게 입력해주세요.'
            // }
          }}
        />
        <Text style={styles.filed}>パスワード</Text>
        <Input
          name='password'
          control={control}
          placeholder='パスワードを入力してください'
          secureText={true}
          rules={{
            // required: '비밀번호를 입력해주세요.',
            // minLength: { value: 8, message: '비밀번호는 최소 8글자여야 합니다.' },
            // maxLength: { value: 16, message: '비밀번호는 최대 16글자까지 입력 가능합니다.' },
            // pattern: {
            //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@*&\-_]{8,16}$/,
            //   message: '비밀번호는 8~16자의 영어 대, 소문자, 숫자, !@*&-_만 입력 가능합니다.'
            // }
          }}
        />
        <SubmitButton label='ログイン' onPress={handleSubmit(onsubmit)} />
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={styles.footerText}>会員ではありませんか？</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('SignUp' as never) }}>
              <Text style={styles.footerLink}>今すぐ登録！</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.footerText}>パスワードを忘れましたか？</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('EmailCredential' as never) }}>
              <Text style={styles.footerLink}>パスワード初期化</Text>
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
