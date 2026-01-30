# PLAN.md - Canteen UX Redesign

## 🎨 Design Vision: "Dimensional Layering"

Based on UX Intelligence gathering, we will implement a "Dimensional Layering" aesthetic.

- **Card Style**: Floating cards with soft elevation (shadows) to create depth.
- **Visuals**: Full-width or large aspect-ratio images using high-performance `expo-image`.
- **Interactions**: Fluid micro-animations for adding/removing items.
- **Typography**: Clean hierarchy (Name > Price > Description).

## 🛠️ Implementation Specs

### 1. `MenuItemCard` Redesign

Refactor the existing component to be a premium, standalone card.

- **Container**: `borderRadius: 16`, `backgroundColor: white`, `shadowOpacity: 0.08`.
- **Image**: `contentFit="cover"`, `transition={500}`, rounded top corners.
- **Controls**:
  - "Add" button: Primary color pill/circle with ripple effect.
  - Quantity control: Animated integer counter.
  - Veg/Non-veg: Minimal dot indicator overlay (top-left).

### 2. Animations (Reanimated)

- **Entry**: Staggered `FadeInUp` for list items.
- **Press**: `useAnimatedStyle` for scale effects on button press.
- **Feedback**: Haptic feedback on add/remove.

### 3. Performance

- **Basis**: Maintain the recently fixed `memo` + `useCallback` architecture.
- **Optimization**: Ensure animations run on UI thread (worklet).

## 📅 Execution Roadmap

1.  **[Frontend]** Create/Refactor `MenuItemCard` with new styles.
2.  **[Animation]** Add Reanimated entry and interaction effects.
3.  **[Integration]** Verify standard `SectionList` rendering.
4.  **[Review]** Check against "Premium" standard.
