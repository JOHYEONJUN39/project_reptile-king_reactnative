import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

interface RotateArrowProps {
  state: boolean
  durational?: number
  scope?: string[]
}

const RotateArrow = ({
  state,
  durational = 300,
  scope = ['0deg', '180deg']
}: RotateArrowProps): JSX.Element => {
  const rotateAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: state ? 1 : 0,
      duration: durational,
      useNativeDriver: true
    }).start()
  }, [state])
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: scope
  })
  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <MaterialIcons name="keyboard-arrow-down" size={30} color="#fff" />
    </Animated.View>
  )
}

export default RotateArrow
