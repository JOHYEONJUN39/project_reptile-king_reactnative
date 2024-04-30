import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import CommonHeader from './components/header/CommonHeader'
import BackCommonHeader from './components/header/BackCommonHeader'
import MarketHeader from './components/header/MarketHeader'
import {
  Login,
  SignUp,
  EmailCredential,
  ChangePassword,
  Market,
  Menu,
  ProductsByCategory,
  ProductDetails,
  Cart,
  Search,
  Notify,
  Payment,
  Community,
  Posts,
  Post,
  Write,
  EditPost,
  CommunitySearch,
  Cage,
  CageDetail
} from './pages'
import 'react-native-get-random-values'

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
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Write"
        component={Write}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CommunitySearch"
        component={CommunitySearch}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

function CageStack (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cage"
        component={Cage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CageDetail"
        component={CageDetail}
        options={{
          headerShown: false
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
            name="CageTab"
            component={CageStack}
            options={{
              title: '사육장 관리',
              tabBarLabelStyle: { fontSize: 14, color: '#fff' },
              tabBarIcon: ({ size }) => (
                <MaterialCommunityIcons name="home-thermometer-outline" color={'#fff'} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="LoginTab"
            component={LoginStack}
            options={{
              title: '마이페이지',
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
