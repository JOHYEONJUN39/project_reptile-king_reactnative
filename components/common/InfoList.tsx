import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Line from './Line'

interface InfoListProps {
  dataTitles: string[]
  dataValues: string[]
}

const InfoList = ({ dataTitles, dataValues }: InfoListProps): JSX.Element => {
  return (
    <>
      {dataTitles.map((title, index) => (
        <React.Fragment key={index}>
          <View style={styles.row}>
            <Text style={[styles.commonFont, { fontWeight: 'bold' }]}>{title}</Text>
            <Text style={styles.commonFont}>{dataValues[index]}</Text>
          </View>
          <Line color='#39823E' weight={2} mV={12} />
        </React.Fragment>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  commonFont: {
    color: '#fff',
    fontSize: 16
  }
})

export default InfoList
