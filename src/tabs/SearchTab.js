import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import PlaceholderScreen from '../screens/PlaceholderScreen.js'
import ScannerScreen from '../screens/ScannerScreen.js'
import ScanResultScreen from '../screens/ScanResultScreen.js'
import AddNewProduct from '../screens/AddNewProduct.js'

const Stack = createStackNavigator()

const SearchTab = () => (
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
      component={ScanResultScreen}
    />
    <Stack.Screen
      name='addNewProduct'
      options={{ title: 'Добавить продукт' }}
      component={AddNewProduct}
    />
  </Stack.Navigator>
)

export default SearchTab
