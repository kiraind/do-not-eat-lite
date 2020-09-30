import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import ScannerScreen from '../screens/ScannerScreen.js'
import ProductViewScreen from '../screens/ProductViewScreen.js'
import AddNewProductScreen from '../screens/AddNewProductScreen.js'

const Stack = createStackNavigator()

const SearchTab = ({ navigation }) => (
  <TabNavigationContext.Provider value={navigation}>
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Stack.Screen
        name='scanner'
        options={{
          headerShown: false
        }}
        component={ScannerScreen}
      />
      <Stack.Screen
        name='scannedResult'
        options={({ route }) => ({ title: route.params.barcode })}
        component={ProductViewScreen}
      />
      <Stack.Screen
        name='addNewProduct'
        options={{ title: 'Добавить продукт' }}
        component={AddNewProductScreen}
      />
    </Stack.Navigator>
  </TabNavigationContext.Provider>
)

export default SearchTab
