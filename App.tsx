import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { loadSettings } from './src/store/profileStore';
import { setLanguage } from './src/utils/i18n';
import { Colors } from './src/utils/colors';
import HomeScreen from './src/screens/HomeScreen';
import EditMapperScreen from './src/screens/EditMapperScreen';
import OverlayScreen from './src/screens/OverlayScreen';
import AddGameScreen from './src/screens/AddGameScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SupportScreen from './src/screens/SupportScreen';

const Stack = createNativeStackNavigator();

const NAV_THEME = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.text,
    border: Colors.border,
    primary: Colors.primary,
    notification: Colors.primary,
  },
};

export default function App() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(Colors.background);
    loadSettings().then(s => setLanguage(s.language));
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={NAV_THEME}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddGame" component={AddGameScreen} />
          <Stack.Screen name="EditMapper" component={EditMapperScreen} />
          <Stack.Screen name="Overlay" component={OverlayScreen}
            options={{ animation: 'fade', gestureEnabled: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
