import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle, StyleProp, ImageSourcePropType } from 'react-native';
import Animated from 'react-native-reanimated';
import { useGamePress } from '../../hooks/useGameAnimations';
import { GAME_UI, SPACING } from '../../constants/theme';
import { Image } from 'expo-image';
import { useTheme } from '../../context/ThemeContext';

interface GameCardProps {
    children: React.ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    variant?: 'default' | 'flat' | 'elevated';
    image?: string | ImageSourcePropType;
    imageHeight?: number;
    disabled?: boolean;
}

export const GameCard = ({
    children,
    onPress,
    style,
    variant = 'default',
    image,
    imageHeight = 150,
    disabled = false
}: GameCardProps) => {
    const { theme, isDark } = useTheme();
    // Only use animation hooks if onPress is provided
    const { animatedStyle, handlePressIn, handlePressOut, triggerHaptic } = useGamePress(0.98);
    const isInteractive = !!onPress;

    const Wrapper = isInteractive ? Animated.View : View;

    const handlePress = () => {
        if (!onPress || disabled) return;
        triggerHaptic();
        onPress();
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'default':
                return {
                    ...GAME_UI.shadows.md,
                    backgroundColor: theme.card,
                    borderColor: theme.ink,
                    borderWidth: 2,
                    shadowColor: theme.shadows.md.shadowColor,
                    shadowOpacity: theme.shadows.md.shadowOpacity
                };
            case 'elevated':
                return {
                    ...GAME_UI.shadows.button,
                    backgroundColor: theme.card,
                    borderColor: theme.ink,
                    borderWidth: 2,
                     shadowColor: theme.shadows.button.shadowColor,
                     shadowOpacity: theme.shadows.button.shadowOpacity
                };
            case 'flat':
                return {
                    backgroundColor: theme.card,
                    borderColor: isDark ? '#333' : '#eee',
                    borderWidth: 1,
                };
            default:
                return {};
        }
    };

    return (
        <Wrapper style={[styles.wrapper, isInteractive && animatedStyle, style]}>
            <Pressable
                onPress={handlePress}
                onPressIn={isInteractive ? handlePressIn : undefined}
                onPressOut={isInteractive ? handlePressOut : undefined}
                disabled={!isInteractive || disabled}
                style={[
                    styles.container,
                    getVariantStyles(),
                ]}
            >
                {image && (
                    <View style={[styles.imageContainer, { height: imageHeight }]}>
                        <Image
                            source={typeof image === 'string' ? { uri: image } : image}
                            style={styles.image}
                            contentFit="cover"
                            transition={200}
                        />
                    </View>
                )}
                <View style={styles.content}>
                    {children}
                </View>
            </Pressable>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: SPACING.m,
    },
    container: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        backgroundColor: 'transparent', // Transparent to support PNGs
        borderBottomWidth: 2,
        borderColor: GAME_UI.ink,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: SPACING.m,
    }
});
