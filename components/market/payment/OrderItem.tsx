import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'react-native-elements'

const OrderItem = (): JSX.Element => {
  return (
    <View style={styles.itemContainer}>
      <View style={[styles.itemHeader, styles.row]}>
        <Text style={styles.commonFont}>판매업체명</Text>
        <Text style={styles.commonFont}>무료배송</Text>
      </View>
      <View style={[styles.row, { flex: 1, padding: 14 }]}>
        <View style={{ width: '30%', height: '100%' }}>
          <Image
            source={{ uri: 'https://i.postimg.cc/g0VxJ0Tq/image.jpg' }}
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
          />
        </View>
        <View style={{ width: '67%', height: '100%', justifyContent: 'space-between' }}>
          <Text style={styles.commonFont}>렙츠 버로우 중립 독일산 허스크칩 바크 한방 바닥재 6L</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={styles.titleFont}>23,000원</Text>
            <Text style={[styles.commonFont, { marginLeft: 4 }]}>1개</Text>
          </View>
        </View>
      </View>
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
  itemContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#072E0A',
    borderColor: '#B1D074',
    borderWidth: 1,
    marginBottom: 24
  },
  itemHeader: {
    width: '100%',
    height: '25%',
    backgroundColor: '#1C5B20',
    padding: 10
  }
})

export default OrderItem
