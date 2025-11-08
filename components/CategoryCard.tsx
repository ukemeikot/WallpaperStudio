// /components/CategoryCard.tsx (Final Fix for Props Assignment)

import React from 'react';
import { 
    View, 
    Text, 
    ImageBackground, 
    StyleSheet, 
    Pressable, 
    ViewStyle,
    Image 
} from 'react-native'; 
import { Category } from './../types/types';
import Icon from 'react-native-vector-icons/Ionicons'; 


interface CategoryCardProps {
    item: Category;
    isActive: boolean;
    onPress: (id: string) => void;
    isListView?: boolean; 
    style?: ViewStyle; 
}


const getImageSource = (imageName: string) => {
  switch (imageName) {
    case 'nature.png': return require('../assets/categories/nature.png');
    case 'abstract.png': return require('../assets/categories/abstract.png');
    case 'urban.png': return require('../assets/categories/urban.png');
    case 'space.png': return require('../assets/categories/space.png');
    case 'minimalist.png': return require('../assets/categories/minimalist.png');
    case 'animals.png': return require('../assets/categories/animals.png');
    default: return null;
  }
};


const CategoryCard: React.FC<CategoryCardProps> = ({ item, isActive, onPress, isListView = false, style }) => {
  const imageSource = getImageSource(item.imageName);


  const CountBlock = (
    <View style={isListView ? styles.countContainerListView : styles.countContainer}>
      <Text style={isListView ? styles.countTextListView : styles.countText} numberOfLines={1}>
        {item.count} wallpapers
      </Text>
    </View>
  );

  const TextBlock = (
    <View style={isListView ? styles.textContainerListView : styles.textContainer}>
    
        <Text style={isListView ? styles.titleListView : styles.title}>{item.title}</Text>
        

        <Text style={[styles.subtitle, isListView && styles.subtitleListView]}>{item.subtitle}</Text>
        

        <View style={isListView ? styles.countSpacerListView : styles.countSpacer}>
          {CountBlock}
        </View>
    </View>
  );

  const ActiveMark = (
    <View style={[styles.activeMark, { backgroundColor: item.color }]}>
        <Icon name="checkmark" size={16} color="white" />
    </View>
  );

  
  if (isListView) {
    return (
        <Pressable 
            style={[styles.card, styles.cardListView, style, isActive && { borderColor: item.color, borderWidth: 3 }]} 
            onPress={() => onPress(item.id)}
        >
        
            <View style={styles.imageContainerListView}>
                <ImageBackground 
                    source={imageSource} 
                    style={styles.thumbnailImage}
                    imageStyle={[styles.imageStyle, { resizeMode: 'cover' }]} 
                >
                    {isActive && ActiveMark}
                </ImageBackground>
            </View>


            {TextBlock}
        </Pressable>
    );
  }

 
  return (
    <Pressable 
        style={[styles.card, style, isActive && { borderColor: item.color, borderWidth: 3 }]} // <-- APPLY STYLE HERE
        onPress={() => onPress(item.id)}
    >
      <ImageBackground 
          source={imageSource} 
          style={styles.imageBackground} 
          imageStyle={[styles.imageStyle, { resizeMode: 'cover' }]} 
      >
        {isActive && ActiveMark}
        
        {TextBlock}
      </ImageBackground>
    </Pressable>
  );
};


const styles = StyleSheet.create({
    card: {
        flex: 1, 
        aspectRatio: 1.5, 
        borderRadius: 16,
        overflow: 'hidden',
        marginHorizontal: 0, 
    },
    // --- LIST VIEW STYLES ---
    cardListView: {
        flexDirection: 'row', 
        aspectRatio: undefined, 
        height: '100%',
        backgroundColor: 'white', 
    },
    imageBackground: { flex: 1, justifyContent: 'flex-end' },
    imageStyle: { borderRadius: 16 },
    imageContainerListView: { width: 150, height: '100%', overflow: 'hidden' },
    thumbnailImage: { height: '100%', width: '100%', justifyContent: 'flex-end' },
    
    // --- TEXT CONTAINER STYLES ---
    textContainer: { 
      padding: 10, 
      paddingBottom: 30, 
      paddingLeft: 25,  
    },
    textContainerListView: { 
      flex: 1, 
      justifyContent: 'center', 
      paddingLeft: 20, 
      paddingRight: 10, 
      backgroundColor: '#F7F7F7' 
    },
    
  
    title: { 
      color: '#FFFFFF', 
      fontWeight: '600', 
      fontSize: 24, 
      fontFamily: 'Poppins-Bold' 
    },
    titleListView: { 
      color: '#000000', 
      fontWeight: '500', 
      fontSize: 30, 
      fontFamily: 'Poppins-Regular', 
    },
    

    subtitle: { color: 'white', fontSize: 10, marginTop: 2, fontFamily: 'Poppins-Regular' },
    subtitleListView: { color: '#666', fontSize: 14, marginTop: 2, fontFamily: 'Poppins-Regular' }, // Dark color for list view
    

    countContainer: { backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 8, alignSelf: 'flex-start', marginTop: 10, paddingHorizontal: 12, paddingVertical: 3, overflow: 'visible', flexDirection: 'row' },
    countContainerListView: { backgroundColor: '#EAEAEA', borderRadius: 8, alignSelf: 'flex-start', marginTop: 10, paddingHorizontal: 10, paddingVertical: 5 },
    countText: { color: 'white', fontSize: 12, fontWeight: 'bold', marginRight: 2 },
    countTextListView: { color: '#333', fontSize: 12, fontWeight: 'bold' },
    

    countSpacer: { height: 30 }, 
    countSpacerListView: { marginTop: 10 },

    activeMark: { position: 'absolute', top: 10, right: 10, borderRadius: 100, padding: 2 }
});

export default CategoryCard;