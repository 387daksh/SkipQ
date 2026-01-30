import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    StatusBar,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withSequence,
    withTiming,
    FadeIn,
    FadeInDown,
    FadeInUp,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GAME_UI, SPACING, RADIUS, COLORS } from '@/constants/theme';
import { AuthBottomSheet } from '@/components/auth/AuthBottomSheet';
import { AuthForm } from '@/components/auth/AuthForm';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AuthScreenProps {
    initialMode?: 'login' | 'signup';
}

// ... imports ...
import { useTheme } from '@/context/ThemeContext';

// ...

export default function AuthScreen({ initialMode = 'login' }: AuthScreenProps) {
    const { theme } = useTheme(); // Hook
    const [showSheet, setShowSheet] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);

    // Button animations
    const loginBtnScale = useSharedValue(1);
    const signupBtnScale = useSharedValue(1);

    // Floating animation for decorative elements
    const floatY = useSharedValue(0);
    React.useEffect(() => {
        floatY.value = withRepeat(
            withSequence(
                withTiming(-8, { duration: 1500 }),
                withTiming(8, { duration: 1500 })
            ),
            -1,
            true
        );
    }, []);

    const floatStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: floatY.value }],
    }));

    const loginBtnStyle = useAnimatedStyle(() => ({
        transform: [{ scale: loginBtnScale.value }],
    }));

    const signupBtnStyle = useAnimatedStyle(() => ({
        transform: [{ scale: signupBtnScale.value }],
    }));

    const handleOpenLogin = () => {
        setAuthMode('login');
        setShowSheet(true);
    };

    const handleOpenSignup = () => {
        setAuthMode('signup');
        setShowSheet(true);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle={theme.background === '#121212' ? "light-content" : "dark-content"} backgroundColor={theme.background} />
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                {/* Decorative Background Elements */}
                <Animated.View style={[styles.decorCircle1, floatStyle, { backgroundColor: theme.primaryBtn, borderColor: theme.ink }]} />
                <Animated.View style={[styles.decorCircle2, floatStyle, { backgroundColor: theme.secondary, borderColor: theme.ink }]} />
                <Animated.View style={[styles.decorSquare, floatStyle, { backgroundColor: theme.tertiary, borderColor: theme.ink }]} />

                {/* Hero Section */}
                <View style={styles.heroSection}>
                    {/* Logo */}
                    <Animated.View 
                        entering={FadeInDown.delay(200).springify()}
                        style={styles.logoContainer}
                    >
                        {/* Hard Shadow Layer */}
                        <Text style={[styles.logoText, styles.logoShadow, { color: theme.primaryBtn }]}>SKIPQ</Text>
                        {/* Main Text */}
                        <Text style={[styles.logoText, { color: theme.ink }]}>SKIPQ</Text>
                        
                        <View style={[styles.logoUnderline, { backgroundColor: theme.tertiary, borderColor: theme.ink }]} />
                    </Animated.View>

                    {/* Tagline */}
                    <Animated.Text 
                        entering={FadeInDown.delay(400).springify()}
                        style={[styles.tagline, { color: theme.ink }]}
                    >
                        Skip the queue,{'\n'}not the taste.
                    </Animated.Text>

                    {/* Subtitle */}
                    <Animated.Text 
                        entering={FadeInDown.delay(500).springify()}
                        style={[styles.subtitle]}
                    >
                        Order from your favorite campus canteens{'\n'}and pick up when ready.
                    </Animated.Text>
                </View>

                {/* CTA Buttons */}
                <View style={styles.ctaSection}>
                    <Animated.View entering={FadeInUp.delay(600).springify()}>
                        <AnimatedPressable
                            style={[styles.primaryBtn, loginBtnStyle, { backgroundColor: theme.primaryBtn, borderColor: theme.ink }]}
                            onPress={handleOpenLogin}
                            // ...
                        >
                            <Text style={[styles.primaryBtnText, { color: theme.ink }]}>LOGIN</Text>
                        </AnimatedPressable>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(700).springify()}>
                        <AnimatedPressable
                            style={[styles.secondaryBtn, signupBtnStyle, { backgroundColor: theme.card, borderColor: theme.ink }]}
                            onPress={handleOpenSignup}
                            // ...
                        >
                            <Text style={[styles.secondaryBtnText, { color: theme.ink }]}>CREATE ACCOUNT</Text>
                        </AnimatedPressable>
                    </Animated.View>

                    {/* Footer Text */}
                    <Animated.Text 
                        entering={FadeIn.delay(900)}
                        style={styles.footerText}
                    >
                        By continuing, you agree to our Terms of Service
                    </Animated.Text>
                </View>

                {/* Auth Bottom Sheet */}
                <AuthBottomSheet
                    isVisible={showSheet}
                    onClose={() => setShowSheet(false)}
                >
                    <AuthForm 
                        initialMode={authMode} 
                        onSuccess={() => setShowSheet(false)}
                    />
                </AuthBottomSheet>
            </View>
        </GestureHandlerRootView>
    );
}

