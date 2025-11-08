import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen'; 

export type RootStackParamList = {
  Home: undefined;
  Browse: undefined;
  

  CategoryDetail: { 
    categoryId: string; 
    wallpaperId?: string;
  };
  Favourites: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Browse" component={BrowseScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
      <Stack.Screen name="Favourites" component={FavoritesScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      
      {/* REMOVED: Stack.Screen name="WallpaperSetup" component={WallpaperSetupScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;