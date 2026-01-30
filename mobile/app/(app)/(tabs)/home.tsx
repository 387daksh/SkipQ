import { View, StyleSheet, FlatList, ActivityIndicator, Text, Pressable, RefreshControl } from 'react-native';
import { HomeSkeleton } from '@/components/home/HomeSkeleton';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getCanteens } from '@/api/canteens';
import { getLastOrder, getOrders } from '@/api/orders';
import { useState, useCallback, useRef, useMemo } from 'react';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, GAME_UI } from '@/constants/theme';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HeroSection } from '@/components/home/HeroSection';
import { LiveCanteenCard } from '@/components/home/LiveCanteenCard';
import { QuickFilters } from '@/components/home/QuickFilters';
import { QuickReorders } from '@/components/home/QuickReorders';
import { DailySpecials } from '@/components/home/DailySpecials';
import { StickyCartBar } from '@/components/canteen/StickyCartBar';
import { useCart } from '@/context/CartContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { GameModal } from '@/components/ui/GameModal'; // Import
import { calculateStreak } from '@/utils/streak';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showStreakModal, setShowStreakModal] = useState(false); // State

  const router = useRouter();
  const { items: cartItems, total } = useCart();
  const { theme, isDark } = useTheme();
  
  // IMPORTANT: All hooks must be called before any early returns
  const flatListRef = useRef<FlatList>(null);

  const { data: canteens, isLoading, error, refetch } = useQuery({
    queryKey: ['canteens'],
    queryFn: getCanteens
  });

  const { data: lastOrder, refetch: refetchOrder } = useQuery({
    queryKey: ['last-order'],
    queryFn: getLastOrder
  });

  // Fetch Orders for Streak (Hoisted)
  const { data: orders, refetch: refetchOrders } = useQuery({
      queryKey: ['my-orders'],
      queryFn: getOrders,
      staleTime: 1000 * 60 * 5
  });

  const streak = useMemo(() => calculateStreak(orders || []), [orders]);

  const onRefresh = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRefreshing(true);
    await Promise.all([refetch(), refetchOrder(), refetchOrders()]);
    setRefreshing(false);
  }, [refetch, refetchOrder, refetchOrders]);

  if (isLoading) return (
    <HomeSkeleton />
  );

  if (error) return (
    <View style={[styles.center, { backgroundColor: theme.background }]}>
      <Text style={styles.error}>Could not load canteens.</Text>
      <Pressable style={styles.retryBtn} onPress={() => refetch()}>
        <Text style={styles.retryText}>Retry</Text>
      </Pressable>
    </View>
  );

  // Filter canteens based on search query
  const filteredCanteens = canteens?.filter((canteen: any) => 
    canteen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    canteen.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Header Content
  const headerContent = (
    <View style={styles.headerSpacer}>
      <View style={{ paddingHorizontal: SPACING.m }}>
        <HomeHeader onSearch={setSearchQuery} onShowStreak={() => setShowStreakModal(true)} />
      </View>
      
      {!searchQuery && (
        <Animated.View entering={FadeIn}>
          <HeroSection 
            recentOrder={lastOrder}
            onPress={() => {
             if (lastOrder) {
                 router.push(`/(app)/canteen?id=${lastOrder.canteenId}`);
             } else if (cartItems.length > 0) {
                 router.push('/(app)/cart');
             } else {
                 flatListRef.current?.scrollToIndex({ index: 0, animated: true, viewOffset: 100 });
                 Haptics.selectionAsync();
             }
          }} />

          {/* Quick Filters (Pills) */}
          <View style={{ marginTop: SPACING.m, paddingHorizontal: SPACING.m }}>
            <QuickFilters onSelect={setSearchQuery} />
          </View>

          {/* Quick Reorders (Horizontal Scroll) */}
          <QuickReorders />

          {/* Daily Specials (Auto-Hidden if no data) */}
          <DailySpecials />

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.ink }]}>All Canteens</Text>
          </View>
        </Animated.View>
      )}
      
      {searchQuery ? (
         <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.ink }]}>Search Results</Text>
         </View>
      ) : null}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GameModal 
        visible={showStreakModal}
        onClose={() => setShowStreakModal(false)}
        type="streak"
        data={{ streak }}
        isDark={isDark}
      />
      <FlatList
        ref={flatListRef}
        data={filteredCanteens}
        keyExtractor={(item: any) => item.id}
        ListHeaderComponent={headerContent}
        contentContainerStyle={{ paddingBottom: 120 }}
        initialNumToRender={5}
        windowSize={3}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
            progressBackgroundColor={theme.card}
          />
        }
        renderItem={({ item, index }) => (
          <View style={{ paddingHorizontal: SPACING.m }}>
             <LiveCanteenCard
               item={item}
               onPress={() => router.push(`/(app)/canteen?id=${item.id}`)}
             />
          </View>
        )}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
      />

      <StickyCartBar itemCount={cartItems.length} total={total} hasTabBar={true} />
      
      <GameModal 
        visible={showStreakModal}
        onClose={() => setShowStreakModal(false)}
        type="streak"
        data={{ streak }}
        isDark={isDark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { }, 
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: COLORS.textMutedDark, marginTop: 12, fontSize: 16 },
  error: { color: COLORS.error, fontSize: 16, marginBottom: 12 },
  retryBtn: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: COLORS.cardDark, borderRadius: 8 },
  retryText: { color: COLORS.white },

  headerSpacer: { marginBottom: 4 },
  section: { marginTop: SPACING.m },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: SPACING.s, paddingHorizontal: SPACING.m },
});
