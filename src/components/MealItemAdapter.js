import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import {
  accentColor,
  backgroundDepthColor,
  errorColor,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'

import LightButton from './LightButton.js'

const MealItemAdapter = ({ meal }) => {
  return (
    <View style={styles.body}>
      <View style={styles.leftSide}>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.title}
          >
            {meal.title}
          </Text>
        </View>
        <View style={styles.ui}>
          <LightButton
            title='В тарелку'
            color={accentColor}
          />
          {/* <LightButton
            title='Выбросить'
            color={errorColor}
          /> */}
          <LightButton
            title='Подробнее'
            color={secondaryTextColor}
          />
        </View>
      </View>
      <View style={styles.caloriesContainer}>
        <Text style={styles.calories}>{meal.readableLeftAmount}</Text>
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

export default MealItemAdapter
