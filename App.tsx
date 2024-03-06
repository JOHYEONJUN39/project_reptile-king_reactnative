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
import ProductsByCategory from './pages/ProductsByCategory'
import ProductDetails from './pages/ProductDetails'
import BackCommonHeader from './components/header/BackCommonHeader'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Market"
            component={Market}
            options={{
              header: () => <MarketHeader />
            }}
          />
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
                header: () => <BackCommonHeader title='회원가입'/>
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                header: () => <BackCommonHeader title='메뉴'/>
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
                header: () => <BackCommonHeader title='장바구니'/>
              }}
            />
            <Stack.Screen
              name="ProductsByCategory"
              component={ProductsByCategory}
              options={{
                header: () => <MarketHeader />
              }}
            />
            <Stack.Screen
              name="Product"
              component={ProductDetails}
              options={{
                header: () => <MarketHeader />
              }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
