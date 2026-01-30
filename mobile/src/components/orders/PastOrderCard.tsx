import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import { MotiView } from 'moti';
import { COLORS, SPACING, RADIUS, GAME_UI } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface PastOrderCardProps {
    order: {
        id: string;
        vendorName: string;
        date: string;
        total: number;
        items: string[];
        image?: string;
    };
    isLast: boolean;
    onPress?: () => void;
}

export const PastOrderCard = memo(({ order, isLast, onPress }: PastOrderCardProps) => {
    const { theme, isDark } = useTheme();

    return (
        <View style={styles.row}>
            {/* Timeline Left */}
            <View style={styles.timelineColumn}>
                <View style={[styles.dot, { backgroundColor: theme.ink }]} />
                {!isLast && <View style={[styles.line, { backgroundColor: theme.ink }]} />}
            </View>

            {/* Content Right */}
            <Pressable 
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel={`Open order from ${order.vendorName} on ${order.date}, total ₹${order.total}`}
                style={({ pressed }) => [
                styles.card,
                { backgroundColor: theme.card, ...GAME_UI.shadows.sm }, // Theme bg
                pressed && { opacity: 0.8 }
            ]}>
                <MotiView
                    from={{ opacity: 0, translateX: 20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'timing', duration: 400 }}
                    style={styles.cardContent}
                >
                    {/* Image Thumbnail */}
                    <View style={[styles.imageWrapper, { 
                        backgroundColor: isDark ? 'transparent' : theme.secondary,
                        borderColor: theme.ink 
                    }]}>
                        <Image
                            source={{ uri: order.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' }}
                            style={styles.image}
                            accessible={true}
                            accessibilityRole="image"
                            accessibilityLabel={order.image ? `${order.vendorName} thumbnail` : 'Order thumbnail'}
                        />
                    </View>

                    <View style={styles.info}>
                        <View style={styles.topRow}>
                            <Text style={[styles.vendorName, { color: theme.ink }]}>{order.vendorName}</Text>
                            <Text style={[styles.price, { color: theme.ink }]}>₹{order.total}</Text>
                        </View>
                        <Text style={[styles.date, { color: theme.ink }]}>{order.date}</Text>
                        <Text style={[styles.items, { color: theme.ink }]} numberOfLines={1}>{order.items.join(', ')}</Text>

                        {/* Reorder Button */}
                        <Pressable 
                            style={[styles.reorderBtn, { 
                                backgroundColor: isDark ? '#2D2D2D' : GAME_UI.white,
                                ...GAME_UI.shadows.sm
                            }]}
                            accessibilityRole="button"
                            accessibilityLabel={`Reorder button for order from ${order.vendorName}`}
                            onPress={(e) => {
                                e.stopPropagation();
                                // TODO: Implement reorder logic
                            }}
                        >
                            <RotateCcw size={12} color={theme.ink} strokeWidth={3} />
                            <Text style={[styles.reorderText, { color: theme.ink }]}>Reorder</Text>
                        </Pressable>                    </View>
                </MotiView>
            </Pressable>
        </View>
    );
});

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.l,
    },
    timelineColumn: {
        alignItems: 'center',
        width: 24,
        marginRight: SPACING.s,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 2, // Square dot
        marginTop: 24, // Align with card top content
    },
    line: {
        flex: 1,
        width: 2,
        marginTop: 4,
        marginBottom: 4,
    },
    card: {
        flex: 1,
        borderRadius: 12,
        marginBottom: SPACING.m,
        padding: SPACING.m,
    },
    cardContent: {
        flexDirection: 'row',
        gap: SPACING.m,
    },
    imageWrapper: {
        width: 60,
        height: 60,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    vendorName: {
        fontSize: 15,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    price: {
        fontSize: 15,
        fontWeight: '900',
    },
    date: {
        fontSize: 12,
        marginBottom: 6,
        fontWeight: '600',
    },
    items: {
        fontSize: 13,
        marginBottom: 8,
        opacity: 0.7,
    },
    reorderBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    reorderText: {
        fontSize: 12,
        fontWeight: '900',
        textTransform: 'uppercase',
    }
});
