import React from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Text,
  View
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import { accentColor } from './constants.js'

import OnboardingScreen from './screens/OnboardingScreen.js'
import Settings from './screens/Settings.js'

import SettingsTab from './tabs/SettingsTab.js'

const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator()

const PlaceholderScreen = ({ route }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text>PlaceholderScreen</Text>
      <Text>{route.name}</Text>
    </View>
  )
}

const WelcomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >
    <Stack.Screen
      name="onboardingScreen"
      options={{
        headerShown: false,
      }}
      component={OnboardingScreen}
    />
    <Stack.Screen
      name="initialSettings"
      options={{
        headerTitle: "Настройки"
      }}
      component={Settings}
    />
  </Stack.Navigator>
)

const NormalNavigator = () => (
  <BottomTab.Navigator
    tabBarOptions={{
      safeAreaInsets: {
        bottom: 6,
      },
      tabStyle: {
        marginTop: 6
      },
      labelStyle: {
        marginTop: 4
      },
      activeTintColor: accentColor,
    }}
    initialRouteName="feed"
  >
    <BottomTab.Screen
      name="scanner"
      options={{
        title: "Сканер",
        tabBarIcon: ({ focused, color, size }) => <MaterialIcons name="crop-free" size={size} color={color} />
      }}
      component={PlaceholderScreen}
    />
    <BottomTab.Screen
      name="frigde"
      options={{
        title: "Моя еда",
        tabBarIcon: ({ focused, color, size }) => <MaterialIcons name="kitchen" size={size} color={color} />
      }}
      component={PlaceholderScreen}
    />
    <BottomTab.Screen
      name="feed"
      options={{
        title: "Профиль",
        tabBarIcon: ({ focused, color, size }) => <MaterialIcons name="person" size={size} color={color} />
      }}
      component={PlaceholderScreen}
    />
    <BottomTab.Screen
      name="plate"
      options={{
        title: "Тарелка",
        tabBarIcon: ({ focused, color, size }) => <MaterialIcons name="room-service" size={size} color={color} />
      }}
      component={PlaceholderScreen}
    />
    <BottomTab.Screen
      name="settings"
      options={{
        title: "Настройки",
        tabBarIcon: ({ focused, color, size }) => <MaterialIcons name="menu" size={size} color={color} />
      }}
      component={SettingsTab}
    />
  </BottomTab.Navigator>
)

const Router = ({
  loading,
  onboarded
}) => {
  // loading indicator
  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color="#dadada" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {onboarded ? <NormalNavigator /> : <WelcomeNavigator />}
    </NavigationContainer>
  )
}

const mapStateToProps = state => ({
  loading: !state.hydrated,

  onboarded: state.onboarded,
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Router)