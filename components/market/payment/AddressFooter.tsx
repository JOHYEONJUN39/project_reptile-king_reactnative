import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

interface AddressModalFooterProps {
  title: string
  onPress: () => void
}

const AddressModalFooter = ({ title, onPress }: AddressModalFooterProps): JSX.Element => {
  return (
      <View style={styles.modalFooter}>
        <Pressable
          style={styles.submitButton}
          onPress={() => { onPress() }}>
          <Text style={styles.titleFont}>{title}</Text>
        </Pressable>
      </View>
  )
}

const styles = StyleSheet.create({
  modalFooter: {
    width: '100%',
    height: 60,
    backgroundColor: '#39823E',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#B1D074',
    borderTopWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 8
  },
  titleFont: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  submitButton: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '100%',
    backgroundColor: '#A32273'
  }
})

export default AddressModalFooter
