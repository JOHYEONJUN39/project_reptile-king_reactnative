import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import MyPageLayout from '../components/layout/myPage'
import { MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Reptile } from '../types/ReptileType.interface'
import { LinearGradient } from 'expo-linear-gradient'
import FormattedDate from '../components/common/FormattedDate'

const MyPage = (): JSX.Element => {
  const [reptiles, setReptiles] = useState<Reptile[]>([])
  const navigation = useNavigation()

  const getReptileInfo = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      const response = await axios.get('http://3.38.185.224:8000/api/reptiles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('response:', response)
      setReptiles(response.data.reptiles)
    } catch (error) {
      console.error('파충류 정보를 불러오는 데 실패했습니다.', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      void getReptileInfo().then(() => {
      })
    }, [])
  )
  return (
    <MyPageLayout>
      <View style={[styles.row, { height: 100 }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://qi-o.qoo10cdn.com/goods_image_big/5/1/8/3/9419215183_l.jpg' }}
            style={{ width: '100%', height: 100, borderRadius: 50 }}
          />
        </View>
        <View style={styles.infoContainer}>
          {/* 닉네임 변경 */}
          <Pressable style={[styles.row, { height: '30%' }]} onPress={() => { navigation.navigate('EditProfile' as never) }}>
            <Text style={styles.titleFont}>조금긴닉네임임임임</Text>
            <MaterialIcons name="keyboard-arrow-right" size={28} color="#fff" />
          </Pressable>
          {/* 주문정보 */}
          <View style={[styles.row, styles.orderInfo]}>
            <View style={styles.center}>
              <Text style={styles.titleFont}>0</Text>
              <Text style={styles.titleFont}>配達状況</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.titleFont}>0</Text>
              <Text style={styles.titleFont}>配達完了</Text>
            </View>
            <Pressable style={styles.center} onPress={() => { navigation.navigate('Login' as never) }}>
              <Text style={styles.titleFont}>0</Text>
              <Text style={styles.titleFont}>レビュー</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* 체크리스트 */}
      <TouchableOpacity style={styles.eventBox}>
        <Image source={{ uri: 'https://i.ibb.co/qrvMYwr/image.png' }} style={{ width: '100%', height: '100%' }} />
      </TouchableOpacity>
      {/* 사육 파충류 */}
      <View>
        <Text style={styles.titleFont}>飼育中の爬虫類</Text>
        {reptiles
          .map((reptile) => (
            <TouchableOpacity style={styles.cageContainer} activeOpacity={0.7} onPress={() => { console.log('a') }} key={reptile.id}>
              <Image source={{ uri: reptile.img_urls[0] }} style={styles.image} />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
                style={styles.overlay}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
              />
              <View style={styles.reptileInfoContainer}>
                <Text style={[styles.titleFont, styles.hotPostTitle]} numberOfLines={1}>{reptile.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.commonFont}>생일: <FormattedDate dateString={reptile.birth} /></Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </MyPageLayout>
  )
}

const styles = StyleSheet.create({
  commonFont: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  titleFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  },
  imageContainer: {
    width: '30%'
  },
  infoContainer: {
    width: '70%',
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  orderInfo: {
    height: '70%',
    justifyContent: 'space-between'
  },
  eventBox: {
    width: '100%',
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 24,
    overflow: 'hidden'
  },
  cageContainer: {
    position: 'relative',
    width: '100%',
    marginVertical: 12
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 8
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

export default MyPage
