import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { COLORS, SPACING, GAME_UI, RADIUS } from '../../constants/theme';
import { useQuery } from '@tanstack/react-query';
import { getRecentItems } from '../../api/orders';
import { GameCard } from '../ui/GameCard';
import { Plus, ArrowRight, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../../context/CartContext';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { useTheme } from '../../context/ThemeContext';

export const QuickReorders = () => {
    const router = useRouter();
    const { addItem } = useCart();
    const { theme, isDark } = useTheme();
    
    // ... rest of hook logic ...
    const { data: recentItems } = useQuery({ 
        queryKey: ['recent-items'], 
        queryFn: getRecentItems 
    });

    if (!recentItems || recentItems.length === 0) return null;

    const handleAddToCart = (item: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            canteenId: item.canteenId,
            canteenName: item.canteenName,
            selfOrderFeeRate: item.selfOrderFeeRate,
            preOrderFeeRate: item.preOrderFeeRate
        });
    };

    return (
        <View style={styles.container}>
             <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                    <ShoppingBag size={18} color={theme.primary} fill={theme.primary} />
                    <Text style={[styles.title, { color: theme.ink }]}>Quick Reorders</Text>
                </View>
                <Pressable 
                    onPress={() => router.push('/(app)/orders')}
                    style={styles.seeAllBtn}
                    hitSlop={20}
                >
                    <Text style={styles.link}>See All</Text>
                    <ArrowRight size={14} color={COLORS.primary} />
                </Pressable>
            </View>
            
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
            >
                {recentItems.map((item: any, index: number) => (
                    <Animated.View 
                        key={`${item.id}-${index}`} 
                        entering={FadeInRight.delay(index * 100).springify()}
                        style={styles.cardWrapper}
                    >
                        <GameCard 
                            style={[styles.card, { backgroundColor: isDark ? '#1E1E1E' : GAME_UI.white }]} 
                            variant="elevated"
                            onPress={() => handleAddToCart(item)}
                        > 
                            <View style={styles.cardContent}>
                                {/* Centered Image Container - Improved Layout */}
                                <View style={styles.imageContainer}>
                                    <Image 
                                        source={{ uri: item.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24' }} 
                                        style={styles.image} 
                                        resizeMode="cover"
                                    />
                                    {/* Optimization: Add button overlaid on image corner for quick access */}
                                    <View style={[styles.overlayAdd, { borderColor: isDark ? '#1E1E1E' : GAME_UI.white }]}>
                                        <Plus size={16} color={GAME_UI.white} strokeWidth={3} />
                                    </View>
                                </View>

                                <View style={styles.info}>
                                    <Text style={[styles.itemTitle, { color: theme.ink }]} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.canteen} numberOfLines={1}>{item.canteenName}</Text>
                                    
                                    <View style={styles.row}>
                                        <Text style={[styles.price, { color: theme.ink }]}>₹{item.price}</Text>
                                    </View>
                                </View>
                            </View>
                        </GameCard>
                    </Animated.View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: SPACING.xl },
    
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: SPACING.m, 
        marginBottom: SPACING.m 
    },
    headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    title: { fontSize: 18, fontWeight: '800', color: GAME_UI.ink, letterSpacing: -0.5 },
    
    seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 4 },
    link: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
    
    scrollContent: { paddingHorizontal: SPACING.m, paddingBottom: 10 },
    cardWrapper: { marginRight: SPACING.m },
    
    card: { 
        width: 150, 
        borderRadius: 16,
        backgroundColor: GAME_UI.white,
        overflow: 'hidden'
    },
    cardContent: { padding: 0 }, 
    
    // Centered Image Layout
    imageContainer: { 
        width: '100%', 
        height: 110, 
        backgroundColor: COLORS.lightBg,
        position: 'relative'
    },
    image: { 
        width: '100%', 
        height: '100%',
    },
    
    overlayAdd: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: GAME_UI.primary,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: GAME_UI.white,
        ...GAME_UI.shadows.sm
    },

    info: { padding: 12 },
    itemTitle: { fontSize: 15, fontWeight: '700', color: GAME_UI.ink, marginBottom: 2 },
    canteen: { fontSize: 11, color: COLORS.textMutedDark, fontWeight: '500', marginBottom: 6 },
    
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    price: { fontSize: 15, fontWeight: '800', color: GAME_UI.ink },
});
