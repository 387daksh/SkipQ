# Plan: Redesign Menu Page (Game UI)

## Context

- **Goal**: Redesign the Menu Page (`canteen.tsx`) to strictly adhere to the `game_ui` theme (`theme.ts`).
- **Style**: Neo-Brutalist / Pop Art (Bold black borders, hard shadows, vibrant colors: Mint, Yellow, Orange).
- **Current State**: Components partially implement the style but lack consistency and "Pro Max" polish.

## Task Breakdown

### 1. Visual Refinement (Neo-Brutalist)

- [ ] **Background**: Ensure global usage of `Azuki Cream` (`#F9F4EF`).
- [ ] **Typography**: Switch to heavyweight fonts (`800`/`900`) for all headers. Uppercase everything.
- [ ] **Borders**: Enforce `2px` solid black borders on _all_ cards and buttons.
- [ ] **Shadows**: Apply `GAME_UI.shadows.button` (offset hard shadow) to primary actions.

### 2. Component Overhaul

#### `CanteenHeader.tsx`

- [ ] **Title**: Massive font size, tight letter spacing, text shadow.
- [ ] **Tags**: High contrast pills (White bg + Black border + Icon).
- [ ] **Image**: Remove blur overlay, use sharp framing.

#### `MenuItemCard.tsx`

- [ ] **Interactive**: Add "Button Press" animation (scale down) to the _entire_ card.
- [ ] **Image**: Fix aspect ratio, add heavy border.
- [ ] **Add Button**: Make it a "pill" shape (`#FFD700`) with hard shadow.
- [ ] **Quantity Control**: Distinct `+` / `-` buttons with bouncy feedback.

#### `MenuCategoryNav.tsx` (Implied)

- [ ] **Pills**: Inactive = White + Border; Active = Yellow + Border + Shadow.
- [ ] **Sticky**: Ensure it snaps perfectly with a hard divider line.

#### `StickyCartBar.tsx` (Implied)

- [ ] **Floating**: Float 20px from bottom.
- [ ] **Style**: Black background? Or Primary Gradient? Let's go **Primary Orange** (`#FFBD59`) with Black Text for high visibility.

### 3. Polish & Interaction

- [ ] **Haptics**: Add `expo-haptics` to every touchable.
- [ ] **Moti**: Use `MotiView` for entrance animations of list items.
- [ ] **Loading**: Custom Skeleton loader with "shimmer" effect fitting the theme.

## Verification Checklist

- [ ] Page matches `theme.ts` color palette exactly.
- [ ] All buttons feel "clickable" (bounce + haptic).
- [ ] No "soft" shadows (must be hard offset).
- [ ] Sticky header transitions smoothly.

## Agent Assignments

- **Frontend Specialist**: Implement UI changes in `mobile/`.
