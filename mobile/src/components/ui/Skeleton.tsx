import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { GAME_UI } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

import { DimensionValue } from 'react-native';

interface SkeletonProps {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
    width = '100%', 
    height = 20, 
    borderRadius = 4, 
    style 
}) => {
    const { isDark, theme } = useTheme();

    return (
        <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
                type: 'timing',
                duration: 1000,
                loop: true,
            }}
            style={[
                styles.skeleton, 
                { 
                    width, 
                    height, 
                    borderRadius,
                    backgroundColor: isDark ? '#333333' : '#E2E8F0',
                    borderColor: theme.ink
                }, 
                style
            ]}
        />
    );
};

const styles = StyleSheet.create({
    skeleton: {
        borderWidth: 2,
    }
});
