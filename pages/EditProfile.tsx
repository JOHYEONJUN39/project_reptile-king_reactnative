import React from 'react'
import { View, StyleSheet, Image, Text, Pressable } from 'react-native'
import Grass from '../components/common/Grass'
import { LinearGradient } from 'expo-linear-gradient'
import Line from '../components/common/Line'
import { useNavigation } from '@react-navigation/native'

const EditProfile = (): JSX.Element => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: 'https://qi-o.qoo10cdn.com/goods_image_big/5/1/8/3/9419215183_l.jpg' }}
            style={styles.image}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
            style={styles.overlayButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>사진 변경</Text>
            </View>
          </LinearGradient>
        </View>
        <Grass/>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menuList} onPress={() => { }}>
          <Text style={styles.boldFont}>닉네임</Text>
          <Text style={styles.commonFont}>조금긴닉네임</Text>
        </Pressable>
        <Line color='#B1D074' weight={1}/>
        <Pressable style={styles.menuList} onPress={() => { }}>
          <Text style={styles.boldFont}>1:1 문의</Text>
        </Pressable>
        <Line color='#B1D074' weight={1}/>
        <Pressable style={styles.menuList} onPress={() => { navigation.navigate('EmailCredential' as never) }}>
          <Text style={styles.boldFont}>비밀번호 변경</Text>
        </Pressable>
        <Line color='#B1D074' weight={1}/>
        <Pressable style={styles.menuList} onPress={() => { }}>
          <Text style={[styles.boldFont, { color: '#FFBFE7' }]}>회원탈퇴</Text>
        </Pressable>
        <Line color='#B1D074' weight={1}/>
      </View>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  menuList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14
  },
  commonFont: {
    color: '#fff',
    fontSize: 16
  },
  boldFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#072E0A'
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  overlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#1C5B20'
  }
})
