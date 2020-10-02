import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import FrigdeScreen from '../screens/FrigdeScreen.js'
import AddNewProductScreen from '../screens/AddNewProductScreen.js'
import ProductViewScreen from '../screens/ProductViewScreen.js'
import AddNewRecipeScreen from '../screens/AddNewRecipeScreen.js'

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
      <Stack.Screen
        name='viewProduct'
        options={({ route }) => ({ title: route.params.barcode || route.params.title })}
        component={ProductViewScreen}
      />
      <Stack.Screen
        name='addNewRecipe'
        options={{ title: 'Добавить рецепт' }}
        component={AddNewRecipeScreen}
      />
    </Stack.Navigator>
  </TabNavigationContext.Provider>
)

export default FridgeTab
