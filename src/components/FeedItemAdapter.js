import React, { useState } from 'react'
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
import toReadableNumber from '../utils/toReadableNumber.js'
import * as EatingLabel from '../models/EatingLabel.js'

import LightButton from './LightButton.js'
import toReadableTime from '../utils/toReadableTime.js'
import { MeasureUnitString } from '../models/MeasureUnit.js'

const FeedItemAdapter = ({ eating }) => {
  const [expanded, setExpanded] = useState(false)

  const totalMass = eating.meals.reduce(
    (sum, meal) => sum + meal.amount * meal.density,
    0
  )

  const totalProteins = eating.meals.reduce(
    (sum, meal) => sum + meal.amount * meal.density * meal.proteinsPct / 100,
    0
  )
  const totalFats = eating.meals.reduce(
    (sum, meal) => sum + meal.amount * meal.density * meal.fatsPct / 100,
    0
  )
  const totalCarbohydrates = eating.meals.reduce(
    (sum, meal) => sum + meal.amount * meal.density * meal.carbohydratesPct / 100,
    0
  )

  return (
    <View style={styles.body}>
      <View style={styles.header}>
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
              title={!expanded ? 'Подробнее' : 'Скрыть'}
              color={!expanded ? accentColor : errorColor}
              onPress={() => setExpanded(!expanded)}
            />
          </View>
        </View>
        <View style={styles.caloriesContainer}>
          <Text style={styles.calories}>{toReadableNumber(eating.kcal)} ккал</Text>
        </View>
      </View>

      {expanded && (
        <View style={styles.about}>
          {eating.meals.map((meal, i) => (
            <Text key={meal.id}>
              {i + 1}. {meal.title}
              {' '}<Text style={styles.secondary}>— {toReadableNumber(meal.amount)} {MeasureUnitString[meal.measureUnit]}</Text>
            </Text>
          ))}

          <View style={styles.total}>
            <Text>Всего: <Text style={styles.secondary}>{toReadableNumber(totalMass)} г</Text></Text>
            <Text>Б: <Text style={styles.secondary}>{toReadableNumber(totalProteins)} г</Text></Text>
            <Text>Ж: <Text style={styles.secondary}>{toReadableNumber(totalFats)} г</Text></Text>
            <Text>У: <Text style={styles.secondary}>{toReadableNumber(totalCarbohydrates)} г</Text></Text>
          </View>

        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    borderColor: backgroundDepthColor,
    borderWidth: 2,
    marginBottom: 10,
    padding: 16,
    borderRadius: 8
  },
  header: {
    flexDirection: 'row'
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
  },
  about: {
    marginTop: 16,
    paddingTop: 8,
    borderColor: backgroundDepthColor,
    borderTopWidth: 2
  },
  total: {
    marginTop: 8,
    paddingTop: 8,
    borderColor: backgroundDepthColor,
    borderTopWidth: 2
  },
  secondary: {
    color: secondaryTextColor
  }
})

export default FeedItemAdapter
