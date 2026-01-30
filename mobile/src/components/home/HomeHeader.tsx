import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, ChevronDown, Zap, XCircle, Flame } from 'lucide-react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GameInput } from '../ui/GameInput';
import { useTheme } from '../../context/ThemeContext';

interface HomeHeaderProps {
    onSearch?: (query: string) => void;
    onShowStreak?: () => void;
}

import { useQuery } from '@tanstack/react-query';
import { getProfile, getConfig } from '../../api/auth';
import { getOrders } from '../../api/orders';
import { calculateStreak } from '../../utils/streak';
import { useAuth } from '../../context/AuthContext';

export const HomeHeader = ({ onSearch, onShowStreak }: HomeHeaderProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAuth();
    const { theme, isDark } = useTheme();
    const [greeting, setGreeting] = useState('Welcome');

    // Time-based Greeting
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    // Fetch Profile for Name (Optimized: 5 min cache)
    const { data: profile } = useQuery({ 
        queryKey: ['profile'], 
        queryFn: getProfile, 
        retry: false,
        staleTime: 1000 * 60 * 5 // 5 mins
    });

    // Fetch Orders for Streak (Optimized: 5 min cache)
    const { data: orders } = useQuery({
        queryKey: ['my-orders'],
        queryFn: getOrders,
        staleTime: 1000 * 60 * 5
    });

    const streak = useMemo(() => calculateStreak(orders || []), [orders]);

    // Name Logic: Get first name, capitalize first letter
    const getFirstName = () => {
        // Priority: Profile Name -> User Email
        let name = profile?.name;
        if (!name) name = user?.email?.split('@')[0];
        
        // Take first part if contains space, dot, underscore
        if (name) {
            name = name.trim().split(/[ ._]/)[0]; 
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        }
        return 'Chef';
    };
    
    const displayName = getFirstName();

    const handleSearch = () => {
        onSearch?.(searchQuery);
    };

    // Fetch Config (Campus Name)
    const { data: config } = useQuery({
        queryKey: ['config'],
        queryFn: getConfig,
        retry: false,
        staleTime: 1000 * 60 * 60 // 1 hour for config
    });
    
    return (
        <Animated.View entering={FadeInDown.duration(600).springify()} style={styles.container}>
            
            {/* Row 1: Greeting Label + Location */}
            <View style={styles.topRow}>
                <Text style={[styles.greetingSub, { color: theme.ink, opacity: 0.6 }]}>{greeting},</Text>
                
                <Pressable style={[styles.locationBadge, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : COLORS.white }]} onPress={() => {}}>
                    <MapPin size={12} color={theme.primary} />
                    <Text style={[styles.locationText, { color: theme.ink }]}>{config?.campusName || 'DTU'}</Text>
                    <ChevronDown size={12} color={theme.ink} style={{ opacity: 0.5 }} />
                </Pressable>
            </View>

            {/* Row 2: Big Name + Streak Badge */}
            <View style={styles.nameRow}>
                <Text style={[styles.greetingName, { color: theme.ink }]} numberOfLines={1}>{displayName} 👋</Text>
                
                <Pressable onPress={onShowStreak} style={[styles.streakBadge, { backgroundColor: isDark ? 'rgba(255,90,0,0.1)' : '#FFF0E6' }]}>
                    <Flame size={18} color="#FF5A00" fill="#FF5A00" />
                    <View>
                         <Text style={[styles.streakValue, { color: '#FF5A00' }]}>{streak}</Text>
                         <Text style={[styles.streakLabel, { color: isDark ? '#FF9E66' : '#FF8040' }]}>Day Streak</Text>
                    </View>
                </Pressable>
            </View>

            {/* Row 3: Search Bar */}
            <View style={styles.searchContainer}>
                <GameInput
                    placeholder='Search for something tasty...'
                    value={searchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text);
                        onSearch?.(text);
                    }}
                    onSubmitEditing={handleSearch}
                    leftIcon={<Search size={20} color={isDark ? theme.ink : COLORS.textMutedDark} />}
                    returnKeyType="search"
                    style={{ 
                        fontSize: 16, 
                        color: theme.ink,
                        backgroundColor: isDark ? '#1E1E1E' : COLORS.white 
                    }}
                    placeholderTextColor={isDark ? '#888' : '#999'}
                    rightIcon={searchQuery ? (
                        <Pressable onPress={() => {
                            setSearchQuery('');
                            onSearch?.('');
                        }}>
                            <XCircle size={20} color={COLORS.textMutedDark} />
                        </Pressable>
                    ) : null}
                />
            </View>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: SPACING.m, paddingTop: 40, paddingBottom: SPACING.xs },
    
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    
    greetingSub: { fontSize: 14, fontWeight: '600', letterSpacing: 0.5 },
    
    nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    greetingName: { fontSize: 32, fontWeight: '900', letterSpacing: -1, flex: 1 },
    
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    streakValue: { fontSize: 16, fontWeight: '900', lineHeight: 18 },
    streakLabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', lineHeight: 10 },

    locationBadge: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6, 
        paddingHorizontal: 10, 
        paddingVertical: 6, 
        borderRadius: 20,
    },
    locationText: { fontSize: 12, fontWeight: '700' },

    searchContainer: { 
        backgroundColor: 'transparent',
    },
});
