import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CommonHeader from './components/header/CommonHeader'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Market from './pages/Market'
import MarketHeader from './components/header/MarketHeader'
import Menu from './pages/Menu'
import Notify from './pages/Notify'
import Cart from './pages/Cart'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: () => <CommonHeader title='로그인'/> // BackHeader 컴포넌트 직접 사용
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            header: () => <CommonHeader title='회원가입'/>
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            header: () => <CommonHeader title='메뉴'/>
          }}
        />
        <Stack.Screen
          name="Notify"
          component={Notify}
          options={{
            header: () => <CommonHeader title='알림'/>
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            header: () => <CommonHeader title='장바구니'/>
          }}
        />
        <Stack.Screen
          name="Market"
          component={Market}
          options={{
            header: () => <MarketHeader />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
