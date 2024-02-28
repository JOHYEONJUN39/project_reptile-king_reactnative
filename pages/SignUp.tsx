import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SubmitButton from '../components/common/SubmitButton'
import { useForm } from 'react-hook-form'
import Input from '../components/common/Input'
import Grass from '../components/common/Grass'

const SignUp = (): JSX.Element => {
  const { control, handleSubmit, watch } = useForm()

  const navigation = useNavigation()

  const onsubmit = (): void => {
    navigation.navigate('Market' as never) // 'Back' 페이지로 이동
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.filed}>아이디</Text>
        <Input
          name='id'
          control={control}
          placeholder='아이디를 입력해주세요.'
          rules={{
            required: '아이디는 필수 입력항목입니다.',
            minLength: { value: 8, message: '아이디는 최소 8글자여야 합니다.' },
            maxLength: { value: 20, message: '아이디는 최대 20글자까지 입력 가능합니다.' }
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
            maxLength: { value: 20, message: '비밀번호는 최대 20글자까지 입력 가능합니다.' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
              message: '비밀번호는 최소 8글자, 최대 20글자로 영문, 숫자가 반드시 포함되어야 합니다.'
            }
          }}
        />
        <Text style={styles.filed}>비밀번호 재입력</Text>
        <Input
          name='confirmPassword'
          control={control}
          placeholder='비밀번호를 다시 입력해주세요.'
          rules={{
            validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.'
          }}
        />
        <SubmitButton label='회원가입' onPress={handleSubmit(onsubmit)} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>이미 회원이신가요?</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Login' as never) }}>
            <Text style={styles.footerLink}>지금 로그인!</Text>
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
    backgroundColor: '#072E0A',
    justifyContent: 'space-between'
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

export default SignUp
