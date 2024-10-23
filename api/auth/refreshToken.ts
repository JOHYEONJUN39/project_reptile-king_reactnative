import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const refreshToken = async (): Promise<void> => {
  try {
    const currentToken = await AsyncStorage.getItem('authToken')
    const response = await axios.post('http://3.38.185.224:8000/api/refresh-token', {}, {
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    })
    await AsyncStorage.setItem('authToken', response.headers.authorization as string)
  } catch (error) {
    console.error('토큰 갱신 에러', error)
  }
}
