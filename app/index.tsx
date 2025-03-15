import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first launch
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === 'true') {
          setIsFirstLaunch(false);
        } else {
          // Set the flag for future launches
          await AsyncStorage.setItem('hasLaunched', 'true');
          setIsFirstLaunch(true);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isLoading) {
    // Return null while checking - this will show the splash screen
    return null;
  }

  // Redirect to welcome screen on first launch, otherwise go to customer dashboard
  return isFirstLaunch ? 
    <Redirect href="/welcome" /> : 
    <Redirect href="/(customer)" />;
}
