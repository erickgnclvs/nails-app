// Import necessary gesture handler first
import 'react-native-gesture-handler';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigationContainerRef } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform, StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          // Using screenOptions to configure navigation properly
          screenOptions={{
            headerShown: false,
            // Customize iOS behavior first
            ...Platform.select({
              ios: {
                // Key settings for iOS gesture-based navigation
                gestureEnabled: true, // Enable swipe gestures for navigation
                gestureDirection: 'horizontal', // Explicitly set horizontal direction
                fullScreenGestureEnabled: true, // Make the entire screen respond to gestures
                animation: 'slide_from_right', // Use standard iOS animation
                animationDuration: 350, // Slightly longer animation feels more natural
                presentation: 'card', // Card style matches iOS conventions
                // Don't disable contentStyle as it helps with transitions
                contentStyle: { backgroundColor: 'white' }
              },
              android: {
                animation: 'slide_from_right'
              }
            })
          }}
        >
          <Stack.Screen name="(tech)" />
          <Stack.Screen name="(customer)" />
          <Stack.Screen 
            name="welcome" 
            options={{
              // These settings prevent the welcome screen from being part of back navigation
              gestureEnabled: false, // Disable swipe gesture for this screen
              presentation: 'modal', // Modal presentation is different from card navigation
              // Additional settings to ensure it's not part of the normal navigation flow
              animationTypeForReplace: 'push',
              animation: 'fade'
            }} 
          />
          <Stack.Screen name="auth" />
          <Stack.Screen name="+not-found" options={{ headerShown: true }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
