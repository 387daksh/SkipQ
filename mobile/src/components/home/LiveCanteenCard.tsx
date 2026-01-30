import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { COLORS, SPACING, GAME_UI } from '../../constants/theme';
import { Star } from 'lucide-react-native';
import { GameCard } from '../ui/GameCard';
import { useTheme } from '../../context/ThemeContext'; // Import

// const { width } = Dimensions.get('window'); // Unused

import { isCanteenOpen } from '../../utils/canteenUtils';

export interface CanteenItem {
    id: string | number;
    name: string;
    imageUrl?: string; // New field
    tags?: string[];   // New field
    rating?: number;   // New field
    manualIsOpen: boolean;
    autoMode?: boolean;
    openingTime?: string;
    closingTime?: string;
    isOpen?: boolean; 
}

export const LiveCanteenCard = ({
    item,
    onPress,
}: {
    item: CanteenItem,
    onPress: () => void,
}) => {
    const { theme, isDark } = useTheme(); // Use Theme
    // Calculate status dynamically respecting Auto Mode
    const isOpen = isCanteenOpen(item);
    
    // Dynamic Image or Pretty Fallback
    const imageSource = item.imageUrl 
        ? { uri: item.imageUrl } 
        : (String(item.id).length % 2 === 0 
            ? { uri: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80' } 
            : { uri: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' });

    // Dynamic Tags (Mock if empty until backend supports it)
    const displayTags = item.tags && item.tags.length > 0 
        ? item.tags.slice(0, 2) 
        : ['Snacks', 'Drinks']; 

    return (
        <GameCard 
            onPress={onPress} 
            variant="elevated"
            image={item.imageUrl || (String(item.id).length % 2 === 0 ? 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80' : 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80')}
            style={{ marginBottom: SPACING.l, backgroundColor: theme.card }} 
        >
             {/* Overlay Badge - Positioned absolutely over the image area */}
             <View style={[styles.statusBadge, { backgroundColor: isDark ? '#333' : GAME_UI.white }]}>
                    <View style={[styles.statusDot, { backgroundColor: isOpen ? COLORS.success : COLORS.error, borderColor: theme.ink }]} />
                    <Text style={[styles.statusText, { color: theme.ink }]}>{isOpen ? 'OPEN' : 'CLOSED'}</Text>
            </View>

            <View style={styles.row}>
                <Text style={[styles.title, { color: theme.ink }]}>{item.name}</Text>
                {/* Rating Removed as requested */}
            </View>
        </GameCard>
    );
};

const styles = StyleSheet.create({
    statusBadge: {
        position: 'absolute',
        top: -138, // Move up into image area
        right: 0,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        ...GAME_UI.shadows.sm,
        zIndex: 10,
    },
    statusDot: { width: 8, height: 8, borderRadius: 4, borderWidth: 1 },
    statusText: { fontSize: 10, fontWeight: '800' },

    // Content layout handled by GameCard parent

    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    title: { fontSize: 20, fontWeight: '900', letterSpacing: 0.5 },
    
    rating: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: GAME_UI.white, 
        paddingHorizontal: 8, 
        paddingVertical: 4, 
        borderRadius: 8, 
        gap: 4, 
        borderWidth: 2, 
        borderColor: GAME_UI.ink 
    },
    ratingText: { color: GAME_UI.ink, fontSize: 12, fontWeight: '800' },

    dashedLine: { flexDirection: 'row', overflow: 'hidden', height: 2, width: '100%', opacity: 0.2, marginBottom: 12 },
    dash: { width: 6, height: 2, backgroundColor: GAME_UI.ink, marginRight: 4 },

    footerRow: { flexDirection: 'row', gap: 8 },
    metaBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1.5,
        borderColor: GAME_UI.ink,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    metaText: { color: GAME_UI.ink, fontSize: 10, fontWeight: '700' },
});
