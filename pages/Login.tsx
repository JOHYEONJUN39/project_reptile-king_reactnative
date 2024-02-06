import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import SubmitButton from "../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";


const Login = (): JSX.Element => {

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Back' as never); // 'Back' 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>로그인</Text>
        <TextInput style={styles.input} value='이메일을 입력해주세요' />
        <TextInput style={styles.input} value='비밀번호를 입력해주세요' />
        <SubmitButton label='로그인' onPress={handleLogin} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>회원이 아니신가요?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
            <Text style={styles.footerLink}>지금 회원가입!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072E0A',
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#ffffff',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#467FD3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    color: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#ffffff',
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3',
  }
})

export default Login