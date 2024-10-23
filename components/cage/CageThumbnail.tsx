import React, { useEffect, useState } from 'react'
import { Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { ReptileCage } from '../../types/ReptileCageTypes.interface'
import type { CageNavigationProp } from '../../types/RootStackParamList'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CageThumbnail = ({ id, name, img_urls }: ReptileCage): JSX.Element => {
  const navigation = useNavigation<CageNavigationProp>()
  const [temp, setTemp] = useState(0)
  const [hum, setHum] = useState(0)
  const navigateToCageDetail = (): void => {
    navigation.navigate('CageDetail', { cageId: id })
  }
  const fetchData = async (): Promise<void> => {
    const token = await AsyncStorage.getItem('authToken')
    const fetchNowTempHum = await axios.get(`http://3.38.185.224:8000/api/cages/${id}/latest-temperature-humidity`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const nowTemp = fetchNowTempHum.data.latestData.temperature
    const nowHum = fetchNowTempHum.data.latestData.humidity
    setTemp(nowTemp)
    setHum(nowHum)
  }
  useEffect(() => {
    void fetchData()
  } 
  , [])
  return (
    <TouchableOpacity style={styles.cageContainer} activeOpacity={0.7} onPress={navigateToCageDetail}>
      <Image source={{ uri: img_urls[0] }} style={styles.image} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
        style={styles.overlay}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      <View style={styles.reptileInfoContainer}>
        <Text style={[styles.commonFont, styles.hotPostTitle]}>{name}</Text>
        <Text style={styles.commonFont}>현재 온도: {temp}℃</Text>
        <Text style={styles.commonFont}>현재 습도: {hum}%</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  commonFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  cageContainer: {
    width: '100%',
    borderRadius: 8,
    marginVertical: 12
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 8,
    borderRadius: 8
  },
  reptileInfoContainer: {
    position: 'absolute',
    left: 20,
    right: 0,
    top: 20
  },
  hotPostTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 250
  }
})

export default CageThumbnail
