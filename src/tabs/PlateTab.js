import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import PlateScreen from '../screens/PlateScreen.js'

const Stack = createStackNavigator()

const PlateTab = ({ navigation }) => (
  <TabNavigationContext.Provider value={navigation}>
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
  </TabNavigationContext.Provider>
)

export default PlateTab
