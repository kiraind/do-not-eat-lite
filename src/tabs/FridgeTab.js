import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import FrigdeScreen from '../screens/FrigdeScreen.js'
import AddNewProductScreen from '../screens/AddNewProductScreen.js'

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
        component={FrigdeScreen}
      />
      <Stack.Screen
        name='addNewProduct'
        options={{ title: 'Добавить продукт' }}
        component={AddNewProductScreen}
      />
    </Stack.Navigator>
  </TabNavigationContext.Provider>
)

export default FridgeTab
