import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import OnboardingScreen from '../screens/OnboardingScreen.js'
import SettingsScreen from '../screens/SettingsScreen.js'

const Stack = createStackNavigator()

const WelcomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <Stack.Screen
      name='onboardingScreen'
      options={{
        headerShown: false
      }}
      component={OnboardingScreen}
    />
    <Stack.Screen
      name='initialSettings'
      options={{
        headerTitle: 'Настройки'
      }}
      component={SettingsScreen}
    />
  </Stack.Navigator>
)

export default WelcomeNavigator
