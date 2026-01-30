import { useRef, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { ShoppingBag, FileText, User, ChevronRight, HelpCircle, Moon, Sun, Trophy, Star, LogOut, Flame, Shield, Lock } from 'lucide-react-native';
import { COLORS, SPACING, GAME_UI } from '@/constants/theme';
// Using GameCard for the container frames as they work fine
import { GameCard } from '@/components/ui/GameCard';
import { MotiView } from 'moti';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { GameModal } from '@/components/ui/GameModal';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/orders';
import { calculateStreak } from '@/utils/streak';

export default function ProfileScreen() {
    const { user: authUser, logout } = useAuth();
    const router = useRouter();
    const { theme, toggleTheme, isDark } = useTheme();
    const [activeModal, setActiveModal] = useState<'streak' | 'quest' | null>(null);

    // Mock Profile Data
    const profile = {
        name: authUser?.email?.split('@')[0] || 'Player 1',
        email: authUser?.email,
        stats: { level: 1, xp: 0, nextLevelXp: 500, ordersCount: 0 }
    };

    // Fetch Orders & Streak (Optimized)
    const { data: orders } = useQuery({
        queryKey: ['my-orders'],
        queryFn: getOrders,
        staleTime: 1000 * 60 * 5
    });

    const streak = useMemo(() => calculateStreak(orders || []), [orders]);
    const ordersCount = orders?.length || profile.stats.ordersCount;
    
    // Theme Constants
    const BG_COLOR = isDark ? '#101010' : '#F4F4F5';
    const TEXT_COLOR = theme.ink;
    const SUBTEXT_COLOR = isDark ? '#A0A0A0' : '#666666';
    const BORDER_COLOR = isDark ? '#333333' : '#F0F0F0';
    const CARD_BG = isDark ? '#1E1E1E' : '#FFFFFF';

    // Logic
    const handleLogout = () => {
        Alert.alert('Log Out', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log Out', style: 'destructive', onPress: logout }
        ]);
    };

    const menuItems = [
        { icon: ShoppingBag, label: 'Quest Log (Orders)', route: '/(app)/profile/orders' },
        { icon: User, label: 'Character Sheet (Edit)', route: '/(app)/profile/edit' },
        { icon: isDark ? Moon : Sun, label: isDark ? 'Theme: Dark Mode' : 'Theme: Light Mode', action: toggleTheme },
        { icon: FileText, label: 'Terms & Conditions', route: '/(app)/profile/legal/terms' },
        { icon: HelpCircle, label: 'Cancellation Policy', route: '/(app)/profile/legal/refund' },
        { icon: Shield, label: 'Privacy Policy', route: '/(app)/profile/legal/privacy' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: BG_COLOR }]}>


            <ScrollView 
                contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]} 
                showsVerticalScrollIndicator={false}
            >
                
                {/* 1. IDENTITY HEADER (Full Width) */}
                <TouchableOpacity 
                    onPress={() => router.push('/(app)/profile/edit')}
                    activeOpacity={0.8}
                    style={[styles.listingCard, { backgroundColor: CARD_BG, borderColor: BORDER_COLOR }]}
                >
                    <View style={styles.headerContent}>
                        <View style={[styles.avatar, {  backgroundColor: theme.secondary }]}>
                            <User size={32} color="#111" />
                        </View>
                        <View style={{ flex: 1, marginLeft: 16 }}>
                            <Text style={[styles.userName, { color: TEXT_COLOR }]}>{profile?.name}</Text>
                            <Text style={[styles.userEmail, { color: SUBTEXT_COLOR }]}>View Activity</Text>
                        </View>
                        <ChevronRight size={20} color={SUBTEXT_COLOR} />
                    </View>
                </TouchableOpacity>

                {/* 2. STATS ROW */}
                <View style={styles.statsRow}>
                    <TouchableOpacity 
                        style={[styles.statCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF', borderColor: BORDER_COLOR }]}
                        onPress={() => setActiveModal('quest')}
                    >
                        <Trophy size={20} color={theme.primary} />
                        <View>
                            <Text style={[styles.statValue, { color: theme.ink }]}>{ordersCount}</Text>
                            <Text style={[styles.statLabel, { color: SUBTEXT_COLOR }]}>Quests</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.statCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF', borderColor: BORDER_COLOR }]}
                        onPress={() => setActiveModal('streak')}
                    >
                        <Flame size={20} color="#FF5A00" fill="#FF5A00" />
                        <View>
                            <Text style={[styles.statValue, { color: theme.ink }]}>{streak}</Text>
                            <Text style={[styles.statLabel, { color: SUBTEXT_COLOR }]}>Day Streak</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* 3. MENU LIST (Individual Cards) */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const onPress = item.action || (() => item.route && router.push(item.route as any));
                        
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={onPress}
                                activeOpacity={0.7}
                                style={[
                                    styles.listingCard,
                                    { backgroundColor: CARD_BG, borderColor: BORDER_COLOR }
                                ]}
                            >
                                <View style={[styles.menuRow, { borderBottomWidth: 1, borderColor: BORDER_COLOR, paddingBottom: 16 }]}>
                                    <View style={[styles.menuIconBox, { backgroundColor: isDark ? '#333' : '#F5F5F5' }]}>
                                        <Icon size={20} color={TEXT_COLOR} />
                                    </View>
                                    <Text style={[styles.menuLabel, { color: TEXT_COLOR }]}>{item.label}</Text>
                                    <ChevronRight size={20} color={SUBTEXT_COLOR} />
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* LOGOUT */}
                <TouchableOpacity
                    onPress={handleLogout}
                    activeOpacity={0.8}
                    style={[
                        styles.listingCard,
                        {
                            backgroundColor: '#EF4444', // Red
                            marginTop: SPACING.l,
                            flexDirection: 'row', // Align icon and text
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: 'transparent',
                            gap: 8 
                        }
                    ]}
                >
                    <LogOut size={20} color="#FFFFFF" />
                    <Text style={[styles.menuLabel, { color: '#FFFFFF', fontSize: 16 }]}>LOGOUT</Text>
                </TouchableOpacity>

                <Text style={[styles.version, { color: SUBTEXT_COLOR }]}>v1.0.0 • UID: {authUser?.token?.substring(0, 8) || '0000'}</Text>
            </ScrollView>

            <GameModal 
                visible={!!activeModal}
                onClose={() => setActiveModal(null)}
                type={activeModal || 'streak'}
                data={{ streak, ordersCount }}
                isDark={isDark}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: SPACING.m, paddingTop: 60 },

    // Shared Card Style
    listingCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12, // Space between cards
        borderWidth: 1,
    },

    // Header Specific
    headerContent: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
    userName: { fontSize: 20, fontWeight: '700', marginBottom: 2 },
    userEmail: { fontSize: 12, fontWeight: '500' },

    // Grid Layout
    gridRow: { flexDirection: 'row', gap: 12, marginBottom: 24, marginTop: 12 },
    gridCard: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
    gridLabel: { fontSize: 12, fontWeight: '600', marginBottom: 2 },
    gridValue: { fontSize: 18, fontWeight: '800' },

    // Menu Items
    menuContainer: { },
    menuRow: { flexDirection: 'row', alignItems: 'center' },
    menuIconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    menuLabel: { fontSize: 16, fontWeight: '700' },
  
    // Stats Styles
    statsRow: { flexDirection: 'row', gap: SPACING.m, marginBottom: SPACING.l },
    statCard: { 
        flex: 1, 
        padding: SPACING.m, 
        borderRadius: SPACING.m, 
        borderWidth: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: SPACING.s 
    },
    statValue: { fontSize: 18, fontWeight: '900', marginBottom: 2 },
    statLabel: { fontSize: 12, fontWeight: '600' },

    version: { textAlign: 'center', marginTop: SPACING.xl, fontSize: 12 },
});
