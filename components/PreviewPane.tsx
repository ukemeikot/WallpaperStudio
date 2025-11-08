import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Wallpaper } from '../types/types';
import { getWallpaperImageSource } from '../data/wallpapers';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface PreviewPaneProps {
  wallpaper: Wallpaper;
  onOpenSetup: (id: string, category: string) => void;
  onSave: (id: string) => void;
  navigation: StackScreenProps<RootStackParamList, 'CategoryDetail'>['navigation'];
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ wallpaper, onOpenSetup, onSave, navigation }) => {
  const imageSource = getWallpaperImageSource(wallpaper.imageName);

  const handleSetClick = () => {
    onOpenSetup(wallpaper.id, wallpaper.category);
  };

  return (
    <View style={styles.container}>
      {/* Linear Gradient Background */}
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
            <Stop offset="1" stopColor="#F8F8F8" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>

      {/* Content */}
      <View style={styles.previewContent}>
        <Text style={styles.previewTitle}>Preview</Text>

        <View style={styles.detailsAndImageRow}>
          {/* Text Column */}
          <View style={styles.textColumn}>
            <View style={styles.detailsGroup}>
              <Text style={styles.name}>{wallpaper.name}</Text>

              <Text style={styles.subHeader}>Tags</Text>
              <View style={styles.tagsContainer}>
                {wallpaper.tags.map(tag => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.subHeader}>Description</Text>
              <Text style={styles.descriptionText} numberOfLines={4}>
                {wallpaper.description}
              </Text>
            </View>

            {/* Icon Bar */}
            <View style={styles.actionIconBar}>
              <Pressable onPress={() => onSave(wallpaper.id)}>
                <Image
                  source={require('../assets/icons/Vector-4.png')}
                  style={styles.icon}
                />
              </Pressable>

              <Pressable onPress={() => navigation.navigate('Settings')}>
                <Image
                  source={require('../assets/icons/Heart.png')}
                  style={styles.icon}
                />
              </Pressable>
            </View>
          </View>

          {/* Image Column */}
          <View style={styles.imageColumn}>
            <View style={styles.phoneMockup}>
              <Image source={imageSource} style={styles.previewImage} />
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <Pressable onPress={() => onSave(wallpaper.id)} style={styles.saveButton}>
          <Image
            source={require('../assets/icons/Heart.png')}
            style={styles.saveIcon}
          />
          <Text style={styles.saveText}>Save to Favorites</Text>
        </Pressable>

        <Pressable onPress={handleSetClick} style={styles.setButton}>
          <Text style={styles.setButtonText}>Set to Wallpaper</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  previewContent: {
    flex: 1,
    paddingBottom: 10,
  },
  detailsAndImageRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
  },
  previewTitle: {
    fontFamily: 'Poppins-Black',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  textColumn: {
    flex: 1,
    paddingRight: 15,
    justifyContent: 'space-between',
    flexShrink: 1,
    minWidth: 0,
  },
  imageColumn: {
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  detailsGroup: {
    flexShrink: 1,
    marginTop: 40,
  },
  phoneMockup: {
    height: 300,
    width: 150,
    backgroundColor: '#eee',
    borderRadius: 30,
    padding: 0,
    overflow: 'hidden',
    marginLeft: -60,

  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 25,
    paddingHorizontal: 30,
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 5,
    color: '#000000',
  },
  subHeader: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#808080',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 400,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 12,
  },
  tag: {
    backgroundColor: '#BFBFBF',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 15,
    
  },
  tagText: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    fontSize: 14,
    fontWeight: 400,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#808080',
    fontWeight: 400,
  },
  actionIconBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 60,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 30,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: '#666',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    flexWrap: 'wrap',
    gap: 30,
    paddingBottom: 40,
    marginLeft: -30,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 21,
    backgroundColor: '#F8F8F8',
  },
  saveIcon: {
    width: 15,
    height: 15,
    tintColor: '#666',
    marginRight: 6,
  },
  saveText: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
  },
  setButton: {
    backgroundColor: '#FBB03B',
    borderRadius: 21,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setButtonText: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default PreviewPane;
