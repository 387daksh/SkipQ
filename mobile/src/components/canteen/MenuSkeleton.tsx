import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Skeleton } from '../ui/Skeleton';
import { GAME_UI, SPACING } from '../../constants/theme';
import { MotiView } from 'moti';
import { useTheme } from '../../context/ThemeContext';

export const MenuSkeleton = () => {
    const { isDark, theme } = useTheme();

    const CARD_BG = isDark ? '#1E1E1E' : GAME_UI.white;
    const HEADER_BG = isDark ? '#121212' : GAME_UI.white; // Or match theme.background
    const BORDER = isDark ? '#333' : GAME_UI.ink;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header Placeholder (Parallax style) */}
            <View style={[styles.headerContainer, { backgroundColor: HEADER_BG }]}>
                {/* Image Placeholder */}
                <Skeleton width="100%" height={260} borderRadius={0} style={{ borderBottomWidth: 2, borderBottomColor: BORDER }} />
                
                {/* Content Overlay Placeholder */}
                <View style={[styles.headerContent, { backgroundColor: CARD_BG, borderColor: BORDER }]}>
                    {/* Tags Row */}
                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
                        <Skeleton width={100} height={28} borderRadius={12} />
                        <Skeleton width={60} height={28} borderRadius={12} />
                    </View>

                    {/* Title */}
                    <Skeleton width="70%" height={42} borderRadius={8} style={{ marginBottom: 16 }} />

                    {/* Filter Row shim (New Design) */}
                    <View style={styles.filterRow}>
                         <Skeleton width={90} height={36} borderRadius={20} />
                         <Skeleton width={70} height={36} borderRadius={20} />
                         <Skeleton width={90} height={36} borderRadius={20} />
                         <Skeleton width={100} height={36} borderRadius={20} />
                    </View>
                </View>
            </View>

            {/* List Placeholder */}
            <View style={styles.listContent}>
                {[1, 2, 3].map((key) => (
                    <View key={key} style={[styles.card, { backgroundColor: CARD_BG, borderColor: BORDER }]}>
                        {/* Image Section */}
                        <View style={[styles.imageSection, { borderColor: BORDER }]}>
                            <Skeleton width="100%" height="100%" borderRadius={0} style={{ borderWidth: 0 }} />
                        </View>
                        
                        {/* Content Section */}
                        <View style={styles.cardContent}>
                            <View style={styles.row}>
                                <Skeleton width="60%" height={24} borderRadius={6} />
                                <Skeleton width="20%" height={24} borderRadius={6} />
                            </View>
                            
                            <View style={{ marginTop: 12, gap: 6 }}>
                                {/* Description hidden */}
                            </View>

                            <View style={[styles.row, { marginTop: 16, justifyContent: 'flex-end' }]}>
                                <Skeleton width={90} height={40} borderRadius={12} />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        marginBottom: SPACING.m,
    },
    headerContent: {
        paddingHorizontal: SPACING.l,
        paddingBottom: SPACING.l,
        marginTop: -40, // Overlap effect
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderTopWidth: 2,
        paddingTop: SPACING.l,
    },
    filterRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
        overflow: 'hidden'
    },
    listContent: {
        paddingHorizontal: SPACING.m,
        paddingBottom: 100,
    },
    card: {
        borderRadius: 16,
        borderWidth: 2,
        marginBottom: SPACING.l,
        overflow: 'hidden',
        ...GAME_UI.shadows.md,
    },
    imageSection: {
        height: 140, // Match new card height
        borderBottomWidth: 2,
    },
    cardContent: {
        padding: SPACING.m,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
