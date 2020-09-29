import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  accentColor,
  backgroundDepthColor,
  errorColor,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'
import toReadableNumber from '../utils/toReadableNumber.js'

const LightButton = ({ title, Icon, onPress, color }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{
      borderColor: color,
      borderWidth: 1,
      height: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      marginRight: 5
    }}
    >
      <Text style={{
        fontSize: 10,
        lineHeight: 10,
        color
      }}
      >{title}
      </Text>
    </View>
  </TouchableOpacity>
)

export const ProductItemAdapter = ({ product }) => {
  const [titleWidthDelta, setTitleWidthDelta] = useState(105)

  const adjustTitleWidth = e => {
    console.log(e.nativeEvent.layout.width)
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
            {product.title}
          </Text>
          <Text style={styles.amount} onLayout={adjustTitleWidth}> — {product.readableAmount}</Text>
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
        <Text style={styles.calories}>{toReadableNumber(product.toCalories(product.amount))} ккал</Text>
      </View>
    </View>
  )
}

export const MealItemAdapter = ({ meal, last }) => {
  return (
    <View style={styles.body}>
      <Text>Todo</Text>
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
