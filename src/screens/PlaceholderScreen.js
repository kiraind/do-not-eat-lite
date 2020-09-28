import React from 'react'
import { View, Text } from 'react-native'

const PlaceholderScreen = ({ route }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text>PlaceholderScreen</Text>
      <Text>{route.name}</Text>
    </View>
  )
}

export default PlaceholderScreen
