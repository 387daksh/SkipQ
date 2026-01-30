# PLAN: Mobile UX Revamp (Game UI)

## Context

- **Goal**: Apply "Dimensional Layering" (Neo-Brutalism + Premium Game Feel) to the entire mobile app.
- **Reference**: `docs/UX_AUDIT_REPORT.md`
- **Current State**: Canteen Menu is done. Home, Orders, Profile, Cart need updates.

## 👥 Agent Assignments

| Role             | Agent                 | Focus                                                        |
| ---------------- | --------------------- | ------------------------------------------------------------ |
| **Orchestrator** | `antigravity`         | Task tracking, context management, quality assurance.        |
| **Frontend**     | `frontend-specialist` | Component creation, screen refactoring, animations.          |
| **Mobile**       | `mobile-developer`    | React Native specific optimizations (FlashList, Reanimated). |

## 📅 Phased Implementation

### Phase 1: Game UI Kit (The Foundation)

> **Goal:** Create reusable, haptic-enabled, animated components that define the design system.

- [ ] Create `components/ui/GameButton.tsx` (Scale on press, Haptics, Hard Shadow).
- [ ] Create `components/ui/GameCard.tsx` (Base container for all cards).
- [ ] Create `components/ui/GameInput.tsx` (Chunky borders, floating labels).
- [ ] Create `hooks/useGameAnimations.ts` (Standardized Moti/Reanimated presets).

### Phase 2: Home Screen Overhaul

> **Goal:** First impression mastery.

- [ ] Refactor `HomeHeader` to support "Expandable Search".
- [ ] Upgrade `CategoryRail` to "Floating Pills" using `GameButton`.
- [ ] Upgrade `LiveCanteenCard` to use `GameCard` + `expo-image` (parity with `MenuItemCard`).
- [ ] Implement "Daily Quest" Hero Section.

### Phase 3: Orders & Tracking

> **Goal:** Gamified waiting experience.

- [ ] Create `LiveOrderTracker` component (Progress bar with extensive animation).
- [ ] Refactor `OrdersScreen` to use `FlashList` (if needed) or optimized `FlatList`.
- [ ] Redesign `PastOrderCard` ("Ticket Stub" style).

### Phase 4: Profile & Cart Polish

> **Goal:** High-fidelity utility screens.

- [ ] Gamify `ProfileScreen` avatar and stats.
- [ ] Implement "Paper Receipt" style for `CartBill`.
- [ ] (Optional) "Slide to Pay" interaction in Cart.

## ✅ Verification Checklist

- [ ] **Visuals**: All shadows use `GAME_UI.shadows`. No blurry iOS defaults.
- [ ] **Motion**: All buttons scale to `0.97` on press.
- [ ] **Performance**: Home and Orders lists scroll at 60fps.
- [ ] **Accessibility**: All new components have `accessibilityLabel` and `accessibilityRole`.
