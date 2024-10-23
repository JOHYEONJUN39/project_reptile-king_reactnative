import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface OrderItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUri: string; // 이미지 URL
  };
}

const OrderItem = ({ product }: OrderItemProps): JSX.Element => {
  return (
    <View style={styles.itemContainer}>
      <View style={[styles.itemHeader, styles.row]}>
      </View>
      <View style={[styles.row, { flex: 1, padding: 14 }]}>
        <View style={{ width: '30%', height: '100%' }}>
          <Image
            source={{ uri: product.img }} // 전달받은 이미지 URL 사용
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
          />
        </View>
        <View style={{ width: '67%', height: '100%', justifyContent: 'space-between' }}>
          <Text style={styles.commonFont}>{product.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={styles.titleFont}>{product.price.toLocaleString()}원</Text>
            <Text style={[styles.commonFont, { marginLeft: 4 }]}>{product.quantity}개</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemHeader: {
    padding: 10,
    backgroundColor: 'green',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commonFont: {
    fontSize: 14,
    color: 'white',
  },
  titleFont: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OrderItem;
