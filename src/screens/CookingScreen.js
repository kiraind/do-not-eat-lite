import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput, TouchableOpacity
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { ScrollView } from 'react-native-gesture-handler'

import {
  accentColor,
  backgroundColor,
  backgroundDepthColor,
  iconColor,
  secondaryTextColor
} from '../constants.js'
import toReadableNumber from '../utils/toReadableNumber.js'
import { cookMeal, loadFrigde } from '../store/actions.js'
import * as CookingMethod from '../models/CookingMethod.js'

const CookingScreen = ({
  navigation,
  route,

  cookMeal,
  loadFrigde
}) => {
  const {
    meal,
    amount: defaultAmount
  } = route.params

  // data
  const [amount, setAmount] = useState(
    defaultAmount ? toReadableNumber(defaultAmount) : ''
  )
  const amountParsed = parseFloat(amount.replace(',', '.'))

  const [checked, setChecked] = useState(meal.products.map(() => false))
  const toggleIngredient = i => setChecked([
    ...checked.slice(0, i),
    !checked[i],
    ...checked.slice(i + 1)
  ])

  // ui
  const [amountFocused, setAmountFocused] = useState(false)
  const [loading, setLoading] = useState(false)

  // handlers
  const handleCook = async () => {
    setLoading(true)
    await cookMeal(meal, amountParsed)
    await loadFrigde()
    setLoading(false)
    navigation.pop()
  }

  return (
    <>
      <ScrollView style={styles.body}>
        <Text style={styles.title}>
          {meal.title}
          <Text style={styles.secondary}>
            {' '}—&nbsp;{CookingMethod.String[meal.cookingMethod]}
          </Text>
        </Text>
        <View style={styles.spacer} />
        <Text style={styles.label}>Итоговое количество (г)</Text>
        <TextInput
          keyboardType='decimal-pad'
          style={{
            ...styles.textInput,

            borderColor: amountFocused ? accentColor : backgroundDepthColor,
            backgroundColor: amountFocused ? backgroundColor : backgroundDepthColor
          }}
          onFocus={() => setAmountFocused(true)}
          onBlur={() => setAmountFocused(false)}

          value={amount}
          onChangeText={setAmount}

          placeholder='500'
          autoFocus={!defaultAmount}
        />
        <View style={styles.spacer} />
        <Text style={styles.label}>Ингредиенты</Text>
        {meal.products.map((product, i) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => toggleIngredient(i)}
          >
            <View style={styles.ingredient}>
              <CheckBox
                value={checked[i]}
                onValueChange={() => toggleIngredient(i)}
                onTintColor={accentColor}
                tintColors={{
                  true: accentColor,
                  false: iconColor
                }}
              />
              <Text>{product.title}</Text>
              {!isNaN(amountParsed) && (
                <Text style={styles.secondary}>
                  {' '}—&nbsp;{toReadableNumber(product.part * amountParsed)}&nbsp;г
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )
        )}
      </ScrollView>
      <View style={styles.bottomDrawer}>
        <Button
          title={!loading ? 'Готово' : 'Загрузка...'}
          color={accentColor}
          disabled={
            loading ||
            checked.some(c => !c) ||
            isNaN(amountParsed)
          }
          onPress={handleCook}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor,
    padding: 16
  },
  title: {
    fontSize: 18
  },
  label: {
    fontSize: 14,
    color: secondaryTextColor,
    marginBottom: 8
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    paddingHorizontal: 20,
    fontSize: 18
  },
  spacer: {
    height: 24
  },
  ingredient: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  secondary: {
    color: secondaryTextColor
  },
  bottomDrawer: {
    padding: 16,
    backgroundColor,
    elevation: 10
  }
})

const mapDispatchToProps = {
  cookMeal,
  loadFrigde
}

export default connect(null, mapDispatchToProps)(CookingScreen)
