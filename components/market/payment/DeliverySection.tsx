import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import AddressModal from './AddressModal'

const DeliverySection = (): JSX.Element => {
  return (
    <View style={styles.deliveryrContainer}>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <Text style={styles.titleFont}>받는 분</Text>
        <AddressModal />
      </View>
      <View style={{ height: 80, justifyContent: 'space-between' }}>
        <Text style={styles.titleFont}>우리집</Text>
        <Text style={styles.commonFont}>경북 칠곡군 지천면 금송로 60, 글로벌생활관</Text>
        <View style={[styles.row, { marginBottom: 0 }]}>
          <Text style={styles.commonFont}>이름</Text>
          <Text style={[styles.commonFont, { marginLeft: 8 }]}>010-5517-7581</Text>
        </View>
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
    alignItems: 'center',
    marginBottom: 24
  },
  deliveryrContainer: {
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

export default DeliverySection
