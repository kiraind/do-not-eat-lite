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

import { ProductItem } from '../models/Product.js'
import LightButton from './LightButton.js'

const RecipeItemAdapter = ({
  product,
  amount,

  onAdd,
  onRemove
}) => {
  const [titleWidthDelta, setTitleWidthDelta] = useState(105)

  const adjustTitleWidth = e => {
    setTitleWidthDelta(e.nativeEvent.layout.width)
  }

  const productItem = new ProductItem(product, amount)

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
            {productItem.title}
          </Text>
          <Text style={styles.amount} onLayout={adjustTitleWidth}> — {productItem.readableAmount}</Text>
        </View>
        <View style={styles.ui}>
          <LightButton
            title='Добавить'
            color={accentColor}
            onPress={onAdd}
          />
          <LightButton
            title='Убрать'
            color={errorColor}
            onPress={onRemove}
          />
        </View>
      </View>
      <View style={styles.caloriesContainer}>
        <Text style={styles.calories}>{toReadableNumber(productItem.toCalories(productItem.amount))} ккал</Text>
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

export default RecipeItemAdapter
