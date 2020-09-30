import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const LightButton = ({ title, Icon, onPress, color }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        ...styles.body,
        borderColor: color
      }}
    >
      <Text
        style={{
          ...styles.text,
          color
        }}
      >
        {title}
      </Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  body: {
    borderWidth: 1,
    height: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginRight: 5
  },
  text: {
    fontSize: 10,
    lineHeight: 10
  }
})

export default LightButton
