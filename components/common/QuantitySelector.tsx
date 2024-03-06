import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

interface QuantitySelectorProps {
  quantity: number
  setQuantity: (value: number) => void
  style?: object | object[]
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity, style }) => {
  return (
    <View style={StyleSheet.compose(styles.quantitySelector, style)}>
      <TouchableOpacity onPress={() => { setQuantity(Math.max(1, quantity - 1)) }}>
        <MaterialIcons name='remove' size={24} color='#fff'/>
      </TouchableOpacity>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{quantity}</Text>
      <TouchableOpacity onPress={() => { setQuantity(quantity + 1) }}>
        <MaterialIcons name='add' size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  quantitySelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5
  }
})

export default QuantitySelector
