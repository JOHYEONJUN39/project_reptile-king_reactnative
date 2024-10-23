import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import type { AllOfProps } from '../../../types/common.interface'

const MyPageLayout = ({ children }: AllOfProps): JSX.Element => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.inner}>
          {children}
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072E0A'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 24
  }
})

export default MyPageLayout
