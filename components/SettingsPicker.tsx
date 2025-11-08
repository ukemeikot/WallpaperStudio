// /components/SettingsPicker.tsx (NEW FILE)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PickerProps {
    label: string;
    options: { label: string, value: string }[];
    selectedValue: string;
    onValueChange: (value: string) => void;
}

const SettingsPicker: React.FC<PickerProps> = ({ label, options, selectedValue, onValueChange }) => {

    const displayLabel = options.find(o => o.value === selectedValue)?.label || 'Select...';

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.pickerBox}>
                <Text style={styles.pickerText}>{displayLabel}</Text>
                {/* Placeholder Down Arrow Icon */}
                <Text style={styles.icon}>▼</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    pickerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: 'white',
    },
    pickerText: {
        fontSize: 14,
        color: '#9C9C9C',
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
    },
    icon: {
        fontSize: 12,
        color: '#999',
    }
});
export default SettingsPicker;