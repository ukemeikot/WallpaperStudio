
import React, { useState } from 'react';
import { 
    ScrollView, 
    Text, 
    View, 
    StyleSheet, 
    FlatList, 
    ViewStyle 
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// --- CORE IMPORTS ---
import HeaderBar, { HeaderBarProps } from '../components/HeaderBar'; 
import CategoryCard from '../components/CategoryCard'; 
import GradientText from '../components/GradientText'; 
import ActiveWallpaperCard from '../components/ActiveWallpaperCard'; 
import { categories } from '../data/categories'; 
import { getWallpaperById } from '../data/wallpapers';
import { ActiveWallpaper, Category } from '../types/types'; 
import { useWallpaperSetter } from '../context/WallpaperContext'; 

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;


const ItemWrapper: React.FC<{ item: Category, onPress: (id: string) => void }> = ({ item, onPress }) => {
    return (
        <View style={styles.gridItemWrapper}>
            <CategoryCard 
                item={item} 
                onPress={onPress} 
                isActive={false}
            />
        </View>
    );
};


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const { activeWallpaper } = useWallpaperSetter(); 

  const handleCategoryPress = (categoryId: string) => {

    navigation.navigate('CategoryDetail', { 
        categoryId: categoryId,
    });
  };
  
  const headerProps: HeaderBarProps = {
    navigation: navigation,
    activeRoute: "Home", 
  };


  const handleShare = () => console.log('Sharing Active Wallpaper...');
  const handleSettings = () => navigation.navigate('Settings');

  return (
    <ScrollView style={styles.container}>
      
      <HeaderBar {...headerProps} />


      <View style={styles.contentWrapper}>
        

        {activeWallpaper ? (
          <ActiveWallpaperCard
            activeWallpaper={activeWallpaper}
            onShare={handleShare}
            onSettings={handleSettings}
          />
        ) : (
          <View style={styles.discoveryHeader}>
            <GradientText 
                colors={['#FBB03B', '#EC0C43']} 
                style={styles.mainTitle}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }} 
            >
                Discover Beautiful Wallpapers
            </GradientText>
            <Text style={styles.description}>Discover curated collections of stunning wallpapers. Browse </Text>
            <Text style={styles.description}>by category, preview in full-screen, and set your favorites.</Text>
          </View>
        )}

        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <Text style={styles.seeAll} onPress={() => navigation.navigate('Browse')}>See All</Text>
        </View>
        
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <ItemWrapper item={item} onPress={handleCategoryPress} />
          )}
          columnWrapperStyle={styles.row} 
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 0, paddingTop: 0, backgroundColor: '#F7F7F7' },
  contentWrapper: { paddingHorizontal: 30, paddingTop: 30, },
  discoveryHeader: { marginBottom: 30, marginTop: 0, },
  mainTitle: { 
    fontSize: 60, 
    fontWeight: '500', 
    color: '#FF6600', 
    fontFamily: 'false', 
  
  },
  description: { 
    fontSize: 24, 
    color: '#575757',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  categoriesTitle: { 
    fontSize: 32, 
    fontWeight: '500', 
    color: '#000000', 
    fontFamily: 'Poppins-Regular',
  
  },
  seeAll: { 
    fontSize: 24, 
    color: '#808080', 
    fontWeight: '400', 
    fontFamily: 'Poppins-Regular',
  
  },
  row: { 
    justifyContent: 'space-between',
    paddingHorizontal: 0, 
    marginBottom: 20, 
  },
  listContent: { paddingBottom: 50 },
  gridItemWrapper: { 
    width: '32.5%', 
    marginBottom: 15,
    marginHorizontal: 0,
    borderRadius: 26,
  } as ViewStyle, 
  
});

export default HomeScreen;