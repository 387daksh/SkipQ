# 📱 UI/UX Audit & Design Intelligence Report

**Project:** SkipQ Mobile App
**Theme**: Neo-Brutalist "Dimensional Layering" (Game UI)
**Date:** Jan 23, 2026

---

## EXECUTIVE SUMMARY

The app currently has strong structural bones (React Native, Expo Router, React Query) and has successfully piloted the "Dimensional Layering" aesthetic on the **Canteen Menu** page.

**The Goal:** Unify the entire application under this new design language to create a cohesive, premium, and "tactile" user experience. The app should feel like a polished game—alive, responsive, and visually striking.

---

## 🎨 DESIGN SYSTEM: "DIMENSIONAL LAYERING"

**Core Philosophy:** UI elements should feel physical. They stack, float, and respond to touch with weight.

### 1. Visual Language (Neo-Brutalism 2.0)

- **Shadows:** Hard, offset shadows (`6px` x `6px`). No blur.
  - _Why:_ Creates depth and "pop" without looking messy.
- **Borders:** Thick, high-contrast borders (`2px` - `3px` Black/Ink).
  - _Why:_ Defines hit areas clearly and reinforces the "cartoon/game" aesthetic.
- **Colors:** High-saturation accents (Apricot, Mint, Lilac) against high-contrast backgrounds (White/Off-White).
- **Typography:** Bold, Uppercase Headers (`800`/`900` weight). Readable, sans-serif body.

### 2. Motion Design (The "Game Feel")

- **Tactile Feedback:** EVERY interactive element (Cards, Buttons, Inputs) must scale down (`0.97x`) on press.
  - _Tech:_ `react-native-reanimated` `useSharedValue` + `withSpring`.
- **Fluid Entry:** Screens should not just "appear". Content should cascade in (Staggered Fade + Slide Up).
  - _Tech:_ `moti` sequence.
- **Micro-interactions:**
  - Heart icons "pop" when toggled.
  - Tabs "slide" their indicator.
  - Success states "confetti" or "bounce".

---

## 🔎 SCREEN-BY-SCREEN AUDIT & RECOMMENDATIONS

### 1. 🏠 HOME SCREEN (`home.tsx`)

**Current State:** Functional list of canteens. Standard `FlatList`. Basic Header.
**UX Score:** 6/10

**Detailed Recommendations:**

- **Hero Section:** Transform into a **"Daily Quest"** card.
  - _Idea:_ "Hungry? Your next meal is 5 mins away." with a 3D illustration.
- **Category Rail:** Replace text/simple buttons with **"Floating Pills"**.
  - _Style:_ Pill shape, thick border, hard shadow. Snaps horizontally.
- **LiveCanteenCard:** Upgrade to **"Dimensional Card"**.
  - _Change:_ Full-width image (rounded top). Info block (white bg) detached slightly from image visually using borders.
  - _Interaction:_ Pressing sends a ripple or slightly depresses the card.
- **Search:** Implement **"Expandable Search"**.
  - _Behavior:_ Sticky header. Search bar expands on scroll up.

### 2. 🍔 CANTEEN MENU (`canteen.tsx`)

**Current State:** **[OPTIMIZED]**. This is our Gold Standard.
**UX Score:** 9/10

**Refinements:**

- **Category Filter:** Ensure the sticky horizontal bar has a "snap" feel when selecting categories.
- **Cart Floating Bar:** Add a "wobble" animation when an item is added to the cart to draw attention.

### 3. 🧾 ORDERS SCREEN (`orders.tsx`)

**Current State:** Basic list. "Live" and "Past" separation exists but looks flat.
**UX Score:** 5/10

**Detailed Recommendations:**

- **Live Order Card (The "Tracker"):** Needs to be massive and engaging.
  - _Feature:_ **"Live Pizza Tracker" Style Progress Bar**.
  - _Visuals:_ Animated steps (Preparing -> Ready -> Picked Up). Use Lottie animations for status icons (e.g., a flipping burger pan).
- **Past Orders:** Simplify.
  - _Style:_ "Ticket Stub" aesthetic. Dotted line separator.
- **Empty State:** Replace text with a meaningful illustration (e.g., an empty plate with a "sad face").

### 4. 👤 PROFILE SCREEN (`profile.tsx`)

**Current State:** Clean list. Good Moti animations.
**UX Score:** 7/10

**Detailed Recommendations:**

- **Header:** Make the user avatar "breakable" or interactive (e.g., tap to spin and earn a useless "badge" - gamification).
- **Stats Layer:** Add a "Stats" row: "Orders Placed: 42", "Money Saved: ₹500". Gamify the loyalty.
- **Settings Toggles:** Use **"Chunky Toggles"** (Physical switch look) instead of standard iOS/Android switches.

### 5. 🛒 CART & CHECKOUT (`cart.tsx`)

**Current State:** Functional.
**UX Score:** 6/10

**Detailed Recommendations:**

- **Bill Receipt:** Style the totals section like a **physical paper receipt** (zig-zag bottom edge).
- **Swipe to Pay:** Instead of a button, use a **"Slide to Confirm"** slider. Prevents accidental orders and feels satisfying.

---

## 🛠 TECHNICAL IMPLEMENTATION STRATEGY

### Phase 1: The "Game UI" Kit (Foundation)

- Create reusable `GameButton`, `GameCard`, `GameInput`, `GameBadge`.
- Centralize animations in `hooks/useGamePress.ts`.

### Phase 2: Screen Overhauls

- **Sprint A:** Home (High Impact).
- **Sprint B:** Orders (Complex Logic + UI).
- **Sprint C:** Profile & Cart (Polish).

### Phase 3: The "Juice" (Micro-interactions)

- Add Haptics (`expo-haptics`) to **everything**.
- Add Sound Effects (optional, user toggleable) for "Add to Cart" or "Order Success".

---

## 💡 RECOMMENDATION

Start with **Phase 1 (The Game UI Kit)**. By building the core interactive components first, we can rapidly upgrade screens by simply swapping `View`/`Pressable` with `GameCard`/`GameButton`.
