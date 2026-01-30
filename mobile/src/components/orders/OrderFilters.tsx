import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface OrderFiltersProps {
    selected: string;
    onSelect: (filter: string) => void;
}

const FILTERS = ['All', 'Live', 'Past Week', 'Last Month'];

export const OrderFilters = ({ selected, onSelect }: OrderFiltersProps) => {
    const { theme } = useTheme();

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            style={styles.scroll}
        >
            {FILTERS.map((filter) => {
                const isSelected = selected === filter;
                return (
                    <Pressable 
                        key={filter} 
                        onPress={() => onSelect(filter)}
                        accessibilityRole="button"
                        accessibilityLabel={`Filter by ${filter}`}
                        accessibilityState={{ selected: isSelected }}
                    >
                        <MotiView
                            animate={{
                                backgroundColor: isSelected ? theme.primary : theme.white, // Apricot vs White/Card
                                borderColor: isSelected ? theme.primary : theme.ink,
                            }}
                            transition={{ type: 'timing', duration: 200 }}
                            style={styles.chip}
                        >
                            <Text style={[
                                styles.text,
                                { color: isSelected ? '#000' : theme.ink } // Ink on white, Black on Primary
                            ]}>
                                {filter}
                            </Text>
                        </MotiView>
                    </Pressable>                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 0,
    },
    container: {
        paddingHorizontal: SPACING.l,
        paddingVertical: SPACING.m,
        gap: SPACING.s,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        marginRight: 8,
    },
    text: {
        fontSize: 13,
        fontWeight: '600',
    }
});
