import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import Settings from '../screens/Settings.js'

const Stack = createStackNavigator()

const SettingsTab = ({ navigation }) => (
  <TabNavigationContext.Provider value={navigation}>
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
  </TabNavigationContext.Provider>
)

export default SettingsTab
