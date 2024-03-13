import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'

const OrderSection = (): JSX.Element => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [isOrdererOpen, setIsOrdererOpen] = useState(true)
  const toggleOrdererSection = (): void => {
    setIsOrdererOpen(!isOrdererOpen)
  }
  return (
    <View style={styles.ordererContainer}>
      <TouchableOpacity style={[styles.row, { marginBottom: isOrdererOpen ? 24 : 0 }]} onPress={toggleOrdererSection}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>주문자</Text>
        <MaterialIcons name="keyboard-arrow-right" size={30} color="#fff" />
      </TouchableOpacity>
      {isOrdererOpen && (
        <>
          <View style={styles.row}>
            <Text style={styles.commonFont}>이름</Text>
            <Input
              placeholder="이름"
              inputStyle={{ color: '#fff' }}
              placeholderTextColor="#fff"
              containerStyle={styles.commonInputContainer}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              value={name}
              onChangeText={text => { setName(text) }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.commonFont}>이메일</Text>
            <Input
              placeholder="이메일"
              inputStyle={{ color: '#fff' }}
              placeholderTextColor="#fff"
              containerStyle={[styles.commonInputContainer, { width: '58%' }]}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              value={email}
              onChangeText={text => { setEmail(text) }}
            />
            <Text style={styles.commonFont}>@</Text>
          </View>
          <View style={[styles.row, { justifyContent: 'flex-end' }]}>
            <View style={[styles.commonInputContainer, { justifyContent: 'center', padding: 8 }]}>
              <RNPickerSelect
                onValueChange={(value: string) => { setAddress(value) }}
                value={address}
                placeholder={{ label: '주소', value: null, color: '#fff' }}
                items={[
                  { label: 'gmail.com', value: 'gmail.com' },
                  { label: 'naver.com', value: 'naver.com' },
                  { label: 'daum.com', value: 'daum.com' }
                ]}
                style={{
                  inputIOS: { color: '#fff', fontSize: 16 },
                  inputAndroid: { color: '#fff', fontSize: 16 }
                }}
                Icon={() => { return <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff" /> }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.commonFont}>전화번호</Text>
            <Input
              placeholder="전화번호"
              inputStyle={{ color: '#fff' }}
              placeholderTextColor="#fff"
              containerStyle={styles.commonInputContainer}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              value={number}
              onChangeText={text => { setNumber(text) }}
            />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  commonFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  ordererContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#39823E',
    padding: 12,
    marginBottom: 24,
    borderColor: '#B1D074',
    borderWidth: 1,
    borderRadius: 16
  },
  commonInputContainer: {
    width: '75%',
    height: 40,
    borderColor: '#B1D074',
    borderWidth: 1
  }
})

export default OrderSection
