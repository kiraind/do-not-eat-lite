import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { secondaryTextColor } from '../constants.js'
import { MealItem } from '../models/Meal.js'
import * as MeasureUnit from '../models/MeasureUnit.js'
import toReadableNumber from '../utils/toReadableNumber.js'

const MealPage = ({ meal, plate }) => {
  const inPlate = plate.find(item => (item instanceof MealItem) && item.id === meal.id)

  return (
    <View style={styles.body}>
      <Text style={styles.title}>{meal.title} <Text style={styles.secondary}>— блюдо</Text></Text>

      {inPlate && (<Text style={styles.info}>В тарелке: {inPlate.amount} {meal.measureUnitString}</Text>)}
      <Text style={styles.info}>У вас есть: {meal.readableLeftAmount}</Text>
      {meal.measureUnit !== MeasureUnit.GRAMS && (
        meal.measureUnit === MeasureUnit.PIECES
          ? <Text style={styles.info}>Масса одной штуки: {meal.density} г</Text>
          : <Text style={styles.info}>Плотность: {meal.density} г/{meal.measureUnitString}</Text>
      )}

      <Text style={styles.label}>Пищевая ценность на 100 г:</Text>
      <Text style={styles.info}>К: {toReadableNumber(meal.specificEnergy)} ккал</Text>
      <Text style={styles.info}>Б: {toReadableNumber(meal.proteinsPct)} г</Text>
      <Text style={styles.info}>Ж: {toReadableNumber(meal.fatsPct)} г</Text>
      <Text style={styles.info}>У: {toReadableNumber(meal.carbohydratesPct)} г</Text>

      <Text style={styles.label}>Состав:</Text>
      {meal.products.map(
        (product, i) => (
          <Text key={product.id}>
            {i + 1}. {product.title}
            {' '}<Text style={styles.secondary}>—&nbsp;{Math.round(product.part * 100)}% по массе</Text>
          </Text>
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  title: {
    fontSize: 18,
    marginBottom: 5
  },
  secondary: {
    color: secondaryTextColor
  },
  info: {
    color: secondaryTextColor
  },
  label: {
    marginTop: 5
  }
})

const mapStateToProps = state => ({
  plate: state.plate
})

export default connect(mapStateToProps)(MealPage)
