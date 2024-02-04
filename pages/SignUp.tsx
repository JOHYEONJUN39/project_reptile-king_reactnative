import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitButton from "../components/SubmitButton";
import { Control, FieldValues, RegisterOptions, useController, useForm } from "react-hook-form";

interface InputProps {
  name: string;
  control: Control<FieldValues>;
  rules?: RegisterOptions
}

const Input = ({name, control, rules} : InputProps) => {
  const { field, fieldState: { error } } = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });

  return (
    <>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  )
}

const SignUp = (): JSX.Element => {

  const { control, handleSubmit, watch } = useForm();

  const navigation = useNavigation();

  const onsubmit = () => {
    navigation.navigate('Back' as never); // 'Back' 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.filed}>아이디</Text>
        <Input
          name='id'
          control={control}
          rules={{
            required: '아이디는 필수 입력항목입니다.',
            minLength: { value: 8, message: '아이디는 최소 8글자여야 합니다.' },
            maxLength: { value: 20, message: '아이디는 최대 20글자까지 입력 가능합니다.' },
          }} 
        />
        <Text style={styles.filed}>비밀번호</Text>
        <Input
          name='password'
          control={control}
          rules={{
            required: '비밀번호를 입력해주세요.',
            minLength: { value: 8, message: '비밀번호는 최소 8글자여야 합니다.' },
            maxLength: { value: 20, message: '비밀번호는 최대 20글자까지 입력 가능합니다.' },
            pattern: { 
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, 
              message: '비밀번호는 최소 8글자, 최대 20글자로 영문, 숫자가 반드시 포함되어야 합니다.' 
            },
          }}
        />
        <Text style={styles.filed}>비밀번호 재입력</Text>
        <Input
          name='confirmPassword'
          control={control}
          rules={{ 
            validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.' 
          }} 
        />
        <Button title='회원가입' onPress={handleSubmit(onsubmit)} />
        {/* <SubmitButton label='회원가입' onPress={handleSignUp} /> */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>이미 회원이신가요?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
            <Text style={styles.footerLink}>지금 로그인!</Text>
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
  filed: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#ffffff',
    height: 48,
    padding: 8,
    fontSize: 16,
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
  },
  error: {
    fontSize: 12,
    color: '#ffffff',
  }
})

export default SignUp