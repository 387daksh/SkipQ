import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { X, Check } from 'lucide-react-native';
import { COLORS, SPACING, GAME_UI, RADIUS } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    filterType: 'all' | 'veg' | 'non-veg';
    setFilterType: (type: 'all' | 'veg' | 'non-veg') => void;
    sortOrder: 'asc' | 'desc' | null;
    setSortOrder: (order: 'asc' | 'desc' | null) => void;
}

export const FilterModal = ({ visible, onClose, filterType, setFilterType, sortOrder, setSortOrder }: FilterModalProps) => {
    
    // Internal state handling could be added if we want "Apply" logic, 
    // but for now we'll update directly for instant feedback.

    const handleFilter = (type: 'veg' | 'non-veg' | 'all') => {
        Haptics.selectionAsync();
        setFilterType(type);
    };

    const handleSort = (order: 'asc' | 'desc' | null) => {
        Haptics.selectionAsync();
        setSortOrder(order);
    };

    const clearAll = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setFilterType('all');
        setSortOrder(null);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
                    <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
                </Pressable>

                <MotiView 
                    from={{ translateY: 300 }}
                    animate={{ translateY: 0 }}
                    style={styles.container}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Filters & Sorting</Text>
                        <Pressable onPress={onClose} style={styles.closeBtn}>
                            <X size={20} color={GAME_UI.ink} />
                        </Pressable>
                    </View>

                    {/* Section: Sort */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sort By</Text>
                        <View style={styles.chipRow}>
                            <Pressable 
                                onPress={() => handleSort('asc')}
                                style={[styles.chip, sortOrder === 'asc' && styles.chipActive]}
                            >
                                <Text style={[styles.chipText, sortOrder === 'asc' && styles.chipTextActive]}>Price - Low to High</Text>
                            </Pressable>
                            <Pressable 
                                onPress={() => handleSort('desc')}
                                style={[styles.chip, sortOrder === 'desc' && styles.chipActive]}
                            >
                                <Text style={[styles.chipText, sortOrder === 'desc' && styles.chipTextActive]}>Price - High to Low</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Section: Type */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Preference</Text>
                        <View style={styles.chipRow}>
                            <Pressable 
                                onPress={() => handleFilter('veg')}
                                style={[styles.chip, filterType === 'veg' && styles.chipActive]}
                            >
                                <View style={[styles.vegDot, { backgroundColor: COLORS.success }]} />
                                <Text style={[styles.chipText, filterType === 'veg' && styles.chipTextActive]}>Veg</Text>
                            </Pressable>
                            <Pressable 
                                onPress={() => handleFilter('non-veg')}
                                style={[styles.chip, filterType === 'non-veg' && styles.chipActive]}
                            >
                                <View style={[styles.vegDot, { backgroundColor: COLORS.error }]} />
                                <Text style={[styles.chipText, filterType === 'non-veg' && styles.chipTextActive]}>Non-Veg</Text>
                            </Pressable>
                            <Pressable 
                                onPress={() => handleFilter('all')}
                                style={[styles.chip, filterType === 'all' && styles.chipActive]}
                            >
                                <Text style={[styles.chipText, filterType === 'all' && styles.chipTextActive]}>Show All</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Pressable onPress={clearAll}>
                            <Text style={styles.clearText}>Clear All</Text>
                        </Pressable>
                        <Pressable onPress={onClose} style={styles.applyBtn}>
                            <Text style={styles.applyText}>APPLY</Text>
                        </Pressable>
                    </View>
                </MotiView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: GAME_UI.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTopWidth: 2,
        borderColor: GAME_UI.ink,
        padding: SPACING.l,
        paddingBottom: 40,
        ...GAME_UI.shadows.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: GAME_UI.ink,
    },
    closeBtn: {
        padding: 8,
        backgroundColor: GAME_UI.secondary,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: GAME_UI.ink,
    },
    section: {
        marginBottom: SPACING.l,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: GAME_UI.ink,
        marginBottom: 12,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: GAME_UI.white,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        gap: 8,
    },
    chipActive: {
        borderColor: GAME_UI.ink,
        backgroundColor: '#FFEAA7', // Yellow tint
        ...GAME_UI.shadows.sm,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.textMutedDark,
    },
    chipTextActive: {
        color: GAME_UI.ink,
        fontWeight: '900',
    },
    vegDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.m,
        paddingTop: SPACING.m,
        borderTopWidth: 2,
        borderColor: '#E2E8F0',
    },
    clearText: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.error,
    },
    applyBtn: {
        backgroundColor: GAME_UI.ink,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: GAME_UI.ink,
        ...GAME_UI.shadows.button,
    },
    applyText: {
        color: GAME_UI.white,
        fontWeight: '900',
        fontSize: 16,
    },
});
