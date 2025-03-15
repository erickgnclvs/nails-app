import { ColorSchemeName } from 'react-native';

/**
 * Custom hook that always returns 'light' color scheme regardless of system preference
 * This effectively disables dark mode for the entire app
 */
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return 'light';
}
