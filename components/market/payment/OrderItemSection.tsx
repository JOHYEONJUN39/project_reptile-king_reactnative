import React, { useState } from 'react'
import { View, Pressable, Text, LayoutAnimation, StyleSheet } from 'react-native'
import RotateArrow from '../../animation/RotateArrow'
import OrderItem from './OrderItem'
import { useRoute } from '@react-navigation/native'

const OrderItemSection = (): JSX.Element => {
  const [isOrdererOpen, setIsOrdererOpen] = useState(false);
  const route = useRoute();
  const { selectedProducts } = route.params;

  const toggleOrdererSection = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOrdererOpen(prev => !prev);
  };

  return (
    <View style={styles.ordererItemContainer}>
      <Pressable style={[styles.row, { marginBottom: isOrdererOpen ? 24 : 0 }]} onPress={toggleOrdererSection}>
        <View style={styles.row}>
          <Text style={styles.titleFont}>注文商品</Text>
          <Text style={[styles.titleFont, { marginLeft: 4, fontSize: 16 }]}>
            {selectedProducts.length}件
          </Text>
        </View>
        <RotateArrow state={isOrdererOpen} />
      </Pressable>
      {isOrdererOpen && (
        <View>
          {selectedProducts.map(product => (
            <OrderItem key={product.id} product={product} />
          ))}
        </View>
      )}
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
