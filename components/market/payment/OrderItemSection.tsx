import React, { useState } from 'react'
import { View, Pressable, Text, LayoutAnimation, StyleSheet } from 'react-native'
import RotateArrow from '../../animation/RotateArrow'
import OrderItem from './OrderItem'

const OrderItemSection = (): JSX.Element => {
  const [isOrdererOpen, setIsOrdererOpen] = useState(true)
  const toggleOrdererSection = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsOrdererOpen(!isOrdererOpen)
  }
  return (
    <View style={styles.ordererItemContainer}>
      <Pressable style={[styles.row, { marginBottom: isOrdererOpen ? 24 : 0 }]} onPress={toggleOrdererSection}>
        <View style={styles.row}>
          <Text style={styles.titleFont}>주문상품</Text>
          <Text style={[styles.titleFont, { marginLeft: 4, fontSize: 16 }]}>1건</Text>
        </View>
        <RotateArrow state={isOrdererOpen} />
      </Pressable>
      {isOrdererOpen && (
        <>
          <OrderItem />
        </>
      )}
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
  ordererItemContainer: {
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

export default OrderItemSection
