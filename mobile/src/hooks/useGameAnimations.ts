import { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';

export const useGamePress = (scaleMin = 0.96) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    const handlePressIn = useCallback(() => {
        scale.value = withSpring(scaleMin, { damping: 10, stiffness: 300 });
    }, [scaleMin]);

    const handlePressOut = useCallback(() => {
        scale.value = withSpring(1, { damping: 10, stiffness: 300 });
    }, []);

    const triggerHaptic = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, []);

    return {
        animatedStyle,
        handlePressIn,
        handlePressOut,
        triggerHaptic
    };
};
