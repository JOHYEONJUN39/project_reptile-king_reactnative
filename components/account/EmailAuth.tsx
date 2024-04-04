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
      alert('인증 시간이 초과되었습니다. 다시 시도해주세요.')
      setTimer(null)
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval)
      }
    }
  }, [timer])

  const emailAuth = (data: FieldValues): void => {
    axios.post('http://54.180.158.4:8000/api/forget-password', { email: data.email })
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
            message: '유효하지 않는 이메일입니다.'
          })
        }
      })
  }

  const onValid = (data: FieldValues): void => {
    axios.post('http://54.180.158.4:8000/api/forget-password/verify-auth', { email: data.email, authCode: data.authCode })
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
            message: '인증코드를 다시 받아주세요'
          })
        }
        if (error.response.status === 401) {
          setError('authCode', {
            type: 'manual',
            message: '인증 시간이 초과되었습니다. 다시 시도해주세요.'
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
          placeholder='이메일을 입력해주세요.'
          rules={{
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '이메일 형식에 맞게 입력해주세요.'
            }
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            activeOpacity={0.6}
            onPress={handleSubmit(emailAuth)}
          >
            <Text style={styles.titleFont}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* codeAuth Section */}
      {onCodeSection &&
        <View>
          <Text style={[styles.commonFont, { marginBottom: 8 }]}>제공하신 이메일 주소로 인증 코드를 보내드렸습니다.</Text>
          <View style={styles.inputWrap}>
            <Input
              name='authCode'
              control={control}
              placeholder='7자리 코드'
              rules={{
                required: '인증코드를 입력해주세요.',
                minLength: { value: 7, message: '인증코드는 7자리 입니다.' },
                maxLength: { value: 7, message: '인증코드는 7자리 입니다.' }
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
                <Text style={styles.titleFont}>확인</Text>
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
