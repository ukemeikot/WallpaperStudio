
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { ActiveWallpaper } from '../types/types'; 
import { categories } from '../data/categories'; 
import { getWallpaperById, getWallpaperImageSource } from '../data/wallpapers'; // Utility imports

interface ActiveCardProps {
  activeWallpaper: ActiveWallpaper;
  onShare: () => void;
  onSettings: () => void;
}

const ActiveWallpaperCard: React.FC<ActiveCardProps> = ({ activeWallpaper, onShare, onSettings }) => {
  // 1. Fetch Category and Wallpaper details using the IDs from the state
  const activeCategory = categories.find(c => c.id === activeWallpaper.category);
  const selectedWallpaper = getWallpaperById(activeWallpaper.selectionId);
  
  if (!activeCategory || !selectedWallpaper) return null;

  // 2. Get the dynamic image source
  const wallpaperImageSource = getWallpaperImageSource(selectedWallpaper.imageName); 

  return (
    <View style={styles.cardContainer}>
      

      <View style={styles.detailsBox}>
        {/* Left Thumbnail (Dynamic Image) */}
        <Image 
            source={wallpaperImageSource} 
            style={[styles.thumbnail, {borderColor: activeCategory.color}]} 
        />
        <View>
            <Text style={styles.title}>Your Active Wallpaper</Text>
            <Text style={styles.subtitle}>This wallpaper is currently set as your active background</Text>
        {/* Center Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Category - <Text style={styles.boldText}>{activeCategory.title}</Text></Text>
          <Text style={styles.infoText}>Selection - <Text style={styles.boldText}>{selectedWallpaper.name}</Text></Text>
        </View>
        </View>
        {/* Right Icons (Action Buttons) */}
        <View style={styles.iconActions}>
          <Pressable onPress={onShare} style={styles.iconButton}>
            <Image
              source={require('../assets/icons/Vector-4.png')}
              style={{ width: 20, height: 20, tintColor: '#7C7C7C' }}
            />
          </Pressable>
          <Pressable onPress={onSettings} style={styles.iconButton}>
            <Image
              source={require('../assets/icons/Settingsicon.png')}
              style={{ width: 20, height: 20, tintColor: '#7C7C7C',  }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FF6600',
    marginBottom: 5,
    fontFamily: 'false',
  },
  subtitle: {
    fontSize: 20,
    color: '#808080',
    marginBottom: 20,
    fontFamily: 'Popping-Regular',
    fontWeight: '400',
  },
  detailsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    // Note: Add shadow styling here for macOS depth
  },
  thumbnail: {
    width: 117,
    height: 210,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 20,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1, 
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: '600',
  },
  iconActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
});

export default ActiveWallpaperCard;