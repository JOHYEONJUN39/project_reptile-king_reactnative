import { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { CheckBox } from 'react-native-elements'
import QuantitySelector from '../../common/QuantitySelector'
import { MaterialIcons } from '@expo/vector-icons'

interface CartContentProps {
  id: number
  seller: string
  price: number
  imageUri: string
  productName: string
  isChecked: boolean
  toggleChecked: () => void
  onQuantityChange: (id: number, quantity: number) => void
  onRemove: (id: string) => void
}

const CartContent = ({ id, price, imageUri, productName, isChecked, toggleChecked, onQuantityChange, onRemove  }: CartContentProps): JSX.Element => {
  const [quantity, setQuantity] = useState<number>(1)
  const handleQuantityChange = (newQuantity: number): void => {
    setQuantity(newQuantity)
    onQuantityChange(id, newQuantity)
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CheckBox
          containerStyle={styles.checkBoxContainer}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor="#B1D074"
          uncheckedColor="#fff"
          checked={isChecked}
          onPress={toggleChecked}
          textStyle={styles.text}
        />
        <TouchableOpacity onPress={() => onRemove(id)} style={{ marginLeft: 10 }}>
          <MaterialIcons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.productContainer}>
        <Image
          style={styles.image}
          source={{ uri: imageUri }}
        />
        <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'space-between' }}>
          <Text style={[styles.text, { fontWeight: 'bold' }]} numberOfLines={2}>
            {productName}
          </Text>
          <Text style={styles.text}>{(price * quantity).toLocaleString()}원</Text>
        </View>
        <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
          <QuantitySelector quantity={quantity} setQuantity={handleQuantityChange} style={{ width: 90, height: 40, backgroundColor: '#A32273' }} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  checkBoxContainer: {
    width: 'auto',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginVertical: 0,
    marginLeft: 0,
    color: '#fff'
  },
  text: {
    color: '#fff',
    fontSize: 16
  },
  productContainer: {
    flexDirection: 'row',
    marginVertical: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10
  }
})

export default CartContent
