import { useRoute } from '@react-navigation/native';
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const TotalPaymentSection = (): JSX.Element => {
  const route = useRoute();
  const { selectedProducts } = route.params;

  // 총 상품금액 계산
  const totalProductPrice = selectedProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity; // 각 상품의 가격 * 수량
  }, 0);

  // 배송비 계산 (예시: 50,000원 이상일 때 무료)
  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000; // 배송비 조건 설정

  // 최종 주문금액
  const totalAmount = totalProductPrice + shippingFee;

  return (
    <View style={styles.ordererContainer}>
      <Text style={[styles.titleFont, { marginBottom: 24 }]}>결제금액</Text>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.commonFont}>총 상품금액</Text>
          <Text style={styles.commonFont}>{totalProductPrice.toLocaleString()}원</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.commonFont}>배송비</Text>
          <Text style={styles.commonFont}>{shippingFee.toLocaleString()}원</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.commonFont}>주문금액</Text>
          <Text style={styles.commonFont}>{totalAmount.toLocaleString()}원</Text>
        </View>
      </View>
    </View>
  );
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
