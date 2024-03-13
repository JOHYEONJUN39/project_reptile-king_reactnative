import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import OrderSection from '../components/market/payment/OrderSection'
import DeliverySection from '../components/market/payment/DeliverySection'

const Payment = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <OrderSection />
        <DeliverySection />
      </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: '#072E0A',
    justifyContent: 'space-between'
  },
  inner: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    alignItems: 'center'
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

export default Payment
