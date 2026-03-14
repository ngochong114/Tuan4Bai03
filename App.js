import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/components/LoginScreen';
import StyleSheetSpinner from './src/components/StyleSheetSpinner';
import StatusBarRefresh from './src/components/StatusBarRefresh';
import Loading from './src/components/Loading'

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="StatusBarRefresh" component={StatusBarRefresh} />
      <Tab.Screen name="StyleSheetSpinner" component={StyleSheetSpinner} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator()

export default function App() {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    isLoading: false
  })

  const handleLoginSuccess = () => {
    //Bật loading
    setAuthState({
      isLoggedIn: false,
      isLoading: true
    })

    // Hết thời gian loading, đăng nhập thành công
    setTimeout(() => {
      setAuthState({
        isLoggedIn: true,
        isLoading: false
      })
    }, 1500)
  }

  if (authState.isLoading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        {authState.isLoggedIn ? (
          <Stack.Screen name="Tabs" component={Tabs} />
        ) : (
          <Stack.Screen name="Login">
            {() => <LoginScreen onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}