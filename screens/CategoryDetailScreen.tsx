import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useWallpaperSetter } from '../context/WallpaperContext';
import HeaderBar, { HeaderBarProps } from '../components/HeaderBar';
import WallpaperCard from '../components/WallpaperCard';
import PreviewPane from '../components/PreviewPane';
import WallpaperSetupScreen from './WallpaperSetupScreen';
import { getWallpapersByCategory, getWallpaperById } from '../data/wallpapers';
import { Wallpaper } from '../types/types';

type CategoryDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'CategoryDetail'
>;

const HEADER_HEIGHT = 98;
const GUTTER_WIDTH = 40;

const getBackIconSource = () => require('../assets/icons/Vector-3.png');
const getGridIconSource = () => require('../assets/icons/Vector.png');
const getListIconSource = () => require('../assets/icons/Vector-2.png');

interface ItemWrapperProps {
  item: Wallpaper;
  isGridView: boolean;
  onPress: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  selectedId: string;
}

const ItemWrapper: React.FC<ItemWrapperProps> = ({
  item,
  isGridView,
  onPress,
  onToggleFavorite,
  selectedId,
}) => {
  return (
    <View style={isGridView ? styles.wallpaperGridItem : styles.wallpaperListItem}>
      <WallpaperCard
        item={item}
        isSelected={item.id === selectedId}
        onPress={onPress}
        onToggleFavorite={onToggleFavorite}
        isListView={!isGridView}
      />
    </View>
  );
};

const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { categoryId } = route.params;
  const { onSetWallpaper } = useWallpaperSetter();
  const wallpapers = getWallpapersByCategory(categoryId);
  const [selectedId, setSelectedId] = useState<string>(wallpapers[0]?.id || '');
  const selectedWallpaper = getWallpaperById(selectedId);
  const [isSetupVisible, setIsSetupVisible] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  const handleSaveFavorite = (id: string) => {};
  const handleOpenSetupModal = (id: string, category: string) => {
    onSetWallpaper(id, category);
    setIsSetupVisible(true);
  };
  const handleCloseSetup = () => setIsSetupVisible(false);

  if (!selectedWallpaper || wallpapers.length === 0) {
    return <Text style={styles.defaultText}>Wallpaper Not Found</Text>;
  }

  const headerProps: HeaderBarProps = { navigation, activeRoute: 'Browse' };

  return (
    <View style={styles.fullScreenContainer}>
      <HeaderBar {...headerProps} />

      <View style={[styles.contentArea, isSetupVisible && styles.dimmedContent]}>
        {/* LEFT PANEL */}
        <View style={[styles.panelContainer, { marginRight: GUTTER_WIDTH }]}>
          <View style={styles.gradientBackground} />
          <View style={styles.leftPanelInner}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
              <Image source={getBackIconSource()} style={styles.backIconImage} />
              <Text style={styles.backText}>Back to Categories</Text>
            </Pressable>

            <View style={styles.listHeader}>
              <Text style={styles.categoryTitle}>
                {selectedWallpaper.category}
              </Text>
              <View style={styles.viewToggle}>
                <Pressable
                  onPress={() => setIsGridView(true)}
                  style={[styles.toggleButton, isGridView && styles.activeToggle]}>
                  <Image
                    source={getGridIconSource()}
                    style={[
                      styles.toggleIconImage,
                      { tintColor: isGridView ? '#333' : '#aaa' },
                    ]}
                  />
                </Pressable>
                <Pressable
                  onPress={() => setIsGridView(false)}
                  style={[styles.toggleButton, !isGridView && styles.activeToggle]}>
                  <Image
                    source={getListIconSource()}
                    style={[
                      styles.toggleIconImage,
                      { tintColor: !isGridView ? '#333' : '#aaa' },
                    ]}
                  />
                </Pressable>
              </View>
            </View>

            <FlatList
              data={wallpapers}
              keyExtractor={(item) => item.id}
              numColumns={isGridView ? 3 : 1}
              key={isGridView ? 'GRID' : 'LIST'}
              renderItem={({ item }) => (
                <ItemWrapper
                  item={item}
                  onPress={setSelectedId}
                  onToggleFavorite={handleSaveFavorite}
                  isGridView={isGridView}
                  selectedId={selectedId}
                />
              )}
              columnWrapperStyle={isGridView ? styles.wallpaperRow : undefined}
              contentContainerStyle={styles.wallpaperGrid}
              showsVerticalScrollIndicator={false}
              style={styles.flatListBase}
            />
          </View>
        </View>

        {/* RIGHT PANEL */}
        <View style={styles.panelContainer}>
          <View style={styles.gradientBackground} />
          <PreviewPane
            wallpaper={selectedWallpaper}
            onOpenSetup={handleOpenSetupModal}
            onSave={handleSaveFavorite}
            navigation={navigation}
          />
        </View>
      </View>

      {isSetupVisible && (
        <View style={styles.setupOverlayContainer}>
          <WallpaperSetupScreen
            wallpaperId={selectedWallpaper.id}
            onClose={handleCloseSetup}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  dimmedContent: { opacity: 0.3 },
  setupOverlayContainer: {
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 10,
    minWidth: 700,
  },
  panelContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    opacity: 0.8,
    zIndex: 0,
  },
  leftPanelInner: { flex: 1, paddingHorizontal: 20, zIndex: 1 },
  flatListBase: { flex: 1, zIndex: 1 },
  wallpaperGrid: { paddingBottom: 20 },
  wallpaperRow: { justifyContent: 'space-between', marginBottom: 20 },
  wallpaperGridItem: { width: '31.333%', marginBottom: 15 },
  wallpaperListItem: { width: '100%', marginBottom: 15 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backIconImage: { width: 20, height: 20, resizeMode: 'contain', tintColor: '#333' },
  backText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 48,
    fontWeight: '400',
    color: '#000000',
    textTransform: 'capitalize',
    fontFamily: 'false',
  },
  viewToggle: { flexDirection: 'row', padding: 5, borderRadius: 8 },
  toggleButton: { paddingHorizontal: 5, paddingVertical: 2 },
  activeToggle: { backgroundColor: 'white', borderRadius: 6 },
  toggleIconImage: { width: 20, height: 20, resizeMode: 'contain' },
  defaultText: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CategoryDetailScreen;
