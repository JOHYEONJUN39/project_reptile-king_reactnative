import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import QuantitySelector from '../common/QuantitySelector'
import { useNavigation } from '@react-navigation/native'
import { useCart } from '../../context/CartContext'

interface ProductProps {
  price: number
  id: string | undefined
  img: string
  name: string
}

const ProductFooter = ({ price, id, img, name }: ProductProps): JSX.Element => {
  const navigation = useNavigation()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const handleAddToCart = () => {
    addToCart({ price, quantity, id, img, name }); // 장바구니에 추가
    navigation.navigate('Cart' as never); // 장바구니 화면으로 이동
  }
  return (
    <View style={styles.bottomBar}>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} style={{ width: 90, height: 40, backgroundColor: '#A32273' }}/>
      <View style={styles.price}>
        <Text style={styles.text}>{(quantity * (price ?? 0)).toLocaleString()}원</Text>
      </View>
      <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
        <Text style={styles.name}>장바구니</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyButton} onPress={() => { navigation.navigate('Payment' as never) }}>
        <Text style={styles.name}>즉시구매</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    backgroundColor: '#39823E'
  },
  price: {
    width: '25%',
    alignItems: 'center'
  },
  buyButton: {
    width: '22%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#A32273',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default ProductFooter
