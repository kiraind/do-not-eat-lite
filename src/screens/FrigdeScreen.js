import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { backgroundColor } from '../constants'

const FrigdeScreen = () => {
  return (
    <View style={styles.body}>
      <Text>Hello, World</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor
  }
})

export default FrigdeScreen
