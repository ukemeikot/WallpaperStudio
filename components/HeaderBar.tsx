// /components/HeaderBar.tsx (Updated for Logo and Spacing)
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// --- Imports needed for the gradient text simulation ---
import Icon from 'react-native-vector-icons/Ionicons'; 
// -------------------------------------------------------

// --- LOGO IMAGE HELPER ---
const getLogoSource = () => {
    // IMPORTANT: Ensure the path to your logo image is correct.
    return require('../assets/icons/logoicon.png'); 
};
// -------------------------

export interface HeaderBarProps {
    navigation: StackScreenProps<RootStackParamList, keyof RootStackParamList>['navigation'];
    activeRoute: keyof RootStackParamList; 
} 

// Helper component for individual navigation buttons
const NavIcon: React.FC<{ route: keyof RootStackParamList, navigation: any, activeRoute: keyof RootStackParamList }> = ({ route, navigation, activeRoute }) => {
    const isFocused = activeRoute === route;
    const color = isFocused ? '#333' : '#666'; 
    const iconSource = getIconSource(route); // Uses the logic from the previous response

    return (
        <Pressable 
            style={[
                styles.navButton,
                isFocused && styles.activeNavButton
            ]} 
            onPress={() => navigation.navigate(route)}
        >
            {/* Image Icon: Use tintColor to slightly adjust the image color based on state */}
            <Image 
                source={iconSource} 
                style={[styles.iconImage, { tintColor: color }]}
            />
            <Text style={[styles.navText, { color: color }]}>{route}</Text>
        </Pressable>
    );
};

// --- LOGIC FOR GETTING NAV ICONS (KEPT FROM PREVIOUS RESPONSE) ---
const getIconSource = (route: keyof RootStackParamList) => {
    switch (route) {
        case 'Home': return require('../assets/icons/home.png');
        case 'Browse': return require('../assets/icons/browseicon.png');
        case 'Favourites': return require('../assets/icons/Heart.png');
        case 'Settings': return require('../assets/icons/Settingsicon.png');
        default: return null;
    }
};

const HeaderBar: React.FC<HeaderBarProps> = ({ navigation, activeRoute }) => {
    return (
        <View style={styles.navBar}>
            
            {/* 1. Logo and Text Container */}
            <View style={styles.logoContainer}>
                <Image source={getLogoSource()} style={styles.logoImage} />
                <Text style={styles.logoText}>Wallpaper Studio</Text>
            </View>
            
            {/* 2. Navigation Icons Section */}
            <View style={styles.navIcons}>
                <NavIcon route="Home" navigation={navigation} activeRoute={activeRoute} />
                <NavIcon route="Browse" navigation={navigation} activeRoute={activeRoute} />
                <NavIcon route="Favourites" navigation={navigation} activeRoute={activeRoute} />
                <NavIcon route="Settings" navigation={navigation} activeRoute={activeRoute} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // --- Outer Container (Controls Padding and Spacing) ---
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // Increased padding to push content away from screen edge (if used at screen level)
        paddingVertical: 15, 
        // Note: The main screen's padding (30px) handles horizontal spacing
        marginBottom: 0, // Reset margin as spacing should be handled by the screen below the bar
        backgroundColor: '#FFFFFF', // White background for the header
    },
    // --- Logo Styles ---
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // Simulate the red/orange color using a text style (True gradient requires a library)
        // The logo icon should have a custom red/orange color
        paddingLeft: 20,
    },
    logoImage: {
        width: 20, 
        height: 20,
        marginRight: 8,
        tintColor: '#FF6600', // Apply the brand color to the icon (if it's a monochrome PNG)
        paddingLeft: 16, // Add left padding to separate from screen edge
    },
    logoText: {
        fontSize: 14, // Slightly smaller font for a balanced logo
        fontWeight: '400',
        color: '#000000', // Brand color for the text
        fontFamily: 'Poppins-Regular', // Ensure the font is applied
    },
    // --- Navigation Icons Section ---
    navIcons: {
        flexDirection: 'row',
        // We use flex-start/flex-end to push the elements to the right edge
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingRight: 16,
    },
    // --- Styles for the Icon Button ---
    navButton: {
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        // Remove margins that push buttons apart, let the padding handle spacing
        marginHorizontal: 0, 
    },
    activeNavButton: {
        backgroundColor: '#EAEAEA', 
    },
    iconImage: {
        width: 20,
        height: 20,
        marginRight: 6, 
    },
    navText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Poppins-Regular',
        color: '#000000',
    }
});

export default HeaderBar;