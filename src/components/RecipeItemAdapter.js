import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

import {
  accentColor,
  backgroundColor,
  backgroundDepthColor,
  errorColor,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'

import { ProductItem } from '../models/Product.js'
import LightButton from './LightButton.js'
import { TextInput } from 'react-native-gesture-handler'

const RecipeItemAdapter = ({
  product,
  amount,

  onRemove,
  onSetAmount
}) => {
  const [titleWidthDelta, setTitleWidthDelta] = useState(105)

  const adjustTitleWidth = e => {
    setTitleWidthDelta(e.nativeEvent.layout.width)
  }

  const [inputFocused, setInputFocused] = useState(false)

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
            title='Убрать'
            color={errorColor}
            onPress={onRemove}
          />
        </View>
      </View>
      <View style={styles.amountContainer}>
        <TextInput
          keyboardType='number-pad'
          style={{
            ...styles.amountInput,
            ...(inputFocused ? {
              backgroundColor,
              borderColor: accentColor
            } : {
              backgroundColor: backgroundDepthColor,
              borderColor: backgroundDepthColor
            })
          }}

          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}

          value={amount}
          onChangeText={onSetAmount}
        />
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
  amountContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center'
  },
  ui: {
    flexDirection: 'row'
  },
  amountInput: {
    fontSize: 16,
    color: primaryTextColor,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 2,
    width: 60,
    textAlign: 'right'
  }
})

export default RecipeItemAdapter
