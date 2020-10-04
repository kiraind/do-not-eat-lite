import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { backgroundColor, secondaryTextColor } from '../constants'

const WarningBlock = ({
  text,
  color = secondaryTextColor,
  background = backgroundColor
}) => (
  <View style={{
    ...styles.body,
    backgroundColor: background
  }}
  >
    <MaterialIcons
      name='error-outline'
      size={24}
      color={color}
    />
    <Text
      style={{
        ...styles.text,
        color
      }}
    >
      {text}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  body: {
    flex: 1,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  text: {
    marginLeft: 7
  }
})

export default WarningBlock
