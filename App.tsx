import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BackPage from './pages/BackPage'
import BackHeader from './components/BackHeader'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: () => <BackHeader title='로그인'/> // BackHeader 컴포넌트 직접 사용
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            header: () => <BackHeader title='회원가입'/>
          }}
        />
        <Stack.Screen
          name="Back"
          component={BackPage}
          options={{
            header: () => <BackHeader title='메인' />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
