import { useState, useEffect } from 'react'
import { Text, StyleSheet } from 'react-native'

interface Props {
  dateString: string | undefined
  style?: object
}

const FormattedDate = ({ dateString, style }: Props): JSX.Element => {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    if (dateString === undefined) {
      setFormattedDate('날짜 정보 없음')
      return
    }
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    // N일전 표시하고 싶으면 아래 주석 해제하고 조건문 추가
    // const days = Math.floor(hours / 24)

    if (seconds < 60) {
      setFormattedDate('방금 전')
    } else if (minutes < 60) {
      setFormattedDate(`${minutes}분 전`)
    } else if (hours < 24) {
      setFormattedDate(`${hours}시간 전`)
    } else {
      const formatted = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
      setFormattedDate(formatted)
    }
  }, [dateString])

  return <Text style={[styles.commonFont, style]}>{formattedDate}</Text>
}

const styles = StyleSheet.create({
  commonFont: {
    color: '#fff',
    fontSize: 16
  }
})

export default FormattedDate
