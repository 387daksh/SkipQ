import { View, Text, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react-native';
import { useState, useCallback, useMemo, useRef } from 'react';

import { getMenu } from '@/api/canteens';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { GAME_UI, SPACING, COLORS } from '@/constants/theme';
import { MenuItemCard } from '@/components/canteen/MenuItemCard';
import { CanteenHeader } from '@/components/canteen/CanteenHeader';
import { FloatingMenuBtn } from '@/components/canteen/FloatingMenuBtn';
import { StickyCartBar } from '@/components/canteen/StickyCartBar';
import { FilterModal } from '@/components/canteen/FilterModal';
import { MenuModal } from '@/components/canteen/MenuModal';
import { MenuSkeleton } from '@/components/canteen/MenuSkeleton';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as React.ComponentType<any>;

export default function CanteenScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addItem, removeItem, items: cartItems, total } = useCart();
  const { theme, isDark } = useTheme();

  // Refs
  const flatListRef = useRef<any>(null);

  // State
  const [filterType, setFilterType] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  
  // Animation
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  // Data Fetching
  const { data, isLoading, error } = useQuery({
    queryKey: ['canteen', id],
    queryFn: () => getMenu(id as string),
    enabled: !!id,
  });

  // Derived State
  const quantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach(item => {
        if (item.canteenId === id) {
             map[item.id] = item.quantity;
        }
    });
    return map;
  }, [cartItems, id]);

  const processedItems = useMemo(() => {
    if (!data?.items) return []; // Use data.items
    let items = [...data.items];

    // Create Section Map
    const sectionNameMap: Record<string, string> = {};
    if (data.sections) {
        data.sections.forEach((s: any) => sectionNameMap[s.id] = s.name);
    }

    // Filter
    if (filterType === 'veg') items = items.filter((i: any) => i.isVeg || i.name.toLowerCase().includes('veg'));
    if (filterType === 'non-veg') items = items.filter((i: any) => !i.isVeg && !i.name.toLowerCase().includes('veg')); 

    // Sort
    if (sortOrder === 'asc') items.sort((a: any, b: any) => a.priceCents - b.priceCents);
    else if (sortOrder === 'desc') items.sort((a: any, b: any) => b.priceCents - a.priceCents);
    
    // Grouping
    const grouped: Record<string, any[]> = {};
    items.forEach((item: any) => {
        const cat = item.sectionId ? sectionNameMap[item.sectionId] : 'Other'; // Map sectionId
        const categoryName = cat || 'Other';
        if (!grouped[categoryName]) grouped[categoryName] = [];
        grouped[categoryName].push({ ...item, isVeg: item.isVeg ?? item.name.toLowerCase().includes('veg') }); // Inject isVeg if missing
    });

    const flatList: any[] = [];
    // Sort sections based on data.sections order if possible
    const sectionOrder = data.sections?.map((s: any) => s.name) || [];
    // Add "Other" at end
    if (!sectionOrder.includes('Other')) sectionOrder.push('Other');

    // Iterate keys in order
    // But grouped keys might not match exactly if I filtered stuff out.
    // Better: Iterate sectionOrder and verify if it exists in grouped.
    sectionOrder.forEach((cat: string) => {
        if (grouped[cat] && grouped[cat].length > 0) {
            flatList.push({ type: 'header', title: cat, id: `header-${cat}` });
            flatList.push(...grouped[cat]);
        }
    });

    // Handle any categories not in order (unlikely if mapped correctly)
    Object.keys(grouped).forEach(cat => {
        if (!sectionOrder.includes(cat)) {
             flatList.push({ type: 'header', title: cat, id: `header-${cat}` });
             flatList.push(...grouped[cat]);
        }
    });
    
    return flatList;
  }, [data, filterType, sortOrder]);

  const sectionsMap = useMemo(() => {
     if (!data?.sections) return [];
     // Return sections that actually have items (after filter?)
     // For now, show all sections from API
     return data.sections.map((s: any) => ({ 
         id: `header-${s.name}`, 
         name: s.name,
         count: 0 // TODO: calculate count
     }));
  }, [data]);

  const handleAddItem = useCallback((item: any) => {
    addItem({
        id: item.id,
        name: item.name,
        price: item.priceCents / 100, // API uses priceCents, Cart uses price (dollars/rupees)
        canteenId: id as string,
        canteenName: data?.canteen?.name,
        // Optional fields if CartItem needs them
    });
  }, [addItem, id, data]);

  const handleRemoveItem = useCallback((itemId: string) => {
    removeItem(itemId);
  }, [removeItem]);

  const handleCategorySelect = (headerId: string) => {
      // TODO: Scroll to index if we map ids to indices
  };

  const renderItem = useCallback(({ item }: any) => {
    if (item.type === 'header') {
      return (
        <View style={[styles.sectionHeader, { backgroundColor: theme.background }]}>
          <View style={[styles.sectionDivider, { borderColor: theme.ink }]} />
          <Text style={[styles.sectionTitle, { color: theme.ink }]}>{item.title}</Text>
        </View>
      );
    }
    return (
      <View style={styles.itemWrapper}>
        <MenuItemCard
          item={item}
          quantity={quantityMap[item.id] || 0}
          onAdd={handleAddItem}
          onRemove={handleRemoveItem}
        />
      </View>
    );
  }, [quantityMap, handleAddItem, handleRemoveItem, theme]);

  if (isLoading) return <MenuSkeleton />;
  if (error || !data) return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.ink }}>Error loading menu.</Text>
        <Pressable onPress={() => router.back()}><Text style={{ color: theme.primary }}>Go Back</Text></Pressable>
      </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* --- Fixed Navigation Controls (Top) --- */}
      <Pressable 
        onPress={() => router.back()} 
        style={[styles.fixedBtn, { left: 20, top: Math.max(insets.top, 20) + 10 }]}
        hitSlop={20}
      >
        <View style={[styles.backBtnCircle, { backgroundColor: isDark ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)' }]}>
          <ChevronLeft color={theme.ink} size={24} strokeWidth={3} />
        </View>
      </Pressable>

      <View style={{ flex: 1 }}>
        <AnimatedFlashList
          ref={flatListRef}
          data={processedItems}
          renderItem={renderItem}
          estimatedItemSize={180}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 100 }}
          getItemType={(item: any) => item.type === 'header' ? 'sectionHeader' : 'row'}
          extraData={[quantityMap, theme]}
          ListHeaderComponent={() => (
            <CanteenHeader 
                canteen={data.canteen} 
                scrollY={scrollY}
                onFilterPress={() => setShowFilterModal(true)}
                filterType={filterType}
                setFilterType={setFilterType}
            />
          )}
        />
      </View>

      <FloatingMenuBtn onPress={() => setShowMenuModal(true)} hasCart={cartItems.length > 0} />
      <StickyCartBar itemCount={cartItems.length} total={total} />
      
      <FilterModal 
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filterType={filterType}
        setFilterType={setFilterType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <MenuModal 
        visible={showMenuModal}
        onClose={() => setShowMenuModal(false)}
        categories={sectionsMap.map((s: { id: string; name: string; count: number }) => ({ id: s.id, name: s.name, count: s.count }))}
        onSelectCategory={handleCategorySelect}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GAME_UI.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GAME_UI.background,
  },
  fixedBtn: {
    position: 'absolute',
    zIndex: 100,
    ...GAME_UI.shadows.button,
  },
  backBtnCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.95)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
  },
  sectionHeader: {
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.m,
    paddingBottom: SPACING.s,
    backgroundColor: GAME_UI.background,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: GAME_UI.ink,
    textTransform: 'uppercase',
  },
  sectionDivider: {
    width: 40,
    height: 4,
    backgroundColor: GAME_UI.primaryBtn,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: GAME_UI.ink
  },
  itemWrapper: {
    paddingHorizontal: SPACING.m,
  }
});
