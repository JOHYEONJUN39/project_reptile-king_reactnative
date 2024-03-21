import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

interface AddressModalHeaderProps {
  title: string
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
}

const AddressModalHeader = ({ title, modalVisible, setModalVisible }: AddressModalHeaderProps): JSX.Element => {
  return (
    <View style={styles.modalHeader}>
        <View style={{ flex: 1 }}></View>
        <Text style={styles.titleFont}>{title}</Text>
        <Pressable
          style={{ flex: 1, alignItems: 'flex-end' }}
          onPress={() => { setModalVisible(!modalVisible) }}>
          <MaterialIcons name="close" size={30} color="white" />
        </Pressable>
      </View>
  )
}

const styles = StyleSheet.create({
  modalHeader: {
    width: '100%',
    height: 60,
    backgroundColor: '#39823E',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#B1D074',
    borderBottomWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12
  },
  titleFont: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
})

export default AddressModalHeader
