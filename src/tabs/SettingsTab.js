import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import Settings from '../screens/Settings.js'

const Stack = createStackNavigator()

const SettingsTab = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <Stack.Screen
      name='settings'
      options={{
        headerTitle: 'Настройки'
      }}
      component={Settings}
    />
  </Stack.Navigator>
)

export default SettingsTab
