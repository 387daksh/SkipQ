import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { GAME_UI, SPACING, COLORS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface GameInputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const GameInput = ({
    label,
    error,
    containerStyle,
    leftIcon,
    rightIcon,
    onFocus,
    onBlur,
    style,
    ...props
}: GameInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const { theme, isDark } = useTheme();

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const containerAnimatedStyle = useAnimatedStyle(() => {
        return {
            borderColor: withTiming(error ? COLORS.error : isFocused ? theme.primary : theme.ink, { duration: 200 }),
            borderWidth: withTiming(isFocused ? 2.5 : 2, { duration: 200 }),
            transform: [{ translateY: withTiming(isFocused ? -2 : 0, { duration: 200 }) }]
        };
    });

    return (
        <View style={[styles.wrapper, containerStyle]}>
            {label && <Text style={[styles.label, { color: theme.ink }]}>{label}</Text>}
            
            <Animated.View style={[
                styles.inputContainer, 
                { backgroundColor: isDark ? '#1E1E1E' : GAME_UI.white },
                containerAnimatedStyle
            ]}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                
                <TextInput
                    style={[styles.input, { color: theme.ink }, style]}
                    placeholderTextColor={isDark ? '#666' : COLORS.textMuted}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    selectionColor={theme.primary}
                    {...props}
                />

                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </Animated.View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: SPACING.m,
    },
    label: {
        fontSize: 14,
        fontWeight: '800',
        color: GAME_UI.ink,
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GAME_UI.white,
        borderRadius: 12,
        minHeight: 50,
        overflow: 'hidden', // Clip corners
        ...GAME_UI.shadows.sm, // Hard shadow for inputs too
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: GAME_UI.ink,
        fontWeight: '600',
    },
    leftIcon: {
        paddingLeft: 16, // Reduced padding to keep content aligned
    },
    rightIcon: {
        paddingRight: 16,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 12,
        fontWeight: '700',
        marginTop: 4,
    }
});
