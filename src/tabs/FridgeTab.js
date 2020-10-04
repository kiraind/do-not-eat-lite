import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import FrigdeScreen from '../screens/FrigdeScreen.js'
import AddNewProductScreen from '../screens/AddNewProductScreen.js'
import ProductViewScreen from '../screens/ProductViewScreen.js'
import MealViewScreen from '../screens/MealViewScreen.js'
import AddNewRecipeScreen from '../screens/AddNewRecipeScreen.js'
import SelectProductScreen from '../screens/SelectProductScreen.js'

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
        name='viewMeal'
        options={({ route }) => ({ title: route.params.title })}
        component={MealViewScreen}
      />
      <Stack.Screen
        name='addNewRecipe'
        options={{ title: 'Добавить рецепт' }}
        component={AddNewRecipeScreen}
      />
      <Stack.Screen
        name='selectProduct'
        options={{ title: 'Выбор ингредиента' }}
        component={SelectProductScreen}
      />
    </Stack.Navigator>
  </TabNavigationContext.Provider>
)

export default FridgeTab
