import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { GAME_UI, SPACING, RADIUS } from '@/constants/theme';
import { useState, useRef, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withTiming } from 'react-native-reanimated';

export default function ReflexGameScreen() {
    const { theme, isDark } = useTheme();
    const router = useRouter();

    const [gameState, setGameState] = useState<'IDLE' | 'WAITING' | 'READY' | 'FINISHED' | 'EARLY'>('IDLE');
    const [result, setResult] = useState<number | null>(null);
    const [highScore, setHighScore] = useState<number | null>(null);
    
    // Timer refs
    const startTime = useRef<number>(0);
    const timeoutRef = useRef<any>(null); // Fixed type

    // Animations
    const scale = useSharedValue(1);
    
    const handleStart = () => {
        setGameState('WAITING');
        setResult(null);
        scale.value = withSpring(1);

        const randomDelay = Math.random() * 2000 + 1000; // 1-3 seconds
        
        timeoutRef.current = setTimeout(() => {
            setGameState('READY');
            startTime.current = Date.now();
            scale.value = withSequence(withSpring(1.2), withSpring(1));
        }, randomDelay);
    };

    const handleTap = () => {
        if (gameState === 'WAITING') {
            // Tapped too early
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setGameState('EARLY');
            return;
        }

        if (gameState === 'READY') {
            // Success
            const reactionTime = Date.now() - startTime.current;
            setResult(reactionTime);
            setGameState('FINISHED');
            if (!highScore || reactionTime < highScore) {
                setHighScore(reactionTime);
            }
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const getMessage = () => {
        if (gameState === 'IDLE') return "Tap the screen to start";
        if (gameState === 'WAITING') return "Wait for GREEN...";
        if (gameState === 'READY') return "TAP NOW!";
        if (gameState === 'EARLY') return "Too early! 🐢";
        if (gameState === 'FINISHED') return `${result}ms`;
        return "";
    };

    const getColor = () => {
        if (gameState === 'WAITING') return '#EF4444'; // Red
        if (gameState === 'READY') return '#22C55E'; // Green
        if (gameState === 'EARLY') return '#F97316'; // Orange
        if (gameState === 'FINISHED') return '#3B82F6'; // Blue
        return isDark ? '#333' : '#E5E5E5';
    };

    const bgStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={[styles.backText, { color: theme.ink }]}>← Back</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.ink }]}>REFLEX TEST</Text>
                <View style={{width: 50}} />
            </View>

            <TouchableOpacity 
                activeOpacity={1} 
                onPress={gameState === 'IDLE' || gameState === 'FINISHED' || gameState === 'EARLY' ? handleStart : handleTap}
                style={styles.gameArea}
            >
                <Animated.View style={[
                    styles.circle, 
                    { backgroundColor: getColor() },
                    bgStyle
                ]}>
                    <Text style={styles.gameText}>{getMessage()}</Text>
                    
                    {(gameState === 'FINISHED' || gameState === 'EARLY') && (
                        <Text style={styles.subText}>Tap to try again</Text>
                    )}
                </Animated.View>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={[styles.score, { color: theme.ink }]}>
                    Best: {highScore ? `${highScore}ms` : '--'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 60 },
    backBtn: { padding: 8 },
    backText: { fontWeight: '700' },
    title: { fontSize: 18, fontWeight: '900', letterSpacing: 1 },
    
    gameArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    circle: {
        width: 280,
        height: 280,
        borderRadius: 140,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    gameText: { fontSize: 32, fontWeight: '900', color: '#FFF', textAlign: 'center' },
    subText: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 8, fontWeight: '600' },

    footer: { padding: 40, alignItems: 'center' },
    score: { fontSize: 20, fontWeight: '700', opacity: 0.6 }
});
