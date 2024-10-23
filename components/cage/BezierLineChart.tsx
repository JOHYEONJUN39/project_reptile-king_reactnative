import React from 'react'
import { View, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

interface BezierLineChartProps {
  yAxisSuffix: string
  data: number[]
}

const BezierLineChart = ({ yAxisSuffix, data }: BezierLineChartProps): JSX.Element => {
  // 현재 시간 가져오기
  const now = new Date()
  // 현재 시간에서 시간만 가져오기
  const currentHour = now.getHours()
  // 지난 10시간으로 라벨 생성
  const xAxisLabels = Array.from({ length: 10 }, (_, i) => {
    // 시간 계산 (24시간제를 기준으로 하여 0~23 사이의 값 유지)
    const hour = (currentHour - 9 + i + 24) % 24
    return `${hour}시`
  })
  return (
    <View>
      <LineChart
        data={{
          labels: xAxisLabels,
          datasets: [{ data }]
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix={yAxisSuffix}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#39823E',
          backgroundGradientFrom: '#39823E',
          backgroundGradientTo: '#39823E',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 8
          },
          propsForDots: {
            r: '6',
            strokeWidth: '0'
          }
        }}
        bezier
        style={{
          borderRadius: 8
        }}
      />
    </View>
  )
}

export default BezierLineChart
