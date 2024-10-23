import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, MyPage, EditProfile, SignUp, EmailCredential, ChangePassword } from '../../pages'
import CommonHeader from '../header/CommonHeader'
import MyPageHeader from '../header/MyPageHeader'
import BackCommonHeader from '../header/BackCommonHeader'

const Stack = createNativeStackNavigator()

function LoginStack (): JSX.Element {
  // const [userToken, setUserToken] = useState(false)

  // useEffect(() => {
  //   // AsyncStorage에서 토큰 가져오기
  //   const fetchToken = async (): Promise<void> => {
  //     const token = await AsyncStorage.getItem('authToken')
  //     if (token !== null) {
  //       setUserToken(true)
  //     }
  //   }

  //   void fetchToken()
  // }, [])
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <CommonHeader title='ログイン'/>
        }}
      />
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{
          header: () => <MyPageHeader />
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          header: () => <BackCommonHeader title='プロフィール編集'/>
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          header: () => <BackCommonHeader title='新規登録'/>
        }}
      />
      <Stack.Screen
        name="EmailCredential"
        component={EmailCredential}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default LoginStack
