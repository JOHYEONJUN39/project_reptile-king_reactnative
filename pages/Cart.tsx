import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { CheckBox } from 'react-native-elements'
import CartContent from '../components/market/cart/CartContent'
import { Button } from '@rneui/themed'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useCart } from '../context/CartContext'

const Cart = (): JSX.Element => {
  const navigation = useNavigation()
  const { cart, setCart } = useCart()
  const [products, setProducts] = useState(cart)
  console.log('장바구니 데이터', products)
  const toggleChecked = (id: number): void => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(product =>
        product.id === id
          ? { ...product, isChecked: !product.isChecked }
          : product
      )
      const isAllChecked = updatedProducts.every(product => product.isChecked)
      setChecked(isAllChecked)
      return updatedProducts
    })
  }
  const [checked, setChecked] = useState(false)
  const handleQuantityChange = (id: number, quantity: number): void => {
    setProducts(products.map(product =>
      product.id === id
        ? { ...product, quantity }
        : product
    ))
  }
  const handleRemove = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    setCart(updatedProducts); // 전역 상태에서 제거
  }
  const handlePayment = () => {
    const selectedProducts = products.filter(product => product.isChecked);
    navigation.navigate('Payment', { selectedProducts }); // 결제 화면으로 이동하며 선택한 상품 전달
  }
  const totalPrice = products.reduce((acc, product) => product.isChecked ? acc + product.price * product.quantity : acc, 0)
  const shippingFee = totalPrice === 0 ? 0 : (totalPrice >= 50000 ? 0 : 3000)
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 12 }}>
        <CheckBox
          containerStyle={styles.checkBoxContainer}
          iconType='material-community'
          checkedIcon='checkbox-marked'
          uncheckedIcon='checkbox-blank-outline'
          checkedColor='#B1D074'
          uncheckedColor='#fff'
          checked={checked}
          onPress={() => {
            setChecked(!checked)
            setProducts(products.map(product => ({ ...product, isChecked: !checked })))
          }}
          title='すべて選択'
          textStyle={styles.text}
        />
        <View style={styles.cartContainer}>
          {products.map(product => (
            <CartContent
              key={product.id}
              id={product.id}
              // seller={product.seller}
              price={product.price}
              imageUri={product.img}
              productName={product.name}
              isChecked={product.isChecked}
              toggleChecked={() => { toggleChecked(product.id) }}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </View>
        <View style={styles.footer}>
          <View style={styles.row}>
            <Text style={styles.text}>商品値段</Text>
            <Text style={styles.text}>{totalPrice.toLocaleString()}원</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>配送費用</Text>
            <Text style={styles.text}>{shippingFee.toLocaleString()}원</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>注文金額</Text>
            <Text style={styles.text}>{(totalPrice + shippingFee).toLocaleString()}원</Text>
          </View>
        </View>
        <Button radius={'md'} type="solid" style={{ marginTop: 16 }} color={'#39823E'} onPress={handlePayment}>
          <MaterialIcons name="payment" size={24} color="white" style={{ marginLeft: 8 }} />
          お支払い
        </Button>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072E0A'
  },
  checkBoxContainer: {
    width: '30%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginVertical: 10,
    marginLeft: 0,
    color: '#fff'
  },
  text: {
    color: '#fff',
    fontSize: 16
  },
  cartContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#39823E',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#B1D074',
    borderWidth: 1
  },
  productContainer: {
    flexDirection: 'row',
    marginVertical: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  footer: {
    width: '100%',
    height: 'auto',
    padding: 10,
    backgroundColor: '#39823E',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#B1D074',
    borderWidth: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  }
})

export default Cart
