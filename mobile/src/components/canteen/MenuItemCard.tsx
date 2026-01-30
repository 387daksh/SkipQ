import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { memo } from 'react';
import { MotiView } from 'moti';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Plus, Minus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, GAME_UI } from '../../constants/theme';

interface MenuItem {
  id: string;
  name: string;
  priceCents: number;
  description?: string;
  image?: string;
  isVeg: boolean;
  isPopular?: boolean;
}

interface MenuItemCardProps {
    item: MenuItem;
    quantity: number;
    onAdd: (item: MenuItem) => void;
    onRemove: (id: string) => void;
}

import { useTheme } from '../../context/ThemeContext'; // Import

const MenuItemCardComponent = ({ item, quantity, onAdd, onRemove }: MenuItemCardProps) => {
    const { theme, isDark } = useTheme(); // Hook
    const scale = useSharedValue(1);
    
    // ... animation logic ...
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    const handlePressIn = () => { scale.value = withSpring(0.97); };
    const handlePressOut = () => { scale.value = withSpring(1); };

    const handleAdd = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onAdd(item);
    };

    const handleRemove = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onRemove(item.id);
    };

    return (
        <Animated.View style={[styles.wrapper, animatedStyle]}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[styles.container, { 
                    backgroundColor: theme.card,
                    borderColor: theme.ink
                }]}
            >
                {/* Image Section */}
                <View style={[styles.imageContainer, { 
                    backgroundColor: isDark ? 'transparent' : theme.secondary,
                    borderBottomColor: theme.ink
                }]}>
                    <Image
                        source={{ uri: item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' }}
                        style={styles.image}
                        contentFit="cover"
                        transition={300}
                    />
                    
                    {/* Badge Overlay */}
                    <View style={styles.badgeRow}>
                        <View style={[
                            styles.vegBadge,
                            { 
                                borderColor: item.isVeg ? COLORS.success : COLORS.error,
                                backgroundColor: theme.card // Match card bg
                            }
                        ]}>
                            <View style={[
                                styles.vegDot, 
                                { backgroundColor: item.isVeg ? COLORS.success : COLORS.error }
                            ]} />
                            <Text style={[
                                styles.vegText, 
                                { color: item.isVeg ? COLORS.success : COLORS.error }
                            ]}>
                                {item.isVeg ? 'VEG' : 'NON-VEG'}
                            </Text>
                        </View>
                        
                        {item.isPopular && (
                            <LinearGradient
                                colors={COLORS.primaryGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={[styles.popularBadge, { borderColor: theme.ink }]}
                            >
                                <Text style={styles.popularText}>POPULAR</Text>
                            </LinearGradient>
                        )}
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <Text style={[styles.name, { color: theme.ink }]} numberOfLines={2}>{item.name}</Text>
                        <Text style={[styles.price, { color: theme.ink }]}>₹{item.priceCents / 100}</Text>
                    </View>
                    
                    {/* Action Row */}
                    <View style={styles.actionRow}>
                        {quantity > 0 ? (
                            <MotiView
                                from={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={[styles.counterContainer, { 
                                    backgroundColor: theme.white,
                                    borderColor: theme.ink
                                }]}
                            >
                                <Pressable onPress={handleRemove} style={styles.counterBtn}>
                                    <Minus size={20} color={isDark ? '#000' : GAME_UI.ink} strokeWidth={3} />
                                </Pressable>
                                <View style={[styles.qtyWrapper, { 
                                    backgroundColor: theme.white, 
                                    borderColor: theme.ink 
                                }]}>
                                    <Text style={[styles.qtyText, { color: isDark ? '#000' : GAME_UI.ink }]}>{quantity}</Text>
                                </View>
                                <Pressable onPress={handleAdd} style={styles.counterBtn}>
                                    <Plus size={20} color={isDark ? '#000' : GAME_UI.ink} strokeWidth={3} />
                                </Pressable>
                            </MotiView>
                        ) : (
                            <Pressable onPress={handleAdd}>
                                <LinearGradient
                                    colors={COLORS.primaryGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.addButton, { borderColor: theme.ink }]}
                                >
                                    <Text style={styles.addText}>ADD</Text>
                                    <Plus size={18} color={'#FFF'} strokeWidth={4} />
                                </LinearGradient>
                            </Pressable>
                        )}
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
};

export const MenuItemCard = memo(MenuItemCardComponent);

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: SPACING.l,
        paddingHorizontal: 4,
    },
    container: {
        borderRadius: 16,
        borderWidth: 2,
        ...GAME_UI.shadows.md,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 140,
        width: '100%',
        borderBottomWidth: 2,
        position: 'relative',
    },
    image: { width: '100%', height: '100%' },
    badgeRow: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    vegBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
        borderWidth: 2,
        gap: 4,
    },
    vegDot: { width: 6, height: 6, borderRadius: 3 },
    vegText: { fontSize: 10, fontWeight: '900' },
    popularBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        borderWidth: 2,
        ...GAME_UI.shadows.sm,
    },
    popularText: {
        fontSize: 9, 
        fontWeight: '900',
        color: '#FFF', 
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    content: { padding: 12, paddingTop: 10 },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
        gap: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: '900',
        flex: 1,
        textTransform: 'uppercase',
        letterSpacing: -0.5,
        lineHeight: 20,
    },
    price: { fontSize: 18, fontWeight: '900' },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 2,
        gap: 6,
        ...GAME_UI.shadows.sm,
    },
    addText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        height: 40,
        overflow: 'hidden',
        minWidth: 100,
        ...GAME_UI.shadows.sm,
    },
    counterBtn: {
        width: 36,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F5F9', // Subtle grey - ok for both modes? Probably
    },
    qtyWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 2,
        borderRightWidth: 2,
        height: '100%',
    },
    qtyText: { fontSize: 16, fontWeight: '900' },
});
