import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import Input from '../components/common/Input'
import Grass from '../components/common/Grass'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'

const SignUp = (): JSX.Element => {
  const { control, handleSubmit, watch } = useForm()

  const navigation = useNavigation()

  const onsubmit = async (data: any): Promise<void> => {
    try {
      console.log('data:', data)
      const response = await axios.post('http://3.38.185.224:8000/api/register', data)
      console.log('response:', response)
      navigation.navigate('Login' as never)
    } catch (error) {
      console.error('サインアップ:', error)
    }
  }

  return (
    <View style={styles.container}>
        <KeyboardAwareScrollView>
          <ScrollView contentContainerStyle={styles.inner}>
            <Text style={styles.filed}>お名前</Text>
            <Input
              name='name'
              control={control}
              placeholder='お名前を入力してください'
              rules={{
                required: 'お名前を入力してください',
                minLength: { value: 2, message: '名前は最低2文字です' },
                maxLength: { value: 10, message: '名前は最大10文字です' }
              }}
            />
            <Text style={styles.filed}>メールアドレス</Text>
            <Input
              name='email'
              control={control}
              placeholder='メールアドレスを入力してください'
              rules={{
                required: 'メールアドレスを入力してください',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'メールアドレスを正しく入力してください'
                }
              }}
            />
            <Text style={styles.filed}>パスワード</Text>
            <Input
              name='password'
              control={control}
              placeholder='パスワードを入力してください'
              rules={{
                required: 'パスワードを入力してください。',
                minLength: { value: 8, message: 'パスワードは最低8文字です。' },
                maxLength: { value: 16, message: 'パスワードは最大16文字まで入力可能です。' },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@*&\-_]{8,16}$/,
                  message: 'パスワードは8～16文字の英字大文字、小文字、数字、!@*&-_のみ入力可能です。'
                }
              }}
            />
            <Text style={styles.filed}>パスワード確認</Text>
            <Input
              name='password_confirmation'
              control={control}
              placeholder='再度パスワードを入力してください。'
              rules={{
                validate: value => value === watch('password') || 'パスワードが一致しません。'
              }}
            />
            <Text style={styles.filed}>ニックネーム</Text>
            <Input
              name='nickname'
              control={control}
              placeholder='ニックネームを入力してください。'
              rules={{
                required: 'ニックネームを入力してください。',
                minLength: { value: 2, message: 'ニックネームは最低2文字以上です。' },
                maxLength: { value: 12, message: 'ニックネームは最大12文字です。' }
              }}
            />
            <Text style={styles.filed}>電話番号</Text>
            <Input
              name='phone'
              control={control}
              placeholder='携帯電話番号を入力してください。'
              rules={{
                required: '携帯電話番号を入力してください。',
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: '携帯電話番号を正確に入力してください。'
                }
              }}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onsubmit)}>
              <Text style={styles.buttonLabel}>サインアップ</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>既に会員ですか？</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('Login' as never) }}>
                <Text style={styles.footerLink}>今すぐログイン！</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
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
