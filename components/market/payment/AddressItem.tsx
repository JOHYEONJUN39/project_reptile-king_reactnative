import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

const AddressItem = (): JSX.Element => {
  return (
    <View style={styles.addressContents}>
      <Text style={styles.titleFont}>우리집</Text>
      <Text style={styles.commonFont}>경북 칠곡군 지천면 금송로 60, 글로벌생활관</Text>
      <View style={styles.row}>
        <Text style={styles.commonFont}>이름</Text>
        <Text style={[styles.commonFont, { marginLeft: 8 }]}>010-5517-7581</Text>
      </View>
        <View style={styles.buttonContainer}>
          <View style={styles.leftButtons}>
            <Pressable
              style={[styles.button, styles.editButton, { marginRight: 8 }]}
              onPress={() => { console.log('삭제') }}>
              <Text style={styles.commonFont}>삭제</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.editButton]}
              onPress={() => { console.log('삭제') }}>
              <Text style={styles.commonFont}>수정</Text>
            </Pressable>
          </View>
          <Pressable
            style={[styles.button, styles.editButton, { backgroundColor: '#A32273', borderWidth: 0 }]}
            onPress={() => { console.log('삭제') }}>
            <Text style={styles.commonFont}>선택</Text>
          </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleFont: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  commonFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  button: {
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editButton: {
    width: 60,
    height: 40,
    backgroundColor: 'transparent',
    borderColor: '#B1D074',
    borderWidth: 2
  },
  addressContents: {
    width: '90%',
    height: 160,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#39823E',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  leftButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '50%'
  }
})

export default AddressItem
