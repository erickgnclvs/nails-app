import { Redirect } from 'expo-router';

/**
 * Main entry point for the customer layout
 * Redirects to the tabs navigation
 */
export default function CustomerIndexRedirect() {
  // Redirect to the tabs navigation
  return <Redirect href="/(customer)/(tabs)" />;
}
