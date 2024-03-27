import { Image, StyleSheet } from 'react-native'

const Grass = (): JSX.Element => {
  return (
    <Image source={{ uri: 'https://i.postimg.cc/85pPphgy/grass.png' }} style={styles.grass} />
  )
}

const styles = StyleSheet.create({
  grass: {
    width: '100%',
    height: 200,
    position: 'absolute',
    bottom: 0,
    zIndex: -1
  }
})

export default Grass
