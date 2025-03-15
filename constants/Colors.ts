/**
 * This file contains all the colors used in the app.
 * By centralizing colors here, we can easily theme the app by changing these values.
 */

// Base theme colors
const primaryColor = '#222';  // Main brand color - black
const secondaryColor = '#f5a623';  // Accent color - orange/amber
const successColor = '#4CAF50';  // Success color - green

// Theme configuration
export const Colors = {
  // Text colors
  text: {
    primary: primaryColor,       // Main text color
    secondary: '#666',          // Secondary text color
    tertiary: '#888',           // Less important text
    light: '#fff',              // Text on dark backgrounds
    placeholder: '#999',        // Placeholder text
  },
  
  // Background colors
  background: {
    primary: '#fff',            // Main background color
    secondary: '#f9f9f9',       // Secondary background (light gray)
    card: '#fff',              // Card background
    input: '#f5f5f5',           // Input background
  },
  
  // Border colors
  border: {
    light: '#f0f0f0',           // Light borders
    medium: '#ddd',             // Medium borders
    focus: primaryColor,        // Border for focused elements
  },
  
  // Status colors
  status: {
    confirmed: primaryColor,     // Confirmed status
    pending: secondaryColor,     // Pending status
    completed: successColor,     // Completed status
    error: '#ff4d4d',           // Error status
  },
  
  // Button colors
  button: {
    primary: {
      background: primaryColor,
      text: '#fff',
    },
    secondary: {
      background: '#fff',
      text: primaryColor,
      border: '#ddd',
    },
    success: {
      background: successColor,
      text: '#fff',
    },
  },
  
  // Icon colors
  icon: {
    primary: primaryColor,       // Primary icons
    secondary: '#555',          // Secondary icons
    tertiary: '#ccc',           // Tertiary icons
    light: '#fff',              // Icons on dark backgrounds
  },
  
  // Shadow
  shadow: {
    color: '#000',
    opacity: 0.05,
  },
  
  // Tab navigation
  tab: {
    active: primaryColor,
    inactive: '#888',
  },
  
  // Specific UI elements
  heart: '#222',                // Heart icon (can be changed to red: '#ff4d4d')
  star: primaryColor,           // Star icon for ratings
  gray: '#ddd',                // Gray color for inactive stars
  white: '#fff',               // White color
  lightGray: '#f5f5f5',        // Light gray color
  primary: primaryColor,        // Primary color
  
  // Dark mode colors (for future implementation)
  dark: {
    text: {
      primary: '#fff',
      secondary: '#ccc',
      tertiary: '#999',
      light: primaryColor,
      placeholder: '#888',
    },
    background: {
      primary: '#121212',
      secondary: '#1e1e1e',
      card: '#2c2c2c',
      input: '#333',
    },
    border: {
      light: '#333',
      medium: '#444',
      focus: '#fff',
    },
    button: {
      primary: {
        background: '#fff',
        text: '#121212',
      },
      secondary: {
        background: '#2c2c2c',
        text: '#fff',
        border: '#444',
      },
    },
    icon: {
      primary: '#fff',
      secondary: '#ccc',
      tertiary: '#666',
      light: '#121212',
    },
    tab: {
      active: '#fff',
      inactive: '#888',
    },
  },
};
