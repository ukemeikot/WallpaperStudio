// /App.tsx (Minimal Refactor)
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { WallpaperProvider } from './context/WallpaperContext'; // <-- NEW IMPORT

const App: React.FC = () => {
  return (
    // All navigation logic is now wrapped by the provider
    <WallpaperProvider> 
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    </WallpaperProvider>
  );
};

export default App;