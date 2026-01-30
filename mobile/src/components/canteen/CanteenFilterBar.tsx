import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { COLORS, SPACING, GAME_UI } from '../../constants/theme';
import { Leaf, Drumstick, ArrowUpNarrowWide, ArrowDownNarrowWide, ArrowUpDown } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface CanteenFilterBarProps {
    filterType: 'all' | 'veg' | 'non-veg';
    setFilterType: (type: 'all' | 'veg' | 'non-veg') => void;
    sortOrder: 'asc' | 'desc' | null;
    setSortOrder: (order: 'asc' | 'desc' | null) => void;
    contentContainerStyle?: any;
}

export const CanteenFilterBar = ({ filterType, setFilterType, sortOrder, setSortOrder, contentContainerStyle }: CanteenFilterBarProps) => {

    const toggleFilter = (type: 'veg' | 'non-veg') => {
        Haptics.selectionAsync();
        if (filterType === type) {
            setFilterType('all');
        } else {
            setFilterType(type);
        }
    }

    const toggleSort = () => {
        Haptics.selectionAsync();
        if (sortOrder === null) {
            setSortOrder('asc');
            return;
        } 
        if (sortOrder === 'asc') {
            setSortOrder('desc');
            return;
        }
        setSortOrder(null);
    }

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            >
                {/* Veg Filter */}
                <Pressable onPress={() => toggleFilter('veg')}>
                     <MotiView
                        animate={{
                            backgroundColor: filterType === 'veg' ? COLORS.success : GAME_UI.white, // Green vs White
                            borderColor: GAME_UI.ink,
                        }}
                        style={[styles.chip, filterType === 'veg' && GAME_UI.shadows.sm]}
                     >
                        <Leaf size={14} color={filterType === 'veg' ? GAME_UI.white : GAME_UI.ink} strokeWidth={2.5} />
                        <Text style={[styles.text, filterType === 'veg' && { color: GAME_UI.white, fontWeight: '800' }]}>Veg</Text>
                     </MotiView>
                </Pressable>

                {/* Non-Veg Filter */}
                <Pressable onPress={() => toggleFilter('non-veg')}>
                     <MotiView
                        animate={{
                            backgroundColor: filterType === 'non-veg' ? COLORS.error : GAME_UI.white, // Red vs White
                            borderColor: GAME_UI.ink,
                        }}
                        style={[styles.chip, filterType === 'non-veg' && GAME_UI.shadows.sm]}
                     >
                        <Drumstick size={14} color={filterType === 'non-veg' ? GAME_UI.white : GAME_UI.ink} strokeWidth={2.5} />
                        <Text style={[styles.text, filterType === 'non-veg' && { color: GAME_UI.white, fontWeight: '800' }]}>Non-Veg</Text>
                     </MotiView>
                </Pressable>

                {/* Price Sort */}
                <Pressable onPress={toggleSort}>
                     <MotiView
                        animate={{
                            backgroundColor: sortOrder ? GAME_UI.primaryBtn : GAME_UI.white,
                            borderColor: GAME_UI.ink,
                        }}
                        style={[styles.chip, !!sortOrder && GAME_UI.shadows.sm]}
                     >
                        {sortOrder === 'asc' && <ArrowUpNarrowWide size={14} color={GAME_UI.ink} strokeWidth={2.5} />}
                        {sortOrder === 'desc' && <ArrowDownNarrowWide size={14} color={GAME_UI.ink} strokeWidth={2.5} />}
                        {!sortOrder && <ArrowUpDown size={14} color={GAME_UI.ink} />}
                        <Text style={[styles.text, !!sortOrder && { color: GAME_UI.ink, fontWeight: '800' }]}>
                            Price
                        </Text>
                     </MotiView>
                </Pressable>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: GAME_UI.background,
        paddingBottom: SPACING.m,
    },
    scrollContent: {
        paddingHorizontal: SPACING.m,
        gap: 12,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 8,
        backgroundColor: GAME_UI.white,
        borderWidth: 2, 
        borderColor: '#E2E8F0', // Softer border when inactive
    },
    text: {
        fontSize: 13,
        color: GAME_UI.ink,
        fontWeight: '700',
        textTransform: 'uppercase'
    }
});
