import React, { useEffect, useRef } from 'react'
import { Animated, useWindowDimensions } from 'react-native'

interface TabInfo {
  name: string
  position: number
}

interface MovingLineProps {
  activeTab: string
  tabData: TabInfo[]
}

const MovingLine = (activeProps: MovingLineProps): JSX.Element => {
  const { activeTab, tabData } = activeProps
  const screenWidth = useWindowDimensions().width
  const linePosition = useRef(new Animated.Value(0)).current

  const moveLine = (value: number): void => {
    Animated.timing(linePosition, {
      toValue: (screenWidth * value) / 125,
      duration: 200,
      useNativeDriver: true
    }).start()
  }
  useEffect(() => {
    tabData.forEach((tab) => {
      if (activeTab === tab.name) {
        moveLine(tab.position)
      }
    })
  }, [activeTab])
  return (
    <Animated.View
      style={{
        width: screenWidth * 0.3,
        height: 2,
        backgroundColor: '#A32273',
        transform: [{ translateX: linePosition }]
      }}
    />
  )
}

export default MovingLine
