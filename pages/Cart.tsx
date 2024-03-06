import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { CheckBox } from 'react-native-elements'
import CartContent from '../components/market/cart/CartContent'

const Cart = (): JSX.Element => {
  const [products, setProducts] = useState([
    { id: 1, seller: '렙틸킹', imageUri: 'https://i.postimg.cc/sx1jSsX7/image.jpg', productName: '이탈리아 베네치아의 장인이 만든 사육장', isChecked: false, price: 40000, charge: 3000, quantity: 1 },
    { id: 2, seller: '파충류 연구소', imageUri: 'https://contents.sixshop.com/thumbnails/uploadedFiles/32210/product/image_1628667429087_1000.jpg', productName: '장인의 손으로 만들어진 이탈리아 베네치아 사육장', isChecked: false, price: 20000, charge: 3000, quantity: 1 }
  ])
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
          title='전체선택'
          textStyle={styles.text}
        />
        <View style={styles.cartContainer}>
          {products.map(product => (
            <CartContent
              key={product.id}
              id={product.id}
              seller={product.seller}
              price={product.price}
              imageUri={product.imageUri}
              productName={product.productName}
              isChecked={product.isChecked}
              toggleChecked={() => { toggleChecked(product.id) }}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </View>
        <View style={styles.footer}>
          <View style={styles.row}>
            <Text style={styles.text}>상품금액</Text>
            <Text style={styles.text}>{totalPrice.toLocaleString()}원</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>배송비</Text>
            <Text style={styles.text}>{shippingFee.toLocaleString()}원</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>주문금액</Text>
            <Text style={styles.text}>{(totalPrice + shippingFee).toLocaleString()}원</Text>
          </View>
        </View>
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
