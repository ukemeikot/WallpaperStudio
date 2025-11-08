// /components/RadioButton.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RadioProps {
    label: string;
    description: string;
    value: string;
    selectedValue: string;
    onSelect: (value: string) => void;
}

const RadioButton: React.FC<RadioProps> = ({ label, description, value, selectedValue, onSelect }) => {
    const isSelected = value === selectedValue;
    return (
        <Pressable style={styles.radioRow} onPress={() => onSelect(value)}>
            <View style={styles.textColumn}>
                <Text style={[styles.label, isSelected && styles.labelSelected]}>{label}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.indicatorContainer}>
                <View style={[styles.outerCircle, isSelected && styles.outerCircleSelected]}>
                    {isSelected && <View style={styles.innerCircle} />}
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    radioRow: {
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
    labelSelected: {
        color: '#FF6600',
    },
    description: {
        fontSize: 12,
        color: '#999',
        marginTop: 3,
    },
    indicatorContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerCircleSelected: {
        borderColor: '#FF6600', // Orange border when selected
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF6600',
    },
});
export default RadioButton;