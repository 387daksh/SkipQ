# 🚨 Pre-Launch Codebase Audit: Hardcoded Values & Mock Data

> **Date:** 2026-01-23
> **Scope:** Mobile App (`e:\SKIPQ\mobile\app`)

This report identifies all hardcoded values, mock data, and disconnected functions found in the codebase that require attention before production launch.

## 🔴 High Priority (Must Fix)

### 1. Home Screen - Hero Section (Reorder Widget)

- **File:** `mobile/app/components/home/HeroSection.tsx`
- **Issue:** `LAST_ORDER` object is hardcoded.
  ```typescript
  const LAST_ORDER = {
      name: "Spicy Chicken Burger",
      canteen: "Burger Point",
      ...
  };
  ```
- **Impact:** Every user sees the same fake burger order as "Live".
- **Action:** Fetch specific user's last/active order from `/api/orders/latest`.

### 2. Home Screen - Deals Carousel

- **File:** `mobile/app/components/home/DealsCarousel.tsx`
- **Issue:** `DATA` array content is static mock data.
  ```typescript
  { id: '1', title: '50% OFF', subtitle: 'First Order Special', ... }
  ```
- **Impact:** "CLAIM" buttons are non-functional visual elements.
- **Action:** Implement `/api/deals` endpoint or hide section if not ready.

### 3. Profile Screen - User Stats & Gamification

- **File:** `mobile/app/(app)/(tabs)/profile.tsx`
- **Issue:** Gamification stats are hardcoded integers.
  - "Level 5" badge.
  - "12 Quests Done".
  - "4.8 Avg Rating".
  - XP Bar: "240 / 500 XP".
- **Impact:** User stats do not reflect actual usage.
- **Action:** Extend `/api/auth/me` to return `stats: { ordersCount, xp, level }`.

### 4. Edit Profile Screen

- **File:** `mobile/app/(app)/profile/edit.tsx`
- **Issue:** File is a UI Stub.
  - Form fields (`GameInput`) are present but not connected to state.
  - "Save Changes" button calls `router.back()` without saving.
- **Impact:** Users cannot update their profile.
- **Action:** Connect to `api.updateProfile()` (needs implementation).

### 5. Support Button

- **File:** `mobile/app/(app)/order-details/[id].tsx`
- **Issue:** "CALL SUPPORT" button is non-functional.
  ```typescript
  <Pressable style={styles.supportButton}>
      // missing onPress handler
  </Pressable>
  ```
- **Action:** Add `Linking.openURL('tel:+91...')` with canteen phone number.

## 🟡 Medium Priority (Improvement Needed)

### 6. Category Rail

- **File:** `mobile/app/components/home/CategoryRail.tsx`
- **Issue:** `CATEGORIES` list is static (`['Trending', 'Healthy', 'Comfort'...]`).
- **Action:** Fetch active tags from backend to ensure empty categories aren't shown.

### 7. Auth Context - Token Validation

- **File:** `mobile/app/context/AuthContext.tsx`
- **Issue:** `isTokenValid()` does generic JWT expiration check locally.
- **Action:** Ensure `api.getProfile()` failure (401) triggers a logout to sync with server-side revocation.

### 8. Order Details - Timeline Estimates

- **File:** `mobile/app/(app)/order-details/[id].tsx`
- **Issue:** Status timeline steps are logic-bound but times are mocked or just creation time.
- **Action:** Use real "Accepted At", "Ready At" timestamps from backend order object.

## 🟢 Low Priority / By Design

- **Static Headers:** "For You", "Deals of the Hour" (Standard UI text).
- **Status Mappings:** `PENDING` -> "Order Placed" (Correct presentation logic).

## Suggested Action Plan

1.  **Immediate:** Connect `HeroSection` to `api.getMyOrders()` (take the first item).
2.  **Immediate:** Implement `Edit Profile` API connection.
3.  **Cleanup:** Remove `DealsCarousel` if no backend support exists yet.
