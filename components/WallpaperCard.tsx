
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable, ViewStyle, Image } from 'react-native';
import { Wallpaper } from '../types/types';
import { useWallpaperSetter } from '../context/WallpaperContext'; // Context Hook

interface WallpaperCardProps {
    item: Wallpaper;
    isSelected: boolean;
    onPress: (id: string) => void;
    onToggleFavorite: (id: string) => void; 
    isListView?: boolean; 
}


const getFavIconSource = () => {
    return require('../assets/icons/Heart.png'); 
};

const getImageSource = (imageName: string) => {
    switch (imageName) {
        case 'nature_1.png': return require('../assets/wallpapers/nature_1.png');
        case 'nature_2.png': return require('../assets/wallpapers/nature_2.png');
        case 'nature_3.png': return require('../assets/wallpapers/nature_3.png');
        case 'nature_4.png': return require('../assets/wallpapers/nature_4.png');
        case 'nature_5.png': return require('../assets/wallpapers/nature_5.png');
        case 'nature_6.png': return require('../assets/wallpapers/nature_6.png');
        default: return null; 
    }
};

const WallpaperCard: React.FC<WallpaperCardProps> = ({ item, isSelected, onPress, onToggleFavorite, isListView = false }) => {
    
    const { onToggleFavorite: contextToggleFavorite, favoriteIds } = useWallpaperSetter();
    const itemIsFavorite = favoriteIds.includes(item.id); 

    const imageSource = getImageSource(item.imageName);


    const FavoriteMark = (
        // Calls the global toggle function when pressed
        <Pressable onPress={() => contextToggleFavorite(item.id)} style={styles.heartButton}>
            <Image 
                source={getFavIconSource()} 
                style={[
                    styles.customIconImage,
                    { tintColor: itemIsFavorite ? '#FF5555' : 'white' } 
                ]}
            />

        </Pressable>
    );

    const TextBlock = (
        <View style={isListView ? styles.textContainerListView : styles.textContainer}>
            <Text style={isListView ? styles.nameTextListView : styles.nameText}>{item.name}</Text>
            <Text style={isListView ? styles.categoryTextListView : styles.categoryText}>{item.category}</Text>
        </View>
    );


    if (isListView) {

        return (
            <Pressable 
                style={[styles.card, styles.cardListView, isSelected && styles.selectedCard]}
                onPress={() => onPress(item.id)}
            >

                <View style={styles.imageContainerListView}>
                    <ImageBackground source={imageSource} style={styles.thumbnailImage} imageStyle={styles.imageStyle}>
                        {FavoriteMark}
                    </ImageBackground>
                </View>


                {TextBlock}
            </Pressable>
        );
    }


    return (
        <Pressable 
            style={[styles.card, isSelected && styles.selectedCard]}
            onPress={() => onPress(item.id)}
        >
            <ImageBackground source={imageSource} style={styles.imageBackground} imageStyle={styles.imageStyle}>
                {FavoriteMark}
                {TextBlock}
            </ImageBackground>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    card: {
        flex: 1, 
        aspectRatio: 0.65, 
        marginHorizontal: 5,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'white', 
    },
    selectedCard: {
        borderWidth: 3,
        borderColor: '#F8F8F8', 
    },
    heartButton: { 
        alignSelf: 'flex-end', 
        padding: 8, 
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    customIconImage: { 
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },

    imageBackground: { 
        flex: 1, 
        justifyContent: 'space-between', 
        padding: 10, 
    },
    textContainer: { 
        alignSelf: 'flex-start', 
        backgroundColor: 'rgba(0,0,0,0.3)', 
        padding: 6, 
        borderRadius: 4, 
    },
    nameText: { 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 14 
    },
    categoryText: { 
        color: 'white', 
        fontSize: 12 
    },

    cardListView: { 
        flexDirection: 'row', 
        aspectRatio: undefined, 
        height: 100, 
        padding: 10, 
    },
    imageContainerListView: { 
        width: 60, 
        height: 80, 
        marginRight: 15, 
        borderRadius: 12, 
        overflow: 'hidden', 
    },
    thumbnailImage: { 
        height: '100%', 
        width: '100%', 
        justifyContent: 'flex-end', 
    },
    textContainerListView: { 
        flex: 1, 
        justifyContent: 'center', 
    },
    nameTextListView: { 
        color: '#333', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    categoryTextListView: { 
        color: '#666', 
        fontSize: 12 
    },

    imageStyle: { borderRadius: 16, resizeMode: 'cover', },
});

export default WallpaperCard;