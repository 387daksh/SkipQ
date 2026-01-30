import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';
import { useGamePress } from '../../hooks/useGameAnimations';
import { COLORS, GAME_UI, SPACING } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface GameButtonProps {
    title?: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
}

import { useTheme } from '../../context/ThemeContext';

export const GameButton = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    style,
    textStyle,
    leftIcon,
    rightIcon,
    children
}: GameButtonProps) => {
    const { animatedStyle, handlePressIn, handlePressOut, triggerHaptic } = useGamePress(0.96);
    const { theme, isDark } = useTheme();

    const handlePress = () => {
        if (disabled || loading) return;
        triggerHaptic();
        onPress();
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    ...theme.shadows.button,
                    backgroundColor: theme.primaryBtn,
                    borderColor: theme.ink,
                    borderWidth: 2,
                };
            case 'secondary':
                return {
                    ...theme.shadows.sm,
                    backgroundColor: theme.secondary,
                    borderColor: theme.ink,
                    borderWidth: 2,
                };
            case 'outline':
                return {
                    ...theme.shadows.sm,
                    backgroundColor: isDark ? 'transparent' : theme.white,
                    borderColor: theme.ink,
                    borderWidth: 2,
                };
            case 'danger':
                return {
                    ...theme.shadows?.button || {},
                    backgroundColor: theme.danger || '#EF4444',
                    borderColor: theme.ink,
                    borderWidth: 2,
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    elevation: 0,
                };
            default:
                return {};
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 };
            case 'md':
                return { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 };
            case 'lg':
                return { paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 };
            default:
                return {};
        }
    };

    const getTextColor = () => {
        if (variant === 'primary' || variant === 'danger') return isDark ? '#111' : theme.white; // Primary text usually white, or black on yellow?
        // Check theme.ts: primaryBtn is Orange/Yellow. Text should be Black for contrast usually.
        // Assuming GAME_UI.white meant Text Color.
        // Let's stick to theme.ink if variant is Outline.
        if (variant === 'outline') return theme.ink;
        return theme.ink;
    };

    return (
        <Animated.View style={[animatedStyle, style]}>
            <Pressable
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                style={[
                    styles.base,
                    getVariantStyles(),
                    getSizeStyles(),
                    disabled && styles.disabled,
                ]}
            >
                {loading ? (
                    <ActivityIndicator color={getTextColor()} />
                ) : (
                    <>
                        {leftIcon && <Animated.View style={{ marginRight: 8 }}>{leftIcon}</Animated.View>}
                        {children || (
                            <Text style={[
                                styles.text,
                                { color: getTextColor(), fontSize: size === 'sm' ? 12 : size === 'lg' ? 18 : 16 },
                                textStyle
                            ]}>
                                {title}
                            </Text>
                        )}
                        {rightIcon && <Animated.View style={{ marginLeft: 8 }}>{rightIcon}</Animated.View>}
                    </>
                )}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    disabled: {
        opacity: 0.5,
    }
});
