import type { NavigationProp, RouteProp } from '@react-navigation/native'

export interface RootStackParamList {
  Login: undefined
  SignUp: undefined
  Market: undefined
  Menu: undefined
  Notify: undefined
  Cart: undefined
  Product: { category?: string, productCode?: string }
  [key: string]: undefined | { category?: string, productCode?: string }
}

export type ProductNavigationProp = NavigationProp<RootStackParamList, 'Product'>
export type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>
