import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

import {
  accentColor,
  backgroundDepthColor,
  errorColor,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'
import toReadableNumber from '../utils/toReadableNumber.js'
import LightButton from './LightButton.js'

const PlateItemAdapter = ({ item }) => {
  const [titleWidthDelta, setTitleWidthDelta] = useState(105)

  const adjustTitleWidth = e => {
    setTitleWidthDelta(e.nativeEvent.layout.width)
  }

  return (
    <View style={styles.body}>
      <View style={styles.leftSide}>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              ...styles.title,
              maxWidth: Dimensions.get('window').width - 16 * 4 - 2 * 2 - 80 - titleWidthDelta
            }}
          >
            {item.title}
          </Text>
          <Text style={styles.amount} onLayout={adjustTitleWidth}> — {item.readableAmount}</Text>
        </View>
        <View style={styles.ui}>
          <LightButton
            title='Доложить'
            color={accentColor}
          />
          <LightButton
            title='Убрать'
            color={errorColor}
          />
          <LightButton
            title='Подробнее'
            color={secondaryTextColor}
          />
        </View>
      </View>
      <View style={styles.caloriesContainer}>
        <Text style={styles.calories}>{toReadableNumber(item.toCalories(item.amount))} ккал</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    borderColor: backgroundDepthColor,
    flexDirection: 'row',
    borderWidth: 2,
    marginBottom: 10,
    padding: 16,
    borderRadius: 8
  },
  leftSide: {
    alignItems: 'flex-start'
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 5
  },
  title: {
    fontSize: 16
  },
  amount: {
    fontSize: 16,
    color: secondaryTextColor
  },
  caloriesContainer: {
    marginLeft: 'auto'
  },
  calories: {
    fontSize: 14,
    paddingTop: 2,
    color: primaryTextColor
  },
  ui: {
    flexDirection: 'row'
  }
})

export default PlateItemAdapter
