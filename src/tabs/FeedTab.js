import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import TabNavigationContext from './TabNavigationContext.js'

import FeedScreen from '../screens/FeedScreen.js'
import ScannerScreen from '../screens/ScannerScreen.js'
import ScanResultScreen from '../screens/ScanResultScreen.js'
import AddNewProduct from '../screens/AddNewProduct.js'

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
  </TabNavigationContext.Provider>
)

export default FeedTab
