import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import PlaceholderScreen from '../screens/PlaceholderScreen.js'

const Stack = createStackNavigator()

const FeedTab = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <Stack.Screen
      name='feed'
      options={{
        headerShown: false
      }}
      component={PlaceholderScreen}
    />
  </Stack.Navigator>
)

export default FeedTab