// Keep styles for static layout, override colors inline


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GAME_UI.background,
    },
    // Decorative Elements
    decorCircle1: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.08,
        right: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: GAME_UI.primaryBtn,
        borderWidth: 2.5,
        borderColor: GAME_UI.ink,
        opacity: 0.8,
    },
    decorCircle2: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.25,
        left: -40,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: GAME_UI.secondary,
        borderWidth: 2,
        borderColor: GAME_UI.ink,
        opacity: 0.6,
    },
    decorSquare: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.15,
        left: SCREEN_WIDTH * 0.15,
        width: 40,
        height: 40,
        backgroundColor: GAME_UI.tertiary,
        borderWidth: 2,
        borderColor: GAME_UI.ink,
        transform: [{ rotate: '15deg' }],
        opacity: 0.7,
    },
    // Hero Section
    heroSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
        paddingTop: SCREEN_HEIGHT * 0.1,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    logoText: {
        fontSize: 64,
        fontWeight: '900',
        color: GAME_UI.ink,
        letterSpacing: 6,
    },
    logoShadow: {
        position: 'absolute',
        // In RN, absolute element in centered parent aligns to center if left/right undefined
        color: GAME_UI.primaryBtn,
        zIndex: -1,
        transform: [{ translateX: 4 }, { translateY: 4 }]
    },
    logoUnderline: {
        width: 180,
        height: 6,
        backgroundColor: GAME_UI.tertiary,
        borderRadius: 3,
        marginTop: 8,
        borderWidth: 1.5,
        borderColor: GAME_UI.ink,
    },
    tagline: {
        fontSize: 28,
        fontWeight: '800',
        color: GAME_UI.ink,
        textAlign: 'center',
        lineHeight: 36,
        marginBottom: SPACING.m,
    },
    subtitle: {
        fontSize: 15,
        color: COLORS.textMuted,
        textAlign: 'center',
        lineHeight: 22,
    },
    // CTA Section
    ctaSection: {
        paddingHorizontal: SPACING.l,
        paddingBottom: SCREEN_HEIGHT * 0.08,
        gap: SPACING.m,
    },
    primaryBtn: {
        ...GAME_UI.shadows.button,
        backgroundColor: GAME_UI.primaryBtn,
        borderRadius: RADIUS.m,
        borderWidth: 2.5,
        borderColor: GAME_UI.ink,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryBtnText: {
        fontSize: 18,
        fontWeight: '900',
        color: GAME_UI.ink,
        letterSpacing: 2,
    },
    secondaryBtn: {
        ...GAME_UI.shadows.sm,
        backgroundColor: GAME_UI.card,
        borderRadius: RADIUS.m,
        borderWidth: 2.5,
        borderColor: GAME_UI.ink,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    secondaryBtnText: {
        fontSize: 16,
        fontWeight: '800',
        color: GAME_UI.ink,
        letterSpacing: 1.5,
    },
    footerText: {
        fontSize: 12,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginTop: SPACING.s,
    },
});
