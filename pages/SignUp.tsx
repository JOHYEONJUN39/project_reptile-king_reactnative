import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import Input from '../components/common/Input'
import Grass from '../components/common/Grass'
import axios from 'axios'

const SignUp = (): JSX.Element => {
  const { control, handleSubmit, watch } = useForm()

  const navigation = useNavigation()

  const onsubmit = async (data: any): Promise<void> => {
    try {
      console.log('data:', data)
      const response = await axios.post('http://54.180.158.4:8000/api/register', data)
      console.log('response:', response)
      navigation.navigate('Login' as never)
    } catch (error) {
      console.error('회원가입:', error)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.filed}>이름</Text>
        <Input
          name='name'
          control={control}
          placeholder='이름을 입력해주세요.'
          rules={{
            required: '이름을 입력해주세요.',
            minLength: { value: 2, message: '이름은 최소 2글자 이상입니다.' },
            maxLength: { value: 10, message: '이름은 최대 10글자 입니다.' }
          }}
        />
        <Text style={styles.filed}>이메일</Text>
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
        <Text style={styles.filed}>비밀번호 확인</Text>
        <Input
          name='password_confirmation'
          control={control}
          placeholder='비밀번호를 다시 입력해주세요.'
          rules={{
            validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.'
          }}
        />
        <Text style={styles.filed}>닉네임</Text>
        <Input
          name='nickname'
          control={control}
          placeholder='닉네임을 입력해주세요.'
          rules={{
            required: '닉네임을 입력해주세요.',
            minLength: { value: 2, message: '닉네임은 최소 2글자 이상입니다.' },
            maxLength: { value: 12, message: '닉네임은 최대 12글자 입니다.' }
          }}
        />
        <Text style={styles.filed}>전화번호</Text>
        <Input
          name='phone'
          control={control}
          placeholder='휴대전화 번호를 입력해주세요.'
          rules={{
            required: '휴대전화 번호를 입력해주세요.',
            pattern: {
              value: /^\d{3}-\d{3,4}-\d{4}$/,
              message: '휴대전화 번호를 정확히 입력해주세요.'
            }
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onsubmit)}>
          <Text style={styles.buttonLabel}>회원가입</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>이미 회원이신가요?</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Login' as never) }}>
            <Text style={styles.footerLink}>지금 로그인!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginRight: 18,
    color: '#ffffff'
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#5599FF'
  },
  button: {
    backgroundColor: '#467FD3',
    borderRadius: 4,
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

export default SignUp
