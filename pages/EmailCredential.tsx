import React from 'react'
import ResetPasswordLayout from '../components/layout/ResetPassword'
import { Text, StyleSheet } from 'react-native'
import EmailAuth from '../components/account/EmailAuth'

const EmailCredential = (): JSX.Element => {
  return (
    <ResetPasswordLayout title='パスワード再設定'>
      <Text style={[styles.commonFont, { marginBottom: 8 }]}>登録したメールアドレスを入力してください</Text>
      <EmailAuth/>
    </ResetPasswordLayout>
  )
}

const styles = StyleSheet.create({
  commonFont: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  }
})

export default EmailCredential
