import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Flame, Trophy, ChevronRight } from 'lucide-react-native';
import { AuthBottomSheet } from '../auth/AuthBottomSheet';

interface GameModalProps {
    visible: boolean;
    onClose: () => void;
    type: 'streak' | 'quest';
    data: {
        streak?: number;
        ordersCount?: number;
    };
    isDark?: boolean;
}

export const GameModal = ({ visible, onClose, type, data, isDark = false }: GameModalProps) => {
    const isStreak = type === 'streak';
    const streak = data.streak || 0;
    const count = data.ordersCount || 0;
    
    // Quest Logic (Mock)
    const nextQuestGoal = 50; 
    const diff = 50 - (count % 50);
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    return (
        <AuthBottomSheet 
            isVisible={visible} 
            onClose={onClose} 
            height={SCREEN_HEIGHT * 0.50}
            style={{ 
                backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
                borderColor: isDark ? '#333' : '#000'
            }}
        >
            {/* Header Graphic */}
            <View style={[styles.graphicHeader, { backgroundColor: isStreak ? '#FFF0E6' : '#E6F4FF', borderRadius: 20, marginTop: 0 }]}>
                 {isStreak ? (
                    <View style={styles.iconCircle}>
                        <Flame size={40} color="#FF5A00" fill="#FF5A00" />
                    </View>
                ) : (
                    <View style={[styles.iconCircle, { backgroundColor: '#CCE9FF' }]}>
                        <Trophy size={40} color="#0088CC" fill="#0088CC" />
                    </View>
                )}
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}>
                    {isStreak 
                        ? (streak > 0 ? 'Streak on Fire! 🔥' : 'Start your Streak! 🔥')
                        : (count > 0 ? 'Quest Progress 🏆' : 'Begin your Journey 🏆')
                    }
                </Text>
                
                <Text style={[styles.desc, { color: isDark ? '#AAA' : '#666' }]} numberOfLines={2}>
                    {isStreak 
                        ? (streak > 0 
                            ? `You've ordered for ${streak} days in a row!`
                            : "Order today to light the flame!")
                        : (count > 0 
                            ? `Reach ${count + diff} orders to level up.`
                            : "Place your first order to unlock badges!")
                    }
                </Text>

                {/* Stats Box - Compact */}
                <View style={[styles.statBox, { borderColor: isDark ? '#333' : '#F0F0F0' }]}>
                    <View>
                        <Text style={[styles.statLabel, { color: isDark ? '#888' : '#999' }]}>
                            {isStreak ? 'CURRENT STREAK' : 'TOTAL ORDERS'}
                        </Text>
                        <Text style={[styles.statValue, { color: isStreak ? '#FF5A00' : '#0088CC' }]}>
                            {isStreak ? `${streak} Days` : count}
                        </Text>
                    </View>
                </View>

                {/* Action Btn */}
                <Pressable 
                    style={[
                        styles.actionBtn, 
                        { backgroundColor: isStreak ? '#FF5A00' : '#0088CC' }
                    ]}
                    onPress={onClose}
                >
                    <Text style={styles.btnText}>Let's Go!</Text>
                    <ChevronRight size={16} color="#FFF" />
                </Pressable>
            </View>
        </AuthBottomSheet>
    );
};

const styles = StyleSheet.create({
    graphicHeader: {
        height: 80, // Reduced from 120
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        width: '100%',
        alignSelf: 'stretch'
    },
    iconCircle: {
        width: 56, // Reduced from 80
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FFE0CC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    content: { alignItems: 'center', width: '100%' },
    title: { fontSize: 20, fontWeight: '900', marginBottom: 4, textAlign: 'center' }, // Reduced size
    desc: { fontSize: 13, lineHeight: 18, textAlign: 'center', marginBottom: 16 }, // Reduced margin
    
    statBox: {
        width: '100%',
        padding: 12, // Reduced padding
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 16,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.02)'
    },
    statLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 2 },
    statValue: { fontSize: 20, fontWeight: '900' },

    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10, // Compact button
        borderRadius: 100,
        gap: 6,
    },
    btnText: { color: '#FFF', fontSize: 14, fontWeight: '700' }
});
