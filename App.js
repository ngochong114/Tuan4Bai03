import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/components/LoginScreen';
import StyleSheetSpinner from './src/components/StyleSheetSpinner';
import StatusBarRefresh from './src/components/StatusBarRefresh';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="StatusBarRefresh" component={StatusBarRefresh} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="StyleSheetSpinner" component={StyleSheetSpinner} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
