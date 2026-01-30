import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOWS, SPACING, GAME_UI } from '../../constants/theme';
import { ArrowRight, Trophy, Flame } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { GameButton } from '../ui/GameButton';
import { useGamePress } from '../../hooks/useGameAnimations';

interface HeroSectionProps {
    onPress: () => void;
    recentOrder?: any;
}

export const HeroSection = ({ onPress, recentOrder }: HeroSectionProps) => {
    const { animatedStyle, handlePressIn, handlePressOut, triggerHaptic } = useGamePress(0.98);

    const handlePress = () => {
        triggerHaptic();
        onPress();
    };

    // Default "Welcome" State if no order
    if (!recentOrder) {
        return (
            <Animated.View entering={FadeInUp.delay(200).springify()} style={{ paddingHorizontal: SPACING.m, marginTop: SPACING.s }}>
                <Animated.View style={[styles.wrapper, animatedStyle]}>
                    <Pressable
                        onPress={handlePress}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        style={styles.container}
                    >
                         <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' }} 
                            style={styles.image}
                        />
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.gradient} />
                        <View style={[styles.content, { justifyContent: 'flex-end' }]}>
                            <View>
                                <View style={styles.welcomeBadge}>
                                    <Flame size={14} color={GAME_UI.primary} fill={GAME_UI.primary} />
                                    <Text style={styles.welcomeText}>LEVEL UP YOUR LUNCH</Text>
                                </View>
                                <Text style={styles.title}>Hungry?</Text>
                                <Text style={styles.subtitle}>Skip the queue, play the game.</Text>
                                <GameButton 
                                    title="Start Order" 
                                    onPress={handlePress} 
                                    size="md" 
                                    variant="primary"
                                    style={{ marginTop: SPACING.m }}
                                    rightIcon={<ArrowRight size={16} color={GAME_UI.white} />}
                                />
                            </View>
                        </View>
                    </Pressable>
                </Animated.View>
            </Animated.View>
        );
    }

    // Reorder State
    // Reorder State
    const firstItem = recentOrder.items?.[0];
    // Handle both real API (nested menuItem) and potential mock data structure
    const rawName = firstItem?.menuItem?.name || firstItem?.name || 'Delicious Meal';
    const quantity = firstItem?.quantity || 1;
    
    const displayItem = rawName; // Just show name (e.g. "Burger")
    const fullItemText = `${quantity}x ${rawName}`; // For tracking if needed

    const canteenName = recentOrder.canteen?.name || recentOrder.canteen || 'College Canteen';

    return (
        <Animated.View entering={FadeInUp.delay(200).springify()} style={{ paddingHorizontal: SPACING.m, marginTop: SPACING.s }}>
            <Animated.View style={[styles.wrapper, animatedStyle]}>
                <Pressable
                    onPress={handlePress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={styles.container}
                >
                    <Image 
                        source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' }} 
                        style={styles.image}
                    />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradient} />

                    <View style={styles.content}>
                        <View style={styles.badgeRow}>
                            <View style={styles.reorderBadge}>
                                <Trophy size={12} color={GAME_UI.ink} />
                                <Text style={styles.reorderText}>QUEST COMPLETED</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.title} numberOfLines={1}>{displayItem}</Text>
                            <Text style={styles.subtitle}>from {canteenName}</Text>
                        </View>
                        
                        <View style={styles.dashedContainer}>
                             {[...Array(20)].map((_, i) => (
                                <View key={i} style={styles.dash} />
                             ))}
                        </View>

                        <View style={styles.ctaRow}>
                            <GameButton 
                                title="Order Again" 
                                onPress={handlePress} 
                                size="md" 
                                variant="primary"
                                style={{ flex: 1 }}
                                rightIcon={<ArrowRight size={16} color={GAME_UI.white} />}
                            />
                        </View>
                    </View>
                </Pressable>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    container: {
        height: 220, // Taller to fit spacing
        borderRadius: 16, // Not fully round, but soft box
        overflow: 'hidden',
        backgroundColor: GAME_UI.white,
        ...GAME_UI.shadows.md,
    },
    image: { width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.9 }, // Image slightly muted
    gradient: { ...StyleSheet.absoluteFillObject },
    content: { ...StyleSheet.absoluteFillObject, padding: SPACING.m, justifyContent: 'space-between' },

    badgeRow: { flexDirection: 'row', justifyContent: 'space-between' },
    liveBadge: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius: 8, 
        gap: 6, 
        backgroundColor: GAME_UI.white, 
        paddingHorizontal: 10, 
        paddingVertical: 6, 
        ...GAME_UI.shadows.sm
    },
    pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success, borderWidth: 1, borderColor: GAME_UI.ink },
    liveText: { color: GAME_UI.ink, fontSize: 11, fontWeight: '800' },

    reorderBadge: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: GAME_UI.secondary, // Blue tag
        paddingHorizontal: 10, 
        paddingVertical: 6, 
        borderRadius: 8, 
        gap: 6, 
        ...GAME_UI.shadows.sm
    },
    reorderText: { color: GAME_UI.ink, fontSize: 11, fontWeight: '800' },

    title: { fontSize: 28, fontWeight: '900', color: COLORS.white, width: '90%', textShadowColor: GAME_UI.ink, textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 0, marginTop: SPACING.s },
    subtitle: { fontSize: 16, color: GAME_UI.white, fontWeight: '700', textShadowColor: GAME_UI.ink, textShadowOffset: { width: 1.5, height: 1.5 }, textShadowRadius: 0 },

    dashedContainer: { flexDirection: 'row', overflow: 'hidden', height: 2, width: '100%', opacity: 0.6, marginVertical: 4 },
    dash: { width: 8, height: 2, backgroundColor: GAME_UI.white, marginRight: 4 },

    ctaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    price: { fontSize: 24, fontWeight: '900', color: GAME_UI.primaryBtn, textShadowColor: GAME_UI.ink, textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 0 },

    welcomeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GAME_UI.white,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
        gap: 6
    },
    welcomeText: {
        fontSize: 12,
        fontWeight: '900',
        color: GAME_UI.ink,
        textTransform: 'uppercase'
    }
});
