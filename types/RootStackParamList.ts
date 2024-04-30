import type { NavigationProp, RouteProp } from '@react-navigation/native'

export interface RootStackParamList {
  Login: undefined
  Product: { category?: string, productCode?: string }
  VerifyAuth: { email?: string, code?: string }
  Community: { categoryId?: string, postId?: number, categoryName?: string, searchQuery?: string }
  Cage: { cageId?: number }
  [key: string]: any
}

export type ProductNavigationProp = NavigationProp<RootStackParamList, 'Product'>
export type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>

export type VerifyAuthNavigationProp = NavigationProp<RootStackParamList, 'VerifyAuth'>
export type VerifyAuthRouteProp = RouteProp<RootStackParamList, 'VerifyAuth'>

export type CommunityNavigationProp = NavigationProp<RootStackParamList, 'Community'>
export type CommunityRouteProp = RouteProp<RootStackParamList, 'Community'>

export type CageNavigationProp = NavigationProp<RootStackParamList, 'Cage'>
export type CageRouteProp = RouteProp<RootStackParamList, 'Cage'>
