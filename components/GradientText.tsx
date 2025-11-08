// /components/GradientText.tsx

import React from 'react';
import { View, StyleSheet, TextProps } from 'react-native';
// Import SVG components instead of linear-gradient
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

// Define the type for the coordinates
interface Coordinates {
    x: number;
    y: number;
}

// 1. DEFINE PROPS CORRECTLY, INCLUDING START AND END
interface GradientTextProps extends TextProps {
  colors: string[];
  style: any; 
  start?: Coordinates; // <-- FIXED: Now correctly defined in the interface
  end?: Coordinates;   // <-- FIXED: Now correctly defined in the interface
}

const GradientText: React.FC<GradientTextProps> = ({ 
  colors, 
  start = { x: 0, y: 0 }, 
  end = { x: 1, y: 0 },   
  style, 
  children,
  ...rest 
}) => {
  // Calculate and Destructure Styles
  const flatStyle = StyleSheet.flatten(style) || {};
  // Extract specific font properties required by SvgText
  const { fontSize, fontWeight, fontFamily, ...otherStyles } = flatStyle;
  
  const textContent = String(children);
  // Estimate length is still needed for View sizing
  const textLengthEstimate = textContent.length * (fontSize * 0.65 || 10); 

  const gradientId = 'gradientId';

  return (
    <View style={[styles.container, { width: textLengthEstimate, height: fontSize * 1.3 || 20 }]}>
      <Svg height="100%" width="100%">
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={colors[0]} />
            <Stop offset="100%" stopColor={colors[1] || colors[0]} />
          </LinearGradient>
        </Defs>

        <SvgText
          {...rest}
          // Pass SVG-specific font properties directly
          fill={`url(#${gradientId})`} 
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          
          x="0" 
          y={fontSize} // Position text baseline correctly
        >
          {children}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    overflow: 'visible',
  },
});

export default GradientText;