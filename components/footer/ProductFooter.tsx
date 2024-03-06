import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import QuantitySelector from '../common/QuantitySelector'

interface ProductProps {
  price: number
}

const ProductFooter = ({ price }: ProductProps): JSX.Element => {
  const [quantity, setQuantity] = useState(1)
  return (
    <View style={styles.bottomBar}>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} style={{ width: 90, height: 40, backgroundColor: '#A32273' }}/>
      <View style={styles.price}>
        <Text style={styles.text}>{(quantity * (price ?? 0)).toLocaleString()}원</Text>
      </View>
      <TouchableOpacity style={styles.buyButton} onPress={() => { console.log('구매하기') }}>
        <Text style={styles.name}>구매하기</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#A32273',
    backgroundColor: '#39823E'
  },
  price: {
    width: '25%',
    alignItems: 'center'
  },
  buyButton: {
    width: '50%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#A32273',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default ProductFooter
