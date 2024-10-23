import React, { useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, LayoutAnimation, Alert } from 'react-native'
import CageLayout from '../components/layout/cage'
import Line from '../components/common/Line'
import InfoList from '../components/common/InfoList'
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from '@rneui/themed'
import { MaterialIcons } from '@expo/vector-icons'
import BezierLineChart from '../components/cage/BezierLineChart'
import { useRoute } from '@react-navigation/native'
import type { CageRouteProp } from '../types/RootStackParamList'
import type { ReptileCage } from '../types/ReptileCageTypes.interface'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Video } from 'expo-av'

const CageDetail = (): JSX.Element => {
  const route = useRoute<CageRouteProp>()
  const { cageId } = route.params
  const [isInfoVisible, setIsInfoVisible] = useState(false)
  const [cageData, setCageData] = useState<ReptileCage>()
  const [temp, setTemp] = useState(0)
  const [hum, setHum] = useState(0)
  const [settingTemp, setSettingTemp] = useState(0)
  const [settingHum, setSettingHum] = useState(0)
  const toggleInfoVisibility = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsInfoVisible(!isInfoVisible)
  }
  const fetchData = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      const response = await axios.get<ReptileCage>(`http://3.38.185.224:8000/api/cages/${cageId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('사육장 데이터', response)
      setCageData(response.data.cage)
      setSettingTemp(response.data.cage.set_temp)
      setSettingHum(response.data.cage.set_hum)
      const fetchNowTempHum = await axios.get(`http://3.38.185.224:8000/api/cages/${response.data.cage.id}/latest-temperature-humidity`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const nowTemp = fetchNowTempHum.data.latestData.temperature
      const nowHum = fetchNowTempHum.data.latestData.humidity
      setTemp(nowTemp)
      setHum(nowHum)
    } catch (error) {
      console.log('에러', error)
    }
  }

  useEffect(() => {
    void fetchData()
  }
  , [])

  const saveTempHum = async (): Promise<void> => {
    const formData = {
      serialCode: cageData?.serialCode,
      setTemp: settingTemp,
      setHum: settingHum
    }
    try {
      const token = await AsyncStorage.getItem('authToken')
      const edit = await axios.patch(`http://3.38.185.224:8000/api/cages/${cageData?.id}/update-temperature-humidity`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // 온습도가 변경되었다는 Alert를 보여줌
      Alert.alert('温湿度設定', 'ただいま温湿度が設定されました！')
      console.log('수정', edit)
    } catch (error) {
      console.log('에러', error)
    }
  }

  return (
    <CageLayout title="飼育ケージ" subtitle="寒いよ！">
      <View style={styles.inner}>
        {/* <Text style={styles.titleFont}>{cageData?.name}</Text> */}
        <TouchableOpacity
          style={styles.cageImageContainer}
          activeOpacity={0.8}
          onPress={toggleInfoVisibility}
        >
          <Image
            source={{ uri: cageData?.img_urls[0] }}
            style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(7,46,10,0.7)']}
            style={styles.overlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          {
            isInfoVisible
              ? (
                <Text style={[styles.titleFont, { position: 'absolute' }]}>
                  クリックして情報を非表示にする
                </Text>
                )
              : (
                <Text style={[styles.titleFont, { position: 'absolute' }]}>
                  クリックして情報を表示する
                </Text>
                )
          }
        </TouchableOpacity>
        {isInfoVisible && (
        <View>
          <View style={styles.row}>
            <Text style={styles.titleFont}>파충류 정보</Text>
            {/* <Text style={styles.commonFont}>파충류 추가하기 버튼</Text> */}
          </View>
          <Line color='#39823E' weight={2} mV={12} />
          {
            cageData?.reptileSerialCode
              ? (
                // 일본어로 변경
                <InfoList dataTitles={['名前', '種類', '誕生日']} dataValues={['쫀딕이', '크레스티드 게코', '1개월']} />
              )
              : (
                <InfoList dataTitles={['名前', '種類', '誕生日']} dataValues={['쫀딕이', '크레스티드 게코', '1개월']} />
                )
          }
        </View>
        )}
        {/* 현재 온습도 */}
        <Text style={styles.titleFont}>現在温・湿度</Text>
        <View style={styles.row}>
          <View style={styles.cageContainer}>
            <Text style={styles.titleFont}>現在温度</Text>
            <Text style={styles.titleFont}>{temp}°C</Text>
          </View>
          <View style={styles.cageContainer}>
            <Text style={styles.titleFont}>現在湿度</Text>
            <Text style={styles.titleFont}>{hum}%</Text>
          </View>
        </View>
        {/* 온습도 설정 */}
        <Text style={styles.titleFont}>設定温・湿度</Text>
        <View style={styles.row}>
          <View style={styles.cageContainer}>
            <Text style={styles.titleFont}>設定温度</Text>
            <Text style={styles.titleFont}>{settingTemp}°C</Text>
          </View>
          <View style={styles.cageContainer}>
            <Text style={styles.titleFont}>設定湿度</Text>
            <Text style={styles.titleFont}>{settingHum}%</Text>
          </View>
        </View>
        {/* 조절 버튼 */}
        <View style={[styles.row, { marginVertical: 12 }]}>
          <Button containerStyle={styles.controllerContainer} type='clear' buttonStyle={{ padding: 0 }} onPress={() => { setSettingTemp(prevTemp => prevTemp + 1) }}>
            <MaterialIcons name='arrow-upward' size={20} color='#fff' />
          </Button>
          <Button containerStyle={styles.controllerContainer} type='clear' buttonStyle={{ padding: 0 }} onPress={() => { setSettingTemp(prevTemp => prevTemp - 1) }}>
            <MaterialIcons name='arrow-downward' size={20} color='#fff' />
          </Button>
          <Button containerStyle={styles.controllerContainer} type='clear' buttonStyle={{ padding: 0 }} onPress={() => { setSettingHum(prevTemp => prevTemp + 1) }}>
            <MaterialIcons name='arrow-upward' size={20} color='#fff' />
          </Button>
          <Button containerStyle={styles.controllerContainer} type='clear' buttonStyle={{ padding: 0 }} onPress={() => { setSettingHum(prevTemp => prevTemp - 1) }}>
            <MaterialIcons name='arrow-downward' size={20} color='#fff' />
          </Button>
        </View>
        {/* 저장 */}
        <Button containerStyle={styles.setCageButton} type='clear' buttonStyle={{ padding: 0 }} titleStyle={styles.commonFont} onPress={saveTempHum}>
          <MaterialIcons name='save' size={20} color='#fff' />
          온・습도 저장
        </Button>
        {/* 온습도 차트 */}
        <Text style={styles.titleFont}>飼育ケージ温度グラフ</Text>
        <BezierLineChart yAxisSuffix="°C" data={[20, 22, 24, 27, 28, 28, 27, 25, 23, 25]} />
        <Text style={styles.titleFont}>飼育ケージ湿度グラフ</Text>
        <BezierLineChart yAxisSuffix="%" data={[52, 54, 51, 48, 47, 44, 43, 45, 48, 53]} />
        {/* 하단 버튼 */}
        {/* <Video
          source={{ uri: 'http://172.21.4.32:8080/stream' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          style={{ width: 300, height: 300 }}
        /> */}
      </View>
    </CageLayout>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleFont: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12
  },
  commonFont: {
    color: '#fff',
    fontSize: 16
  },
  inner: {
    padding: 16
  },
  cageImageContainer: {
    height: 300,
    position: 'relative',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderColor: '#B1D074',
    borderWidth: 4
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  cageContainer: {
    width: '49%',
    height: 100,
    borderColor: '#39823E',
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  controllerContainer: {
    width: '23.5%',
    height: 30,
    backgroundColor: '#39823E',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  setCageButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#39823E',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CageDetail
