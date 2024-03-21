import { Fontisto, MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Button, CheckBox, Input } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import areaCodes from '../../../assets/areaCodes.json'

const NewAddressBody = (): JSX.Element => {
  const [checked, setChecked] = useState(false)
  return (
    <ScrollView contentContainerStyle={{ width: '100%', paddingVertical: 24 }} showsVerticalScrollIndicator={false}>
      <View style={styles.row}>
        <Text style={styles.commonFont}>배송지명</Text>
        <Input
          inputStyle={{ color: '#fff' }}
          placeholderTextColor="#fff"
          containerStyle={styles.commonInputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.commonFont}>받는 사람</Text>
        <Input
          inputStyle={{ color: '#fff' }}
          placeholderTextColor="#fff"
          containerStyle={styles.commonInputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
      </View>
      {/* 전화번호 컴포넌트 고려중 (만드는데 힘듬) */}
      <View style={styles.row}>
        <Text style={styles.commonFont}>전화번호</Text>
        <View style={styles.inputAndPickerContainer}>
          <RNPickerSelect
            onValueChange={(value: string) => { console.log(value) }}
            placeholder={{ label: '010', value: '010', color: '#fff' }}
            items={areaCodes}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 8,
                right: 2
              }
            }}
            Icon={() => { return <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff" /> }}
          />
          <Input
            inputStyle={{ color: '#fff' }}
            placeholderTextColor="#fff"
            containerStyle={[styles.commonInputContainer, { width: '65%' }]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.commonFont}>주소</Text>
        <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            title="주소 찾기"
            buttonStyle={styles.findAddressButton}
            titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
          />
          <Input
            inputStyle={{ color: '#fff' }}
            placeholderTextColor="#fff"
            containerStyle={[styles.commonInputContainer, { width: '65%', backgroundColor: '#39823E' }]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            disabled={true}
          />
        </View>
      </View>
      <View style={[styles.row, { justifyContent: 'flex-end' }]}>
        <Input
          inputStyle={{ color: '#fff' }}
          placeholderTextColor="#fff"
          containerStyle={[styles.commonInputContainer, { width: '75%', backgroundColor: '#39823E' }]}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          disabled={true}
        />
      </View>
      <View style={[styles.row, { justifyContent: 'flex-end' }]}>
        <Input
          placeholder='상세주소 입력'
          inputStyle={{ color: '#fff' }}
          placeholderTextColor="#fff"
          containerStyle={[styles.commonInputContainer, { width: '75%' }]}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
      </View>
      <View style={[styles.row, { justifyContent: 'flex-end', height: 40 }]}>
        <CheckBox
          iconType="material-community"
          checkedIcon={<Fontisto name="checkbox-active" size={20} color="#fff" />}
          uncheckedIcon={<Fontisto name="checkbox-passive" size={20} color="#fff" />}
          containerStyle={styles.checkBoxContainer}
          textStyle={{ color: '#fff' }}
          title="기본 배송지로 저장"
          checked={checked}
          onPress={() => { setChecked(!checked) }}
        />
      </View>
    </ScrollView>
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
  commonInputContainer: {
    width: '75%',
    height: 40,
    borderColor: '#B1D074',
    borderWidth: 1
  },
  inputAndPickerContainer: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  findAddressButton: {
    backgroundColor: '#A32273',
    width: 75,
    height: 40,
    borderColor: '#B1D074',
    borderWidth: 1,
    padding: 4
  },
  checkBoxContainer: {
    width: '75%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginRight: 0,
    padding: 0
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#fff',
    minWidth: 75,
    height: 40,
    padding: 6,
    paddingRight: 30,
    borderColor: '#B1D074',
    borderWidth: 1
  },
  inputAndroid: {
    color: '#fff',
    height: 40,
    paddingRight: 34,
    borderColor: '#B1D074',
    borderWidth: 1
  }
})

export default NewAddressBody
