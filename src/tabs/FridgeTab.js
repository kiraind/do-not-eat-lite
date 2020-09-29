import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import PlaceholderScreen from '../screens/PlaceholderScreen.js'

const Stack = createStackNavigator()

const FridgeTab = ({ navigation }) => (
  <TabNavigationContext.Provider value={navigation}>
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Stack.Screen
        name='frigde'
        options={{
          title: 'Моя еда'
        }}
        component={PlaceholderScreen}
      />
    </Stack.Navigator>
  </TabNavigationContext.Provider>
)

export default FridgeTab
