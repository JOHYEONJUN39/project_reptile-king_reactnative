import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

interface ImageHeaderProps {
  title: string
  subtitle: string
}

const ImageHeader = ({ title, subtitle }: ImageHeaderProps): JSX.Element => {
  return (
    <>
      <Image source={{ uri: 'https://i.ibb.co/xFF7XrL/Vmake-1712214533-2.jpg' }} style={{ width: '100%', height: 150 }} />
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.textShadow]}>{title}</Text>
        <Text style={[styles.subtitle, styles.textShadow]}>{subtitle}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  textShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5
  }
})

export default ImageHeader
