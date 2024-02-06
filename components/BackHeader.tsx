import { View, Text, StyleSheet } from "react-native";

type BackHeaderProps = {
  title: string;
};

const BackHeader = ({title} : BackHeaderProps): JSX.Element => {
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#072E0A',
    height: 104,
    justifyContent: 'flex-end',
  },
  headerInner: {
    alignItems: 'center',
  },
  headerTitle: {
    paddingBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  }
})

export default BackHeader

