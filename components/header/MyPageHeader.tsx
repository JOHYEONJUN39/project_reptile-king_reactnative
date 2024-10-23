import { View, StyleSheet, Text } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const MyPageHeader = (): JSX.Element => {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <View style={styles.center}>
          <Text style={styles.placeholder}>マイページ</Text>
        </View>
        <View style={styles.rightIcons}>
          <Ionicons
            name="notifications"
            size={32}
            color="white"
            style={{ marginRight: 10 }}
            onPress={() => { navigation.navigate('Notify' as never) }}
          />
          <MaterialIcons
            name="shopping-cart"
            size={32}
            color="white"
            onPress={() => { navigation.navigate('Cart' as never) }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#072E0A',
    height: 104,
    justifyContent: 'flex-end'
  },
  headerInner: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBox: {
    flex: 1,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingLeft: 8,
    marginLeft: 10
  },
  searchIcon: {
    marginRight: 6
  },
  center: {
    alignItems: 'center'
  },
  rightIcons: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row'
  },
  placeholder: {
    paddingBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default MyPageHeader
