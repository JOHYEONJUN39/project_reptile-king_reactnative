import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const PaymentMethodsSection = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={[styles.titleFont, { marginBottom: 24 }]}>결제금액</Text>
      <View style={[styles.cardContainer, styles.row]}>
        <Text style={styles.commonFont}>카드(결제수단)</Text>
        <TouchableOpacity>
          <Text style={styles.commonFont}>+새 카드 추가</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.paymentMethodsContainer}>
        <TouchableOpacity style={styles.paymentMethod}>
          <Text style={styles.commonFont}>카카오</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentMethod}>
          <Text style={styles.commonFont}>토스</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentMethod}>
          <Text style={styles.commonFont}>네이버</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentMethod}>
          <Text style={styles.commonFont}>기타</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#39823E',
    padding: 12,
    marginBottom: 24,
    borderColor: '#B1D074',
    borderWidth: 1,
    borderRadius: 16
  },
  cardContainer: {
    backgroundColor: '#39823E',
    padding: 12,
    borderColor: '#B1D074',
    borderWidth: 1,
    marginBottom: 24
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  paymentMethod: {
    width: '49%',
    backgroundColor: '#39823E',
    padding: 18,
    borderColor: '#B1D074',
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center'
  },
  titleFont: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  commonFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default PaymentMethodsSection
