import React from 'react'
import { View, StyleSheet } from 'react-native'
import BackCommonHeader from '../../header/BackCommonHeader'

interface ResetPasswordLayoutProps {
  children: React.ReactNode
  title: string
}

const ResetPasswordLayout = ({ children, title }: ResetPasswordLayoutProps): JSX.Element => {
  return (
    <>
      <BackCommonHeader title={title} />
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
