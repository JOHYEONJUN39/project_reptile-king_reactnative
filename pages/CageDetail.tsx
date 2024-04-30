import React from 'react'
import { Text } from 'react-native'
import CageLayout from '../components/layout/cage'

const CageDetail = (): JSX.Element => {
  return (
    <CageLayout title='사육장 관리' subtitle='주인님 추워요!'>
      <Text>사육장 상세 페이지</Text>
    </CageLayout>
  )
}

export default CageDetail
