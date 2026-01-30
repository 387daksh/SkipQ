import { View, Text, StyleSheet, Image, useWindowDimensions, Pressable, ScrollView } from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    SharedValue
} from 'react-native-reanimated';
import { Star, MapPin, Clock, SlidersHorizontal } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, GAME_UI } from '../../constants/theme';

const HEADER_HEIGHT = 300; // Taller for more impact

interface CanteenHeaderProps {
    canteen: any;
    scrollY: SharedValue<number>;
    onFilterPress: () => void;
    filterType: 'all' | 'veg' | 'non-veg';
    setFilterType: (type: 'all' | 'veg' | 'non-veg') => void;
}

export const CanteenHeader = ({ canteen, scrollY, onFilterPress, filterType, setFilterType }: CanteenHeaderProps) => {
    const { width } = useWindowDimensions();

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.5],
            Extrapolation.CLAMP
        );
        const scale = interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0],
            [2, 1],
            Extrapolation.CLAMP
        );
        return {
            transform: [{ translateY }, { scale }]
        };
    });

    return (
        <View style={[styles.container, { width }]}>
            {/* Parallax Image */}
            <Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80' }} 
                    style={styles.image}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)']}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>

            {/* Content Overlay */}
            <View style={styles.content}>
                <View style={styles.tagRow}>
                    <LinearGradient
                        colors={['#FF6B6B', '#EE5253']} // Red Gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.openTag}
                    >
                        <View style={styles.pulseDot} />
                        <Text style={styles.openText}>OPEN NOW</Text>
                    </LinearGradient>
                    
                    <View style={styles.ratingBadge}>
                        <Star size={12} color={GAME_UI.ink} fill={GAME_UI.primary} strokeWidth={2.5} />
                        <Text style={styles.ratingText}>4.5</Text>
                    </View>
                </View>

                <Text style={styles.title}>{canteen.name}</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.metaScroll}>
                    {/* Filter Button */}
                    <Pressable onPress={onFilterPress} style={styles.filterBtn}>
                        <SlidersHorizontal size={14} color={GAME_UI.ink} strokeWidth={2.5} />
                        <Text style={styles.filterText}>Filters</Text>
                    </Pressable>

                    {/* Veg Toggle */}
                    <Pressable 
                        onPress={() => {
                             Haptics.selectionAsync();
                             setFilterType(filterType === 'veg' ? 'all' : 'veg');
                        }} 
                        style={[styles.metaPill, filterType === 'veg' && styles.metaPillActive]}
                    >
                        <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
                        <Text style={[styles.metaPillText, filterType === 'veg' && styles.textActive]}>Veg</Text>
                    </Pressable>

                    {/* Non-Veg Toggle */}
                    <Pressable 
                        onPress={() => {
                             Haptics.selectionAsync();
                             setFilterType(filterType === 'non-veg' ? 'all' : 'non-veg');
                        }} 
                        style={[styles.metaPill, filterType === 'non-veg' && styles.metaPillActive]}
                    >
                        <View style={[styles.dot, { backgroundColor: COLORS.error }]} />
                        <Text style={[styles.metaPillText, filterType === 'non-veg' && styles.textActive]}>Non-Veg</Text>
                    </Pressable>

                    {/* Location Info */}
                    <View style={styles.infoPill}>
                        <MapPin size={12} color="#666" />
                        <Text style={styles.infoText}>{canteen.location || 'CAMPUS'}</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: HEADER_HEIGHT,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        backgroundColor: GAME_UI.white,
        borderBottomWidth: 0, // Removed border for seamless feel? No, keep it bold.
        // Actually, let's remove the bottom border here and rely on content separation
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    content: {
        paddingHorizontal: SPACING.l,
        paddingBottom: SPACING.xl,
        paddingTop: SPACING.l,
        backgroundColor: GAME_UI.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderTopWidth: 2,
        borderColor: GAME_UI.ink,
        // Removed bottom border to blend with list
        marginBottom: -2, // Fix distinct line issue
    },
    tagRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.s,
        gap: 12,
    },
    openTag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12, // Pill
        borderWidth: 2,
        borderColor: GAME_UI.ink,
        gap: 6,
        ...GAME_UI.shadows.sm,
    },
    pulseDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: GAME_UI.white,
    },
    openText: {
        color: GAME_UI.white,
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GAME_UI.white,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: GAME_UI.ink,
        gap: 4,
        ...GAME_UI.shadows.sm
    },
    ratingText: {
        color: GAME_UI.ink,
        fontWeight: '900',
        fontSize: 14,
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        color: GAME_UI.ink,
        marginBottom: SPACING.s,
        letterSpacing: -1.5,
        textTransform: 'uppercase',
        lineHeight: 42,
    },
    metaScroll: {
        alignItems: 'center',
        gap: 10,
        paddingBottom: 4, // shadow space
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: GAME_UI.white,
        borderWidth: 1, // Thinner border
        borderColor: GAME_UI.ink,
        ...GAME_UI.shadows.sm,
    },
    filterText: {
        fontSize: 13,
        fontWeight: '700',
        color: GAME_UI.ink,
        textTransform: 'uppercase',
    },
    metaPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6', // Light Grey
        borderWidth: 1,
        borderColor: 'transparent',
    },
    metaPillActive: {
        backgroundColor: GAME_UI.white,
        borderColor: GAME_UI.ink,
        ...GAME_UI.shadows.sm,
    },
    metaPillText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    textActive: {
        color: GAME_UI.ink,
        fontWeight: '800',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    infoPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginLeft: 4,
    },
    infoText: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
    }
});
