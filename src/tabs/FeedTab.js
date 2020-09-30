import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import PlaceholderScreen from '../screens/PlaceholderScreen.js'
import FeedScreen from '../screens/FeedScreen.js'

const Stack = createStackNavigator()

const FeedTab = ({ navigation }) => (
  <TabNavigationContext.Provider value={navigation}>
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
        component={FeedScreen}
      />
    </Stack.Navigator>
  </TabNavigationContext.Provider>
)

export default FeedTab
