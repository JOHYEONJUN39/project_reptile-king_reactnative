import axios from 'axios'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { VerifyAuthNavigationProp } from '../../types/RootStackParamList'
import { useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import Input from '../common/Input'
import { useEffect, useState } from 'react'

const EmailAuth = (): JSX.Element => {
  const navigation = useNavigation<VerifyAuthNavigationProp>()
  const { control, handleSubmit, setError } = useForm<FieldValues>()
  const [onCodeSection, setOnCodeSection] = useState<boolean>(false)
  const [timer, setTimer] = useState<number | null>(null)

  useEffect(() => {
    // 웹 브라우저와 Node.js 양쪽 환경에서 모두 작동하도록 유니온 타입을 사용하여 interval 변수가 number 또는 NodeJS.Timeout 타입을 가질 수 있도록 선언
    let interval: ReturnType<typeof setInterval> | null = null

    if (timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
    } else if (timer === 0) {
      alert('認証時間が超過しました。再試行してください。')
      setTimer(null)
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval)
      }
    }
  }, [timer])

  const emailAuth = (data: FieldValues): void => {
    axios.post('http://3.38.185.224:8000/api/forget-password', { email: data.email })
      .then(response => {
        if (response.status === 200) {
          setOnCodeSection(true)
          setTimer(20)
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          setError('email', {
            type: 'manual',
            message: '有効ではないメールアドレスです。'
          })
        }
      })
  }

  const onValid = (data: FieldValues): void => {
    axios.post('http://3.38.185.224:8000/api/forget-password/verify-auth', { email: data.email, authCode: data.authCode })
      .then(response => {
        if (response.status === 200) {
          setTimer(null)
          navigation.navigate('ChangePassword', { email: data.email })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          setError('authCode', {
            type: 'manual',
            message: '認証コードを再度受け取ってください。'
          })
        }
        if (error.response.status === 401) {
          setError('authCode', {
            type: 'manual',
            message: '認証時間が超過しました。再試行してください。'
          })
        }
      })
  }

  return (
    <>
      {/* emailAuth Section */}
      <View style={{ marginBottom: 8 }}>
        <Input
          name='email'
          control={control}
          placeholder='メールアドレスを入力してください。'
          rules={{
            required: 'メールアドレスを入力してください。',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'メールアドレスの形式に従って入力してください。'
            }
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            activeOpacity={0.6}
            onPress={handleSubmit(emailAuth)}
          >
            <Text style={styles.titleFont}>確認</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* codeAuth Section */}
      {onCodeSection &&
        <View>
          <Text style={[styles.commonFont, { marginBottom: 8 }]}>提供されたメールアドレスに認証コードを送信しました。</Text>
          <View style={styles.inputWrap}>
            <Input
              name='authCode'
              control={control}
              placeholder='7桁のコード'
              rules={{
                required: '認証コードを入力してください。',
                minLength: { value: 7, message: '認証コードは7桁です。' },
                maxLength: { value: 7, message: '認証コードは7桁です。' }
              }}
            />
            <View style={styles.buttonContainer}>
              {timer !== null &&
                <Text style={styles.timeLimit}>
                  {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
                </Text>
              }
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                activeOpacity={0.6}
                onPress={handleSubmit(onValid)}
              >
                <Text style={styles.titleFont}>確認</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  titleFont: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  commonFont: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  inputWrap: {
    position: 'relative',
    marginBottom: 8
  },
  button: {
    backgroundColor: '#467FD3',
    borderRadius: 5,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    right: 8,
    top: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitButton: {
    width: 60,
    height: 35
  },
  timeLimit: {
    color: '#FF7676',
    fontSize: 14,
    marginRight: 8
  }
})

export default EmailAuth
