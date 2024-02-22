import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface BackHeaderProps {
  title: string
};

const BackCommonHeader = ({ title }: BackHeaderProps): JSX.Element => {
  const navigation = useNavigation()
  const goBack = (): void => {
    navigation.goBack()
  }
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <View style={styles.iconContainer}>
          <MaterialIcons name='arrow-back-ios-new' size={24} color='white' onPress={goBack} />
          <Text style={styles.back}>Back</Text>
        </View>
        <Text style={styles.headerTitle}>{title}</Text>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    position: 'absolute',
    left: 4,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  back: {
    fontSize: 18,
    color: '#ffffff'
  },
  headerTitle: {
    paddingBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default BackCommonHeader
