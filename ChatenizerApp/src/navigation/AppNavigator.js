import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador para autenticación
function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Navegador para la aplicación principal
function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Chats" 
        component={ChatListScreen} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// Navegador principal
function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen 
        name="Auth" 
        component={AuthNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Main" 
        component={MainNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}