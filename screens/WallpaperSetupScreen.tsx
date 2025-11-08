
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, NativeModules, Alert } from 'react-native';
import RadioButton from '../components/RadioButton'; 
import ToggleSwitch from '../components/ToggleSwitch'; 
import { useWallpaperSetter } from '../context/WallpaperContext'; 

const { WallpaperManager } = NativeModules;

interface SetupScreenProps {
    wallpaperId: string;
    onClose: (success: boolean) => void; 
}

const displayModes = [
  { value: 'fit', label: 'Fit', description: 'Scale to fit without cropping' },
  { value: 'fill', label: 'Fill', description: 'Scale to fill the entire screen' },
  { value: 'stretch', label: 'Stretch', description: 'Stretch to fill the screen' },
  { value: 'tile', label: 'Tile', description: 'Repeat the image to fill the screen' },
];

const WallpaperSetupScreen: React.FC<SetupScreenProps> = ({ wallpaperId, onClose }) => {
  const { onSetWallpaper } = useWallpaperSetter(); 

  const [displayMode, setDisplayMode] = useState('fit');
  const [autoRotation, setAutoRotation] = useState(false);
  const [lockWallpaper, setLockWallpaper] = useState(false);
  const [syncDevices, setSyncDevices] = useState(false);
  const [isActive, setIsActive] = useState(true); 

  const handleSaveAndSet = async () => {
    const mockCategory = 'nature';
    onSetWallpaper(wallpaperId, mockCategory); 
    
    Alert.alert("Setup Complete", `Settings saved for Wallpaper ID: ${wallpaperId}.`);
    
    onClose(true); 
  };

  return (
    <View style={styles.setupPanel}>
        <Text style={styles.header}>Wallpaper Setup</Text>
        <Text style={styles.subHeader}>Configure your wallpaper settings and enable auto-rotation</Text>

        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          
          {/* Section: Activate Wallpaper */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activate Wallpaper</Text>
            <View style={styles.activateRow}>
              <Text style={styles.activateDesc}>Set the selected wallpaper as your desktop background</Text>
              <View style={[styles.activatedPill, styles.activePill]}>
                <Text style={styles.pillText}>Activated</Text>
              </View>
            </View>
          </View>

          {/* Section: Display Mode (Radio Buttons) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Display mode</Text>
            {displayModes.map((mode) => (
              <RadioButton
                key={mode.value}
                value={mode.value}
                selectedValue={displayMode}
                onSelect={setDisplayMode}
                label={mode.label}
                description={mode.description}
              />
            ))}
          </View>

          {/* Section: Auto-Rotation (Toggle) */}
          <View style={styles.section}>
            <ToggleSwitch
              label="Auto - Rotation"
              description="Automatically change your wallpaper at regular intervals"
              value={autoRotation}
              onValueChange={setAutoRotation}
            />
          </View>
          
          {/* Section: Advanced Settings (Toggles) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Advanced Settings</Text>
            <ToggleSwitch
              label="Lock Wallpaper"
              description="Prevents accidental changes"
              value={lockWallpaper}
              onValueChange={setLockWallpaper}
            />
            <ToggleSwitch
              label="Sync Across Devices"
              description="Keep wallpaper consistent on all devices"
              value={syncDevices}
              onValueChange={setSyncDevices}
            />
          </View>

        </ScrollView>
        
        {/* Footer Actions */}
        <View style={styles.footer}>
          <Pressable onPress={() => onClose(false)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable onPress={handleSaveAndSet} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    setupPanel: {
        width: 600, 
        height: '100%', 
        backgroundColor: 'white',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0, 
        padding: 30,
    },
    header: { 
      fontSize: 24, 
      fontWeight: '500', 
      color: '#000000', 
      marginBottom: 10,
      fontFamily: 'Poppins-Black',
    },
    subHeader: { 
      fontSize: 14, 
      color: '#000000', 
      marginBottom: 20,
      fontFamily: 'Poppins-Regular',
    },
    scrollArea: { 
      flex: 1, 
      paddingRight: 5, 
    }, 
    section: { 
      marginBottom: 20,
    },
    sectionTitle: { 
      fontSize: 20, 
      fontWeight: '500', 
      color: '#000000', 
      marginBottom: 15, 
      marginTop: 15, 
    },
    activateRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: 10 
    },
    activateDesc: { 
      fontSize: 14, 
      color: '#666', 
      flex: 1, 
      paddingRight: 10 
    },
    activatedPill: { 
      paddingHorizontal: 12, 
      paddingVertical: 5, 
      borderRadius: 15, 
    },
    activePill: { backgroundColor: '#34A853' }, 
    pillText: { 
      color: 'white', 
      fontSize: 12, 
      fontWeight: 'bold' 
    },
    footer: { 
      flexDirection: 'row', 
      justifyContent: 'flex-end', 
      paddingTop: 20, 
      borderTopWidth: 1, 
      borderTopColor: '#F0F0F0' 
    },
    cancelButton: { 
      padding: 10, 
      marginRight: 15 
    },
    cancelButtonText: { 
      fontSize: 16, 
      color: '#666' 
    },
    saveButton: { 
      backgroundColor: '#FF6600', 
      paddingHorizontal: 20, 
      paddingVertical: 10, 
      borderRadius: 8 
    },
    saveButtonText: { 
      fontSize: 16, 
      color: 'white', 
      fontWeight: 'bold' 
    },
});

export default WallpaperSetupScreen;