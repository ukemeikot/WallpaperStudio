import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import HeaderBar from '../components/HeaderBar';
import ToggleSwitch from '../components/ToggleSwitch';
import SettingsPicker from '../components/SettingsPicker'; 
import GradientText from '../components/GradientText'; 

type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

const qualityOptions = [
    { label: 'High (Best Quality)', value: 'high' },
    { label: 'Medium (Standard)', value: 'medium' },
    { label: 'Low (Fastest Load)', value: 'low' },
];

const getPhoneMockupSource = () => {
    return require('../assets/icons/phone.png'); 
};


const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const [imageQuality, setImageQuality] = useState('high');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    
    const headerProps = {
        navigation: navigation,
        activeRoute: "Settings" as keyof RootStackParamList,
    };

    return (
        <View style={styles.container}>
            
            <HeaderBar {...headerProps} />

            <ScrollView style={styles.scrollArea}>
                <View style={styles.contentWrapper}>
                    
                    {/* Header Text */}
                    <GradientText 
                        colors={['#FBB03B', '#EC0C43']} 
                        style={styles.mainTitle}
                        start={{ x: 0, y: 0 }} 
                        end={{ x: 1, y: 0 }} 
                    >
                        Settings
                    </GradientText>
                    <Text style={styles.description}>Customize your Wallpaper Studio experience</Text>

                    {/* MAIN UNIFORM CONTAINER */}
                    <View style={styles.uniformSetupContainer}>
                        
                        {/* A. LEFT PANEL: Settings Configuration */}
                        <View style={styles.leftPanel}>
                            <Text style={styles.setupTitle}>Wallpaper Setup</Text>
                            <Text style={styles.setupSubtitle}>Configure your wallpaper settings and enable auto-rotation</Text>

                            {/* Image Quality Picker */}
                            <View style={styles.settingItemWrapper}>
                                <SettingsPicker
                                    label="Image Quality"
                                    options={qualityOptions}
                                    selectedValue={imageQuality}
                                    onValueChange={setImageQuality}
                                />
                            </View>
                            
                            {/* Notification Toggle */}
                            <View style={styles.settingItemWrapper}>
                                <ToggleSwitch
                                    label="Notification"
                                    description="Get notified about new wallpapers and updates"
                                    value={notificationsEnabled}
                                    onValueChange={setNotificationsEnabled}
                                />
                            </View>
                            
                            {/* Empty space filler to push footer down */}
                            <View style={{ flex: 1 }} /> 
                            
                            {/* Action Buttons */}
                            <View style={styles.actionButtons}>
                                <Pressable style={styles.cancelButton}>
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </Pressable>
                                {/* The Save Button is now a standard Pressable with solid color */}
                                <Pressable style={styles.saveButton}>
                                    <Text style={styles.saveButtonText}>Save Settings</Text>
                                </Pressable>
                            </View>
                        </View>
                        
                        {/* B. RIGHT PANEL: Custom Phone Image */}
                        <View style={styles.rightPanel}>
                            <Image 
                                source={getPhoneMockupSource()} 
                                style={styles.phoneImageFrame}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, 
        paddingHorizontal: 0, 
        paddingTop: 0, 
        backgroundColor: '#F7F7F7' 
    },
    scrollArea: { flex: 1 },
    contentWrapper: {
        paddingHorizontal: 30,
        paddingTop: 10,
        paddingBottom: 50,
    },
    mainTitle: { 
        fontSize: 60, 
        fontWeight: '500', 
        fontFamily: 'false', 
        marginBottom: 5, 
    },
    description: { 
      fontSize: 24, 
      color: '#575757', 
      marginBottom: 30, 
      fontFamily : 'Poppins-Regular',
      fontWeight: '400',
    },

    // --- MAIN UNIFORM CONTAINER ---
    uniformSetupContainer: {
        width: 1343.04,
        height: 628,
        flexDirection: 'row',
        borderColor: '##0000001A',
        backgroundColor: '#FFFFFF', 
        borderRadius: 36,
        padding: 30, 
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        minHeight: 500, 
        maxWidth: 1000, 
        alignSelf: 'center',
    },
    // --- LEFT PANEL (Settings) ---
    leftPanel: { flex: 2, 
        paddingRight: 40, 
        justifyContent: 'space-between', 
    },
    setupTitle: { 
      fontSize: 24, 
      fontWeight: '500', 
      color: '#000000', 
      fontFamily: 'Poppins-Regular',
    },
    setupSubtitle: { 
      fontSize: 14, 
      color: '#000000', 
      marginBottom: 20, 
      fontFamily: 'Poppins-Regular',
      fontWeight: '400',
    },
    settingItemWrapper: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20, 
        marginVertical: 10, 
        borderWidth: 1, 
        borderColor: '#0000001A',
    },
    // --- Right Panel (Phone Mockup) ---
    rightPanel: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    phoneImageFrame: { 
        width: 258.04, 
        height: 524.99, 
        resizeMode: 'contain',

    },
    
    // --- Actions ---
    actionButtons: {
        flexDirection: 'row', 
        justifyContent: 'center',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        marginTop: 20,
    },
    cancelButton: { 
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        marginRight: 10, 
        color: '#F8F8F8',
        borderColor: '#DFDFDF',
    },
    cancelButtonText: { 
        color: '#000000', 
        fontSize: 14, 
        fontWeight: '500', 
        fontFamily: 'Poppins-Regular',
    },
    
    saveButton: { 
        backgroundColor: '#FFBB00',
        borderRadius: 21, 
        paddingVertical: 10, 
        paddingHorizontal: 20,

    },
    saveButtonText: { 
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Poppins-Regular',
    },
});

export default SettingsScreen;