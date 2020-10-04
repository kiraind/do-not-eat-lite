import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import PlateScreen from '../screens/PlateScreen.js'
import ProductViewScreen from '../screens/ProductViewScreen.js'
import MealViewScreen from '../screens/MealViewScreen.js'

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
      <Stack.Screen
        name='viewProduct'
        options={({ route }) => ({ title: route.params.title })}
        component={ProductViewScreen}
      />
      <Stack.Screen
        name='viewMeal'
        options={({ route }) => ({ title: route.params.title })}
        component={MealViewScreen}
      />
    </Stack.Navigator>
  </TabNavigationContext.Provider>
)

export default PlateTab
