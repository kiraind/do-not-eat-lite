import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet, KeyboardAvoidingView, Button
} from 'react-native'

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {
  accentColor,
  backgroundColor,
  backgroundDepthColor,
  primaryTextColor,
  secondaryTextColor,
  iconColor
} from '../constants'
import toReadableNumber from '../utils/toReadableNumber'

const EAT = 0
const THROW = 1
const COOK = 2

const ActionString = [
  'Наложить',
  'Выбросить',
  'Приготовить'
]

const MealActions = ({
  item,

  onEat,
  onThrow,
  onCook
}) => {
  const actionHandlers = [
    onEat,
    onThrow,
    onCook
  ]

  const [action, setAction] = useState(null)
  const toggleAction = clicked => {
    if (clicked !== action) {
      setAction(clicked)
    } else {
      setAction(null)
    }
  }

  const [amount, setAmount] = useState('')
  const parsedAmount = parseFloat(amount.replace(',', '.'))
  const [amountFocused, setAmountFocused] = useState(false)

  const handleSubmit = () => {
    if (actionHandlers[action]) {
      actionHandlers[action](parsedAmount)
    }
    setAmount('')
    setAction(null)
  }

  return (
    <KeyboardAvoidingView style={styles.body}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => toggleAction(THROW)}>
          <View style={styles.item}>
            <MaterialIcons
              name='delete-sweep'
              size={24}
              color={action === THROW ? accentColor : iconColor}
            />
            <Text
              style={{
                ...styles.iconLabel,

                color: action === THROW ? accentColor : iconColor
              }}
            >
              Выбросить
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleAction(COOK)}>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name='microwave'
              size={24}
              color={action === COOK ? accentColor : iconColor}
            />
            <Text
              style={{
                ...styles.iconLabel,

                color: action === COOK ? accentColor : iconColor
              }}
            >
              Приготовить
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleAction(EAT)}>
          <View style={styles.item}>
            <MaterialIcons
              name='local-dining'
              size={24}
              color={action === EAT ? accentColor : iconColor}
            />
            <Text
              style={{
                ...styles.iconLabel,

                color: action === EAT ? accentColor : iconColor
              }}
            >
              Наложить
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {action !== null && (
        <View style={styles.action}>
          <TextInput
            style={{
              ...styles.shadowTextInput,
              backgroundColor: amountFocused ? backgroundColor : backgroundDepthColor
            }}
            value={amount ? amount + ` ${item.measureUnitString} = ${toReadableNumber(item.toCalories(parsedAmount))} ккал` : ''}
          />
          <TextInput
            autoFocus
            style={{
              ...styles.textInput,

              borderColor: amountFocused ? accentColor : backgroundDepthColor
            }}
            onFocus={() => setAmountFocused(true)}
            onBlur={() => setAmountFocused(false)}

            value={amount}
            onChangeText={setAmount}

            placeholder={'100 ' + item.measureUnitString}
            keyboardType='number-pad'
          />
          <Button
            title={ActionString[action]}
            disabled={isNaN(parsedAmount)}
            color={accentColor}
            onPress={handleSubmit}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  body: {
    marginTop: 'auto',
    backgroundColor,
    elevation: 10,
    paddingVertical: 10
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  item: {
    alignItems: 'center'
  },
  iconLabel: {
    fontSize: 10
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 16,
    backgroundColor: 'transparent',
    color: primaryTextColor
  },
  action: {
    padding: 16,
    paddingBottom: 6
  },
  label: {
    fontSize: 14,
    color: secondaryTextColor,
    marginBottom: 8
  },
  shadowTextInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: -50,
    color: secondaryTextColor
  }
})

export default MealActions
