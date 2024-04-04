import React from 'react'
import type { AllOfProps } from '../../../types/common.interface'
import { View, StyleSheet } from 'react-native'
import BackCommonHeader from '../../header/BackCommonHeader'

const ResetPasswordLayout = ({ children }: AllOfProps): JSX.Element => {
  return (
    <>
      <BackCommonHeader title='비밀번호 재설정' />
      <View style={styles.container}>
        <View style={styles.inner}>
          {children}
        </View>
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
    paddingHorizontal: 27
  }
})

export default ResetPasswordLayout
