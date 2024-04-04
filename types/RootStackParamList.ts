import type { NavigationProp, RouteProp } from '@react-navigation/native'

export interface RootStackParamList {
  Product: { category?: string, productCode?: string }
  VerifyAuth: { email?: string, code?: string }
  [key: string]: any
}

export type ProductNavigationProp = NavigationProp<RootStackParamList, 'Product'>
export type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>

export type VerifyAuthNavigationProp = NavigationProp<RootStackParamList, 'VerifyAuth'>
export type VerifyAuthRouteProp = RouteProp<RootStackParamList, 'VerifyAuth'>
