import React from 'react'
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { ReptileCage } from '../../types/ReptileCageTypes.interface'
import type { CageNavigationProp } from '../../types/RootStackParamList'

const CageThumbnail = ({ id, name, memo, imgUrls, setTemp, setHum }: ReptileCage): JSX.Element => {
  const navigation = useNavigation<CageNavigationProp>()
  const navigateToCageDetail = (): void => {
    navigation.navigate('CageDetail', { id })
  }
  return (
    <TouchableOpacity style={styles.cageContainer} activeOpacity={0.7} onPress={navigateToCageDetail}>
      <Image source={{ uri: imgUrls[0] }} style={styles.image} />
      <Text style={styles.commonFont}>사육장 명: {name}</Text>
      <Text style={styles.commonFont}>메모: {memo}</Text>
      <Text style={styles.commonFont}>현재 온도: {setTemp} ℃</Text>
      <Text style={styles.commonFont}>현재 습도: {setHum} %</Text>
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
  }
})

export default CageThumbnail
