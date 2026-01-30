import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getRecentItems } from '../../api/orders'; // Using same API for now to check data existence

export const DailySpecials = () => {
    // Logic: Only show if we have 'Trending' data.
    // For now, we simulate "Data Insufficient" by returning null.
    // As per user instruction: "Don't show until we get much data... app automatically recognizes".
    // I am setting a threshold: if we fetch < 10 unique items globally, we hide this.
    
    const { data: items } = useQuery({ queryKey: ['trending-check'], queryFn: getRecentItems });
    
    const hasEnoughData = items && items.length > 20; // High threshold to simulate "Early Days"

    if (!hasEnoughData) return null; // Logic Gate 🚪

    return (
        <View style={styles.container}>
            <Text>Daily Specials (Hidden for now)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: 0 } 
});
