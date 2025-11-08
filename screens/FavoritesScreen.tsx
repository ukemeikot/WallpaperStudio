
import React from 'react';
import { ScrollView, Text, View, StyleSheet, FlatList, Pressable, ViewStyle, ListRenderItemInfo, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import HeaderBar, { HeaderBarProps } from '../components/HeaderBar'; 
import WallpaperCard from '../components/WallpaperCard';
import GradientText from '../components/GradientText'; 
import { Wallpaper } from '../types/types'; 
import { getFavoriteWallpapers } from '../data/wallpapers';
import { useWallpaperSetter } from '../context/WallpaperContext'; 

type FavoritesScreenProps = StackScreenProps<RootStackParamList, 'Favourites'>;

// --- NEW HELPER FUNCTION FOR EMPTY STATE IMAGE ---
const getNoSavedIconSource = () => {
    return require('../assets/icons/nosaved.png'); 
};

// Helper component to render the wallpaper item wrapper
const ItemWrapper: React.FC<{ item: Wallpaper, onPress: (id: string) => void }> = ({ item, onPress }) => {
    return (
        <View style={styles.wallpaperGridItem}>
            <WallpaperCard 
                item={item} 
                onPress={onPress} 
                onToggleFavorite={() => {}} 
                isSelected={false} 
            />
        </View>
    );
};


// --- Empty State Component ---
const EmptyFavoritesState: React.FC<{ navigation: any }> = ({ navigation }) => (
    <View style={styles.emptyContainer}>
        
        <Image 
            source={getNoSavedIconSource()} 
            style={styles.emptyStateImage} 
        />
        
        <Text style={styles.emptyTitle}>No Saved Wallpapers</Text>
        <Text style={styles.emptySubtitle}>Start saving your favorite wallpapers to see them here</Text>

        {/* Missing Line of Text */}
        <Text style={styles.missingText}>Browse the latest wallpapers now!</Text> 

        <Pressable 
            style={styles.browseButton} 
            onPress={() => navigation.navigate('Browse')}
        >
            <Text style={styles.browseButtonText}>Browse Wallpapers</Text>
        </Pressable>
    </View>
);


const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
    const { favoriteIds } = useWallpaperSetter();
    const favoriteWallpapers = getFavoriteWallpapers(favoriteIds);

    // Handler to navigate to detail/setup when a card is clicked
    const handleWallpaperPress = (id: string) => {
        navigation.navigate('CategoryDetail', { 
            categoryId: favoriteWallpapers.find(w => w.id === id)?.category || 'nature',
            wallpaperId: id,
        });
    };

    const headerProps: HeaderBarProps = {
        navigation: navigation,
        activeRoute: "Favourites",
    };

    // The component structure is now UNCONDITIONAL, wrapping the whole view in ScrollView.
    return (
        <ScrollView style={styles.container}>
            
            <HeaderBar {...headerProps} />

            <View style={styles.contentWrapper}>
                
                {/* 1. TITLE SECTION (UNCONDITIONAL) */}
                <View style={styles.titleSection}>
                    <GradientText 
                        colors={['#FF6600', '#EC0C43']} 
                        style={styles.mainTitle}
                        start={{ x: 0, y: 0 }} 
                        end={{ x: 1, y: 0 }} 
                    >
                        Saved Wallpapers
                    </GradientText>
                    <Text style={styles.description}>Your saved wallpapers collection</Text>
                </View>

                
                {/* 2. CONDITIONAL CONTENT (List or Empty State) */}
                {favoriteWallpapers.length === 0 ? (
                    
                    // Render Empty State when no favorites are present
                    <EmptyFavoritesState navigation={navigation} />
                    
                ) : (
                    
                    // Render Populated Grid View (6 Columns)
                    <FlatList
                        data={favoriteWallpapers}
                        keyExtractor={item => item.id}
                        numColumns={6} 
                        
                        renderItem={({ item }: ListRenderItemInfo<Wallpaper>) => (
                            <View style={styles.wallpaperGridItem}>
                                <WallpaperCard 
                                    item={item} 
                                    onPress={handleWallpaperPress}
                                    onToggleFavorite={() => {}} 
                                    isSelected={false} 
                                />
                            </View>
                        )}
                        
                        columnWrapperStyle={styles.row} 
                        contentContainerStyle={styles.listContent}
                        scrollEnabled={false} 
                    />
                )}
            </View>
        </ScrollView>
    );
};

// --- STYLES ---
const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 0, paddingTop: 0, backgroundColor: '#F7F7F7' },
    contentWrapper: { paddingHorizontal: 30, paddingTop: 30, flex: 1, },
    
    // Title Section remains static
    titleSection: { marginBottom: 30 },
    mainTitle: { 
      fontSize: 60, 
      fontWeight: '500',
      fontFamily: 'false', 
      marginBottom: 10, 
    },
    description: { 
      fontSize: 24, 
      color: '#575757',
      fontFamily: 'Poppins-Regular',
    
    },
    
    // --- Empty State Styles (Used by EmptyFavoritesState component) ---
    emptyContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingVertical: 100,
    },
    emptyStateImage: { 
        width: 150, 
        height: 150, 
        marginBottom: 20, 
        resizeMode: 'contain',
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '500',
        color: '#575757',
        marginBottom: 5,
        fontFamily: 'Poppins-Regular',
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#575757',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
    },
    missingText: { 
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 30, 
    },
    browseButton: {
        backgroundColor: '#FBB03B', 
        borderRadius: 21,
        paddingHorizontal: 30,
        paddingVertical: 12,
    },
    browseButtonText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    // --- Grid Styles ---
    row: { 
        justifyContent: 'space-between',
        paddingHorizontal: 0, 
        marginBottom: 20, 
    },
    listContent: { paddingBottom: 50 },
    wallpaperGridItem: { 
        width: '15%', 
        marginBottom: 15,
        marginHorizontal: 0,
    } as ViewStyle,
});

export default FavoritesScreen;