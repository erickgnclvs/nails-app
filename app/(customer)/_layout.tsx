import { Tabs, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function CustomerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Enable gesture-based navigation
        ...Platform.select({
          ios: {
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            fullScreenGestureEnabled: true,
            animation: 'slide_from_right',
            animationDuration: 300,
            presentation: 'card',
          },
          android: {
            animation: 'slide_from_right',
            animationEnabled: true,
          }
        })
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="tech-profile" />
      <Stack.Screen name="tech-reviews" />
      <Stack.Screen name="search" />
    </Stack>
  );
}

// Nested tab navigator for the main tabs
function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#222',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        height: 76, // Increased height to create more space
        paddingBottom: 24, // Increased padding to move tabs up
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tech-profile"
        options={{
          href: null, // This screen won't appear in the tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="tech-reviews"
        options={{
          href: null, // This screen won't appear in the tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null, // This screen won't appear in the tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inspiration"
        options={{
          title: 'Inspiration',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
