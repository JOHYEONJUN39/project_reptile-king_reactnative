import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import AddressHeader from './AddressHeader'
import NewAddressBody from './NewAddressBody'
import AddressFooter from './AddressFooter'

interface NewAddressModalProps {
  visible: boolean
  onClose: () => void
}

const NewAddressModal = ({ visible, onClose }: NewAddressModalProps): JSX.Element => {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          onClose()
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddressHeader
              title='배송지 추가'
              modalVisible={visible}
              setModalVisible={onClose}
            />
            <NewAddressBody />
            <AddressFooter
              title="저장"
              onPress={onClose}
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '95%',
    height: '80%',
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
  }
})

export default NewAddressModal
