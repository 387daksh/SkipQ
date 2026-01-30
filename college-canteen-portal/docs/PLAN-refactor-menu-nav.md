# Plan: Refactor Menu Navigation (Declutter)

## Context

- **Goal**: Declutter the Canteen Menu page by moving "Filters" and "Categories" into modals.
- **Reference**: User provided 3 images showing a "Menu" FAB and a "Filters" modal with sections.
- **Theme**: Adapt the layouts from the images to our **Neo-Brutalist Game UI** (`Azuki Cream` / `Ink` / `Primary`).

## Proposed Changes

### 1. New Components

#### `components/canteen/FilterModal.tsx`

- **Layout**: Bottom Sheet or Center Modal.
- **Content**:
  - **Sort By**: Chips for "Price - Low to High", "Price - High to Low".
  - **Type**: Chips for "Veg", "Non-Veg" (Egg if data has it).
  - **Dietary**: "Spicy" (if applicable, or skip).
  - **Actions**: "Clear All" (Text), "Apply" (Button with count).
- **Style**: Game UI Container (White BG, Black Border).

#### `components/canteen/MenuModal.tsx` (or `CategorySheet.tsx`)

- **Layout**: Popup List (anchored bottom right or center).
- **Content**: Vertical list of Categories with Item Counts.
- **Style**: Dark/Contrast list (like the reference image) or Game UI Panel.

#### `components/canteen/FloatingMenuBtn.tsx`

- **Layout**: Fixed position FAB (Bottom Center or Right).
- **Style**: Primary Button (`Menu` icon + Text).
- **Behavior**: Opens `MenuModal`.

### 2. Refactor `canteen.tsx`

- **Remove**:
  - Horizontal `CanteenFilterBar` (both static and sticky).
  - Horizontal `MenuCategoryNav` (both static and sticky).
- **Add**:
  - **Filter Button**: Place a compact "Filter" button in the Sticky Header (replacing the large bar).
  - **Menu FAB**: Floating button at bottom (z-index high).
  - **Modals**: Render `FilterModal` and `MenuModal` controlled by state.

### 3. State Management

- Lift state for `filterType` and `sortOrder` to be controlled by the Modal (apply on "Apply").
- `MenuModal` just scrolls the list ref.

## Steps

1.  **Create Modals**: Build `FilterModal` and `MenuModal` with dummy data first to styling.
2.  **Update `canteen.tsx`**:
    - Remove old components.
    - Implement FAB and Sticky Filter Button.
    - Wire up State.
3.  **Polish**: Verify "Clear All" and "Apply" logic.

## Verification

- Page should look much cleaner (more whitespace).
- "Menu" button opens quick jump list.
- "Filter" button opens detailed modal.
