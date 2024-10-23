import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import 'react-native-get-random-values'
import { useEffect, useRef } from 'react'
import * as Notifications from 'expo-notifications'
import MarketStack from './components/stack/MarketStack'
import CommunityStack from './components/stack/CommunityStack'
import CageStack from './components/stack/CageStack'
import LoginStack from './components/stack/LoginStack'
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CartProvider } from './context/CartContext'
// import * as Linking from 'expo-linking'

const Tab = createBottomTabNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

const App = (): JSX.Element => {
  const navigationRef = useRef(null)
  async function registerForPushNotificationsAsync (): Promise<void> {
    let token

    if (Platform.OS === 'android') {
      void Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    if (Device.isDevice === true) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        // Alert.alert("Failed to get push token for push notification!");
        return
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId
      })
    } else {
      // Alert.alert("Must use physical device for Push Notifications");
    }
    if (token?.data === undefined) {
      return
    }
    await AsyncStorage.setItem('notificationToken', token.data)
  }

  async function saveNotificationToStorage(notification) {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    let notificationsArray = storedNotifications ? JSON.parse(storedNotifications) : [];
    notificationsArray.unshift(notification);
    await AsyncStorage.setItem('notifications', JSON.stringify(notificationsArray));
  }

  useEffect(() => {
    void registerForPushNotificationsAsync()
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('RESPONSE', response)
      console.log('NOTIFICATION DATA', response.notification)
      const url = response.notification.request.content.data.category
      
      if (url !== undefined) {
        console.log('URL', url)
        if (url === 'login') {
          // LoginStack으의 LoginScreen으로 이동
          navigationRef.current?.navigate('LoginTab', { screen: 'Login' })
        }
      }
      saveNotificationToStorage(response.notification)
    })
    return () => {
      subscription.remove()
    }
  }, [])
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer ref={navigationRef}>
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
                title: 'ストア',
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
                title: 'コミュニティー',
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
                title: '飼育ケージ',
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
                title: 'マイページ',
                tabBarLabelStyle: { fontSize: 14, color: '#fff' },
                tabBarIcon: ({ size }) => (
                  <MaterialIcons name="login" color={'#fff'} size={size} />
                )
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  )
}

export default App
