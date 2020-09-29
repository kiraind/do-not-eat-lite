import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import PlateScreen from '../screens/PlateScreen.js'

const Stack = createStackNavigator()

const PlateTab = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <Stack.Screen
      name='plate'
      options={{
        title: 'Тарелка'
      }}
      component={PlateScreen}
    />
  </Stack.Navigator>
)

export default PlateTab
