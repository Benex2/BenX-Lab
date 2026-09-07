import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Updates from 'expo-updates';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { SubscriptionProvider } from './src/context/SubscriptionContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import StudyVaultScreen from './src/screens/StudyVaultScreen';
import TerminalScreen from './src/screens/TerminalScreen';
import AIHubScreen from './src/screens/AIHubScreen';
import DictionaryScreen from './src/screens/DictionaryScreen';

// Navigation Icons
import { HomeIcon, VaultIcon, TerminalIcon, AIIcon, DictIcon } from './src/components/Icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.cardFill,
          borderTopColor: colors.primary,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="StudyVault"
        component={StudyVaultScreen}
        options={{
          tabBarLabel: 'Study Vault',
          tabBarIcon: ({ color, size }) => <VaultIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Terminal"
        component={TerminalScreen}
        options={{
          tabBarLabel: 'Terminal',
          tabBarIcon: ({ color, size }) => <TerminalIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="AIHub"
        component={AIHubScreen}
        options={{
          tabBarLabel: 'AI Hub',
          tabBarIcon: ({ color, size }) => <AIIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Dictionary"
        component={DictionaryScreen}
        options={{
          tabBarLabel: 'Dictionary',
          tabBarIcon: ({ color, size }) => <DictIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  return (
    <ThemeProvider>
      <SubscriptionProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="light" />
        </NavigationContainer>
      </SubscriptionProvider>
    </ThemeProvider>
  );
}
