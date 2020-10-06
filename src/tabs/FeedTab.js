import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import FeedScreen from '../screens/FeedScreen.js'
import ScannerScreen from '../screens/ScannerScreen.js'
import ProductViewScreen from '../screens/ProductViewScreen.js'
import AddNewProductScreen from '../screens/AddNewProductScreen.js'
import SelectMealScreen from '../screens/SelectMealScreen.js'
import CookingScreen from '../screens/CookingScreen.js'

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
      <Stack.Screen
        name='scanner'
        options={{
          headerShown: false
        }}
        component={ScannerScreen}
      />
      <Stack.Screen
        name='viewProduct'
        options={({ route }) => ({ title: route.params.barcode })}
        component={ProductViewScreen}
      />
      <Stack.Screen
        name='addNewProduct'
        options={{ title: 'Добавить продукт' }}
        component={AddNewProductScreen}
      />
      <Stack.Screen
        name='selectMeal'
        options={{ title: 'Выберите блюдо' }}
        component={SelectMealScreen}
      />
      <Stack.Screen
        name='cookMeal'
        options={{ title: 'Готовка' }}
        component={CookingScreen}
      />
    </Stack.Navigator>
  </TabNavigationContext.Provider>
)

export default FeedTab
