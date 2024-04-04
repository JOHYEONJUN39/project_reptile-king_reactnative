import React from 'react'
import ResetPasswordLayout from '../components/layout/ResetPassword'
import { Text, StyleSheet } from 'react-native'
import EmailAuth from '../components/account/EmailAuth'

const EmailCredential = (): JSX.Element => {
  return (
    <ResetPasswordLayout>
      <Text style={[styles.commonFont, { marginBottom: 8 }]}>가입한 이메일 주소를 입력해주세요.</Text>
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
