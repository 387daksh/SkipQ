import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { ShoppingBag, ArrowRight } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GAME_UI, COLORS } from '../../constants/theme';

interface StickyCartBarProps {
    itemCount: number;
    total: number;
    hasTabBar?: boolean;
}

export const StickyCartBar = ({ itemCount, total, hasTabBar = false }: StickyCartBarProps) => {
    const insets = useSafeAreaInsets();
    if (itemCount === 0) return null;

    const bottomOffset = hasTabBar ? 90 : (insets.bottom + 20);

    return (
        <MotiView
            from={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={[styles.wrapper, { bottom: bottomOffset }]}
        >
            <Link href="/(app)/cart" asChild>
                <Pressable>
                    <View style={styles.container}>
                        {/* Info Block - White on Black */}
                        <View style={styles.info}>
                             <View style={styles.itemsBadge}>
                                <Text style={styles.itemsText}>{itemCount} ITEM{itemCount > 1 ? 'S' : ''}</Text>
                             </View>
                             <Text style={styles.totalText}>₹{total}</Text>
                        </View>

                        {/* Action Block - Gradient */}
                        <LinearGradient
                            colors={COLORS.primaryGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.action}
                        >
                            <Text style={styles.actionText}>View Cart</Text>
                            <View style={styles.iconCircle}>
                                <ArrowRight size={16} color={GAME_UI.ink} strokeWidth={3} />
                            </View>
                        </LinearGradient>
                    </View>
                </Pressable>
            </Link>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 20,
        right: 20,
        zIndex: 100,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        paddingLeft: 20,
        backgroundColor: GAME_UI.ink, // Deep Black
        borderRadius: 20, // More rounded
        borderWidth: 2,
        borderColor: GAME_UI.ink,
        ...GAME_UI.shadows.button,
    },
    info: {
        flexDirection: 'column',
        gap: 2,
    },
    itemsBadge: {
        backgroundColor: '#333', // Dark Grey
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    itemsText: {
        color: GAME_UI.white,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    totalText: {
        color: GAME_UI.white,
        fontSize: 22, // Bigger
        fontWeight: '900',
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 14, // Slightly less rounded than container
        borderWidth: 2,
        borderColor: GAME_UI.ink,
    },
    actionText: {
        color: GAME_UI.white, // White on Gradient
        fontSize: 14,
        fontWeight: '900',
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    iconCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: GAME_UI.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: GAME_UI.ink,
    }
});
