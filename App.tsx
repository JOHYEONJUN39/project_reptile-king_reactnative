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
import Search from './pages/Search'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import Community from './pages/Community'
import Payment from './pages/Payment'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MarketStack (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Market"
        component={Market}
        options={{ header: () => <MarketHeader /> }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ header: () => <BackCommonHeader title="메뉴" /> }}
      />
      <Stack.Screen
        name="Notify"
        component={Notify}
        options={{
          header: () => <BackCommonHeader title='알림'/>
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
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          header: () => <BackCommonHeader title='주문/결제'/>
        }}
      />
    </Stack.Navigator>
  )
}

function CommunityStack (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Community"
        component={Community}
        options={{
          header: () => <CommonHeader title='로그인'/>
        }}
      />
    </Stack.Navigator>
  )
}

function LoginStack (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <CommonHeader title='로그인'/>
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          header: () => <BackCommonHeader title='회원가입'/>
        }}
      />
    </Stack.Navigator>
  )
}

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#072E0A',
              borderTopWidth: 1,
              borderTopColor: '#39823E'
            }
          }}
        >
          <Tab.Screen
            name="MarketTab"
            component={MarketStack}
            options={{
              title: '스토어',
              tabBarLabelStyle: { fontSize: 14, color: '#fff' },
              tabBarIcon: ({ size }) => (
                <MaterialIcons name="storefront" color={'#fff'} size={size}/>
              )
            }}
          />
          <Tab.Screen
            name="CommunityTab"
            component={CommunityStack}
            options={{
              title: '커뮤니티',
              tabBarLabelStyle: { fontSize: 14, color: '#fff' },
              tabBarIcon: ({ size }) => (
                <MaterialIcons name="groups" color={'#fff'} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="LoginTab"
            component={LoginStack}
            options={{
              title: '로그인',
              tabBarLabelStyle: { fontSize: 14, color: '#fff' },
              tabBarIcon: ({ size }) => (
                <MaterialIcons name="login" color={'#fff'} size={size} />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
