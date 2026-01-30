import React, { useEffect, memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { Clock, CheckCircle2, ChefHat, ShoppingBag } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, RADIUS, GAME_UI } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

// ... (Interface remains same)

const STEPS = [
    { key: 'ACCEPTED', icon: CheckCircle2, label: 'Accepted' },
    { key: 'PREPARING', icon: ChefHat, label: 'Cooking' },
    { key: 'READY', icon: ShoppingBag, label: 'Ready' },
];

export const LiveOrderCard = memo(({ order, onPress }: LiveOrderCardProps) => {
    const { theme, isDark } = useTheme();
    // Calculate progress index
    const currentStepIndex = STEPS.findIndex(s => s.key === order.status);
    const activeIndex = currentStepIndex === -1 ? (order.status === 'COMPLETED' ? STEPS.length - 1 : 0) : currentStepIndex;
    
    return (
        <Pressable onPress={() => {
            Haptics.selectionAsync();
            onPress();
        }}>
            {({ pressed }) => (
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{
                        opacity: 1,
                        scale: pressed ? 0.98 : 1,
                        borderColor: theme.ink
                    }}
                    transition={{ type: 'spring', delay: 100 }}
                    style={[styles.container, { 
                        backgroundColor: theme.card,
                        ...GAME_UI.shadows.md 
                    }]}
                >
                    {/* Header: Restaurant & ETA */}
                    <View style={styles.header}>
                        <View>
                            <Text style={[styles.vendorName, { color: theme.ink }]}>{order.vendorName}</Text>
                            <Text style={[styles.orderId, { color: theme.ink }]}>Order #{order.id.slice(-4)}</Text>
                        </View>
                        <View style={[styles.etaPill, { 
                            backgroundColor: theme.tertiary, // Mint works on dark too? Maybe opacity needed
                            borderColor: theme.ink 
                        }]}>
                            <Clock size={12} color={'#000'} strokeWidth={3} />
                            <Text style={[styles.etaText, { color: '#000' }]}>{order.eta}</Text>
                        </View>
                    </View>

                    {/* Progress Bar Track */}
                    <View style={styles.trackContainer}>
                        {/* Background Line */}
                        <View style={[styles.lineBg, { 
                            backgroundColor: theme.white, 
                            borderColor: theme.ink 
                        }]} />

                        {/* Active Line (Animated Width) */}
                        <MotiView
                            animate={{ 
                                width: `${(activeIndex / (STEPS.length - 1)) * 100}%`,
                                backgroundColor: theme.ink 
                            }}
                            transition={{ type: 'spring', damping: 15 }}
                            style={styles.lineActive}
                        />

                        {/* Steps */}
                        <View style={styles.stepsRow}>
                            {STEPS.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = index <= activeIndex;
                                const isCurrent = index === activeIndex;

                                return (
                                    <View key={step.key} style={styles.stepWrapper}>
                                        <MotiView
                                            animate={{
                                                backgroundColor: isActive ? theme.primaryBtn : theme.white, 
                                                scale: isCurrent ? 1.1 : 1,
                                                borderWidth: 2,
                                                borderColor: theme.ink
                                            }}
                                            style={styles.stepCircle}
                                        >
                                            <Icon
                                                size={14}
                                                color={isActive ? '#000' : theme.ink}
                                                strokeWidth={3}
                                            />
                                        </MotiView>
                                        <Text style={[
                                            styles.stepLabel,
                                            { color: theme.ink, fontWeight: isActive ? '900' : '500', textTransform: 'uppercase' }
                                        ]}>
                                            {step.label}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    {/* Footer: Item Summary */}
                    <View style={[styles.footer, { borderTopColor: theme.ink }]}>
                        <Text style={[styles.itemSummary, { color: theme.ink }]} numberOfLines={1}>
                            {order.items.join(', ')}
                        </Text>
                        <Text style={[styles.totalPrice, { color: theme.ink }]}>₹{order.total}</Text>
                    </View>
                </MotiView>
            )}
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: SPACING.l,
        marginHorizontal: SPACING.l,
        marginBottom: SPACING.l,
        borderWidth: 2, // Added explicitly for dark mode visibility logic if needed
        borderColor: 'transparent', // controlled by Moti
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.l,
    },
    vendorName: {
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    orderId: {
        fontSize: 12,
        marginTop: 2,
        fontWeight: '700',
    },
    etaPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        gap: 6,
        borderWidth: 1,
    },
    etaText: {
        fontSize: 12,
        fontWeight: '900',
    },
    trackContainer: {
        marginBottom: SPACING.l,
        position: 'relative',
        justifyContent: 'center',
    },
    lineBg: {
        position: 'absolute',
        top: 14,
        left: 15,
        right: 15,
        height: 6, // Thicker for game aesthetic
        borderWidth: 1,
        borderRadius: 3,
    },
    lineActive: {
        position: 'absolute',
        top: 14,
        left: 15,
        height: 6, // Match bg
        borderRadius: 3,
        zIndex: 1,
    },
    stepsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 2,
    },
    stepWrapper: {
        alignItems: 'center',
        gap: 6,
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLabel: {
        fontSize: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: SPACING.m,
        borderTopWidth: 2,
    },
    itemSummary: {
        flex: 1,
        fontSize: 13,
        marginRight: SPACING.m,
        fontWeight: '600',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: '900',
    }
});
