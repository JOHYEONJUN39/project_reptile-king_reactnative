import React, { useState } from 'react'
import { View, Image, useWindowDimensions } from 'react-native'
import type { ImageLoadEventData, NativeSyntheticEvent } from 'react-native'

interface ImageDimension {
  width: number
  height: number
}

interface ImageScrollProps {
  contentImages: string[]
}

const ImageScroll = ({ contentImages }: ImageScrollProps): JSX.Element => {
  const screenWidth = useWindowDimensions().width
  const [imageHeights, setImageHeights] = useState<number[]>([])
  const onImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>, index: number): void => {
    const { width, height } = (event.nativeEvent.source as unknown) as ImageDimension
    const imageHeight = height * (screenWidth / width)
    setImageHeights(prev => {
      const newHeights = [...prev]
      newHeights[index] = imageHeight
      return newHeights
    })
  }
  return (
    <View style={{ width: '100%', paddingVertical: 10 }}>
      {contentImages?.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={{ width: screenWidth, height: imageHeights[index] ?? screenWidth }}
          onLoad={(event) => { onImageLoad(event, index) }}
        />
      ))}
    </View>
  )
}

export default ImageScroll
