import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Market, Menu, Notify, Cart, ProductsByCategory, ProductDetails, Search, Payment } from '../../pages'
import MarketHeader from '../header/MarketHeader'
import BackCommonHeader from '../header/BackCommonHeader'

const Stack = createNativeStackNavigator()

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
        options={{ header: () => <BackCommonHeader title="メニュー" /> }}
      />
      <Stack.Screen
        name="Notify"
        component={Notify}
        options={{
          header: () => <BackCommonHeader title='アラート'/>
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: () => <BackCommonHeader title='カート'/>
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
          header: () => <BackCommonHeader title='お支払い'/>
        }}
      />
    </Stack.Navigator>
  )
}

export default MarketStack
