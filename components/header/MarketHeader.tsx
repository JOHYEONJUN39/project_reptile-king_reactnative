import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const MarketHeader = (): JSX.Element => {
  const navigation = useNavigation()

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
      justifyContent: 'space-between'
    },
    leftIcon: {
      width: 40
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
    rightIcons: {
      width: 80,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    placeholder: {
      fontSize: 16,
      color: '#888'
    }
  })

  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <View style={styles.leftIcon}>
          <Feather name="menu" size={36} color="white" onPress={() => { navigation.navigate('Menu' as never) }}/>
        </View>
        <TouchableOpacity style={styles.searchBox} onPress={() => { navigation.navigate('Search' as never) }}>
          <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
          <Text style={styles.placeholder}>검색어를 입력해주세요.</Text>
        </TouchableOpacity>
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

export default MarketHeader
