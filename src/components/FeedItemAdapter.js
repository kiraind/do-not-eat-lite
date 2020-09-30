import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import {
  accentColor,
  backgroundDepthColor,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'
import toReadableNumber from '../utils/toReadableNumber.js'
import * as EatingLabel from '../models/EatingLabel.js'

import LightButton from './LightButton.js'
import toReadableTime from '../utils/toReadableTime.js'

const FeedItemAdapter = ({ eating }) => {
  return (
    <View style={styles.body}>
      <View style={styles.leftSide}>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.title}
          >
            {EatingLabel.String[eating.label]}
          </Text>
          <Text style={styles.date}> в {toReadableTime(eating.date)}</Text>
        </View>
        <View style={styles.ui}>
          <LightButton
            title='Подробнее'
            color={accentColor}
          />
        </View>
      </View>
      <View style={styles.caloriesContainer}>
        <Text style={styles.calories}>{toReadableNumber(eating.kcal)} ккал</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
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
  date: {
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

export default FeedItemAdapter
