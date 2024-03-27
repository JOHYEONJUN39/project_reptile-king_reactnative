import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const TotalPaymentSection = (): JSX.Element => {
  return (
    <View style={styles.ordererContainer}>
      <Text style={[styles.titleFont, { marginBottom: 24 }]}>결제금액</Text>
      <View style={styles.footer}>
          <View style={styles.row}>
            <Text style={styles.commonFont}>총 상품금액</Text>
            <Text style={styles.commonFont}>23,000원</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.commonFont}>배송비</Text>
            <Text style={styles.commonFont}>0원</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.commonFont}>주문금액</Text>
            <Text style={styles.commonFont}>23,000원</Text>
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
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  footer: {
    width: '100%',
    height: 70,
    justifyContent: 'space-between'
  }
})

export default TotalPaymentSection
