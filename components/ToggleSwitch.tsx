
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

interface ToggleProps {
    label: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
    description: string;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ label, value, onValueChange, description }) => (
    <View style={styles.toggleRow}>
        <View style={styles.textColumn}>
            <Text style={styles.label}>{label}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
        </View>
        <Switch 
           
            trackColor={{ false: '#E0E0E0', true: '#34A853' }} 
            thumbColor={value ? '#FBB03B' : '#F4F3F4'}
            onValueChange={onValueChange}
            value={value}
        />
    </View>
);

const styles = StyleSheet.create({
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    textColumn: {
        flex: 1,
        paddingRight: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    description: {
        fontSize: 12,
        color: '#999',
        marginTop: 3,
    }
});
export default ToggleSwitch;