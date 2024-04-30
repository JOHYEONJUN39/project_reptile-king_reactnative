import React, { useState, useCallback } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import CageLayout from '../components/layout/cage'
import CageThumbnail from '../components/cage/CageThumbnail'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import type { CageResponse, ReptileCage } from '../types/ReptileCageTypes.interface'

const Cage = (): JSX.Element => {
  const navigation = useNavigation()
  const [cages, setCages] = useState<ReptileCage[]>([])

  const fetchData = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      const response = await axios.get<CageResponse>('http://54.180.158.4:8000/api/cages', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('사육장 데이터', response.data)
      setCages(response.data.cages)
    } catch (error) {
      Alert.alert(
        '로그인 필요',
        '로그인이 필요한 서비스입니다.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login' as never)
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  useFocusEffect(
    useCallback(() => {
      void fetchData()
    }, [])
  )

  return (
    <CageLayout title="사육장 관리" subtitle="주인님 추워요!">
      <View style={styles.inner}>
        <View>
          <Text style={styles.titleFont}>보유중인 사육장</Text>
        </View>
        <View style={styles.cagesContainer}>
          {cages.map(cage => (
            <CageThumbnail key={cage.id} {...cage} />
          ))}
        </View>
      </View>
    </CageLayout>
  )
}

const styles = StyleSheet.create({
  titleFont: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  commonFont: {
    color: '#fff',
    fontSize: 16
  },
  inner: {
    paddingTop: 32,
    paddingHorizontal: 16
  },
  cagesContainer: {
    flex: 1
  }
})

export default Cage
