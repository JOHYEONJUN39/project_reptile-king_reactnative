import React, { useState } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import AddressItem from './AddressItem'
import AddressModalHeader from './AddressModalHeader'
import AddressModalFooter from './AddressModalFooter'

const AddressModal = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddressModalHeader
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
            <ScrollView contentContainerStyle={{ width: '100%', paddingVertical: 24 }} showsVerticalScrollIndicator={false}>
              {/*  TODO: 사용자 정보에서 배송지를 가져와서 뿌려줘야 함 */}
              <AddressItem />
              <AddressItem />
            </ScrollView>
            <AddressModalFooter
              title="배송지 추가"
              onPress={() => { setModalVisible(false) }}
            />
          </View>
        </View>

      </Modal>
      <Pressable
        onPress={() => { setModalVisible(true) }}>
        <Text style={styles.titleFont}>변경</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    width: '95%',
    height: '60%',
    backgroundColor: '#1C5B20',
    borderColor: '#B1D074',
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalFooter: {
    width: '100%',
    height: 60,
    backgroundColor: '#39823E',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#B1D074',
    borderTopWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
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
  }
})

export default AddressModal
