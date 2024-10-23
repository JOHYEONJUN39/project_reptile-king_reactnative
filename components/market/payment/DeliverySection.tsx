import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import AddressModal from './AddressModal'
import { MaterialIcons } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'
import { Badge } from 'react-native-elements'

const DeliverySection = (): JSX.Element => {
  return (
    <View style={styles.deliveryContainer}>
      <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 24 }]}>
        <Text style={styles.titleFont}>받는 분</Text>
        <AddressModal />
      </View>
      <View style={{ justifyContent: 'space-between', height: '70%' }}>
        <View style={styles.row}>
          <Text style={styles.titleFont}>우리집</Text>
          <Badge value="기본 배송지" badgeStyle={{ backgroundColor: '#A32273', borderWidth: 0, marginLeft: 4 }} />
        </View>
        <Text style={styles.commonFont}>경북 칠곡군 지천면 금송로 60, 글로벌생활관</Text>
        <View style={styles.row}>
          <Text style={styles.commonFont}>유재경</Text>
          <Text style={[styles.commonFont, { marginLeft: 8 }]}>010-3606-5474</Text>
        </View>
        <RNPickerSelect
          onValueChange={(value: string) => { console.log(value) }}
          placeholder={{ label: '배송시 요청사항을 선택해주세요', value: '010', color: '#fff' }}
          items={[
            { label: '010', value: '010' },
            { label: '011', value: '011' },
            { label: '016', value: '016' },
            { label: '017', value: '017' },
            { label: '018', value: '018' },
            { label: '019', value: '019' }
          ]}
          style={{
            ...pickerSelectStyles
          }}
          Icon={() => { return <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff" /> }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commonFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  titleFont: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  deliveryContainer: {
    width: '100%',
    height: 220,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#fff',
    height: 40,
    padding: 6,
    borderColor: '#B1D074',
    borderWidth: 1
  },
  inputAndroid: { color: '#fff', fontSize: 16 },
  iconContainer: {
    top: 8,
    right: 8
  }
})

export default DeliverySection
