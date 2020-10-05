import React from 'react'
import {
  View,
  StyleSheet, Dimensions
} from 'react-native'
import Svg, { Path } from 'react-native-svg'

const HungerGraph = ({
  target,
  eatings,
  percentEaten
}) => {
  const { width } = Dimensions.get('window')
  const k = 2400 / width
  const svgHeight = k * 250
  const pc = svgHeight / 100

  const points = [
    {
      x: 2400 * 0.8,
      y: (100 - 50) * pc,
      drop: 30 * pc
    },
    {
      x: 2400 * 0.4,
      y: (100 - 80) * pc,
      drop: 60 * pc
    },
    {
      x: 2400 * 0.1,
      y: (100 - 60) * pc,
      drop: 40 * pc
    }
  ]

  const rad = 100

  return (
    <View style={styles.body}>
      <Svg height='100%' width='100%' viewBox={`0 0 2400 ${svgHeight}`}>
        <Path
          fill='#17de17'
          d={`
              M0 ${svgHeight}
              H2400
              v${-30 * pc} 
              
              ${points.map(({ x, y, drop }) => `
                L${x + rad} ${y + rad * 0.5}
                C ${x} ${y}, ${x} ${y}, ${x} ${y + drop}
              `)}
              
              L0 ${70 * pc}
              Z
            `}
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    height: 250,
    backgroundColor: '#eaeaea'
  }
})

export default HungerGraph
