
import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, FlatList, Pressable, ViewStyle, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import HeaderBar, { HeaderBarProps } from '../components/HeaderBar'; 
import CategoryCard from '../components/CategoryCard'; 
import GradientText from '../components/GradientText'; 
import { categories } from '../data/categories';
import { Category } from '../types/types'; 
import { useWallpaperSetter } from '../context/WallpaperContext';

type BrowseScreenProps = StackScreenProps<RootStackParamList, 'Browse'>;


// Helper component to render the item wrapper 
const ItemWrapper: React.FC<{ item: Category, isGridView: boolean, onPress: (id: string) => void }> = ({ item, isGridView, onPress }) => {
    return (
        <View style={isGridView ? styles.gridItemWrapper : styles.listItemWrapper}>
            <CategoryCard 
                item={item} 
                onPress={onPress} 
                isActive={false}
                isListView={!isGridView} // Pass the list view flag
            />
        </View>
    );
};

// --- NEW HELPER FUNCTION TO GET TOGGLE ICONS 
const getToggleIconSource = (isGrid: boolean, isFocused: boolean) => {
    if (isGrid) {
        return require('../assets/icons/Vector.png'); 
    } else {
        return require('../assets/icons/Vector-2.png'); 
    }
};

// --- NEW COMPONENT: SEPARATOR ---
const ListSeparator: React.FC = () => <View style={styles.separator} />;


const BrowseScreen: React.FC<BrowseScreenProps> = ({ route, navigation }) => {
    const [isGridView, setIsGridView] = useState(true);
    const { onSetWallpaper } = useWallpaperSetter(); // Use context hook

    const handleCategoryPress = (categoryId: string) => {
        // Pass the categoryId. onSetWallpaper is now available globally, 
        // so we don't need the old routing hack.
        navigation.navigate('CategoryDetail', { 
            categoryId: categoryId, 
        });
    };
    
    const headerProps: HeaderBarProps = {
        navigation: navigation,
        activeRoute: "Browse",
    };

    return (
        <ScrollView style={styles.container}>
            
            <HeaderBar {...headerProps} />

            <View style={styles.headerArea}>
                <View style={styles.titleContainer}>
                    <GradientText 
                        colors={['#FBB03B', '#EC0C43']} 
                        style={styles.mainTitle}
                        start={{ x: 0, y: 0 }} 
                        end={{ x: 1, y: 0 }} 
                    >
                        Browse Categories
                    </GradientText>
                    <Text style={styles.description}>Explore our curated collections of stunning wallpapers</Text>
                </View>
                
                {/* View Toggle Icons */}
                <View style={styles.viewToggle}>
                    <Pressable onPress={() => setIsGridView(true)} style={[styles.iconButton, isGridView && styles.activeIconBackground]}>
                        <Image 
                            source={getToggleIconSource(true, isGridView)} 
                            style={[styles.toggleIconImage, { tintColor: isGridView ? '#333' : '#999' }]}
                        />
                    </Pressable>
                    <Pressable onPress={() => setIsGridView(false)} style={[styles.iconButton, !isGridView && styles.activeIconBackground]}>
                        <Image 
                            source={getToggleIconSource(false, !isGridView)} 
                            style={[styles.toggleIconImage, { tintColor: !isGridView ? '#333' : '#999' }]}
                        />
                    </Pressable>
                </View>
            </View>
            
            {/* 4. Categories List */}
            <FlatList
                data={categories}
                keyExtractor={item => item.id}
                key={isGridView ? 'GRID' : 'LIST'} 
                numColumns={isGridView ? 3 : 1} 
                renderItem={({ item }) => (
                    <ItemWrapper item={item} isGridView={isGridView} onPress={handleCategoryPress} />
                )}
                
                //Only conditionally apply columnWrapperStyle for the Grid View
                {...(isGridView && { columnWrapperStyle: styles.row })}
                
                contentContainerStyle={styles.listContent}
                scrollEnabled={false}
                ItemSeparatorComponent={isGridView ? null : ListSeparator}
            />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingTop: 0,
        backgroundColor: '#F7F7F7', 
    },
    // --- Header Section Styles ---
    headerArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 30, 
        marginBottom: 30,
    },
    titleContainer: {
        flex: 1,
        paddingRight: 20,
    },
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
        fontWeight: '400',
    },
    // --- View Toggle Styles ---
    viewToggle: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#F7F7F7',
        alignSelf: 'center',
    },
    iconButton: {
        paddingHorizontal: 8,
        paddingVertical: 6.53,
        borderRadius: 5,
    },
    activeIconBackground: {
        backgroundColor: '#EC9E0C',
    },
    toggleIconImage: { 
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    // --- FlatList Styles ---
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 30, 
        marginBottom: 20,
    },
    listContent: {
        paddingBottom: 50,
    },
    // --- SEPARATOR STYLE ---
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 30, 
    },
    // --- ITEM WRAPPER STYLES ---
    gridItemWrapper: {
        width: '32.333%', 
        marginBottom: 15,
        marginHorizontal: 0, 
    } as ViewStyle, 

    listItemWrapper: {
        marginHorizontal: 30, 
        paddingVertical: 10,
        height: 120, 
    } as ViewStyle,
});

export default BrowseScreen;