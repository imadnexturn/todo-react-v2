# UI Design Specifications: Dark Mode Glassmorphism

## 1. Theme Overview
- **Style:** Modern, Geometric, Glassmorphism.
- **Base:** Deep dark background with glowing accents.
- **Surface:** Translucent layers with background blur.
- **Mood:** Futuristic, Clean, Focused.

## 2. Color Palette

### Backgrounds
- **App Background:** Linear Gradient (135deg)
    - Start: `#0f0c29` (Deep Blue/Black)
    - Middle: `#302b63` (Deep Purple)
    - End: `#24243e` (Muted Dark Blue)
- **Glass Surface (Cards/Deep Containers):**
    - Background: `rgba(255, 255, 255, 0.05)`
    - Border: `1px solid rgba(255, 255, 255, 0.1)`
    - Backdrop Filter: `blur(10px)`
- **Glass Surface High (Modals/Dropdowns):**
    - Background: `rgba(255, 255, 255, 0.1)`
    - Border: `1px solid rgba(255, 255, 255, 0.2)`
    - Backdrop Filter: `blur(20px)`

### Text & Icons
- **Primary Text:** `#ffffff` (100% White)
- **Secondary Text:** `rgba(255, 255, 255, 0.7)` (Light Grey)
- **Disabled/Placeholder:** `rgba(255, 255, 255, 0.4)`
- **Accent/Action:** `#a855f7` (Purple-500) to `#d946ef` (Fuchsia-500) Gradient text or buttons.

### Status Colors
- **Success:** `#22c55e` (Green-500) - Glow effect
- **Error:** `#ef4444` (Red-500) - Glow effect
- **Warning:** `#eab308` (Yellow-500)

## 3. Typography
- **Font Family:** `Inter`, system-ui, sans-serif.
- **Headings:**
    - `h1`: 2.5rem, Bold, Letter-spacing: -0.02em.
    - `h2`: 2rem, Semi-Bold.
    - `h3`: 1.5rem, Medium.
- **Body:**
    - `p`: 1rem (16px), Regular, Line-height: 1.6.
    - `small`: 0.875rem, Regular.

## 4. Components

### Buttons
- **Primary Button:**
    - Background: Linear Gradient (Right) from `#a855f7` to `#d946ef`.
    - Text: White, Bold.
    - Hover: Brightness 1.1, Shadow `0 0 15px rgba(168, 85, 247, 0.5)`.
    - Border: None.
    - Radius: `8px`.
- **Secondary/Ghost Button:**
    - Background: Transparent.
    - Border: `1px solid rgba(255, 255, 255, 0.2)`.
    - Text: White.
    - Hover: Background `rgba(255, 255, 255, 0.1)`.

### Inputs
- **Base:**
    - Background: `rgba(0, 0, 0, 0.2)`.
    - Border: `1px solid rgba(255, 255, 255, 0.1)`.
    - Text: White.
    - Placeholder: `rgba(255, 255, 255, 0.3)`.
    - Radius: `8px`.
    - Padding: `12px 16px`.
- **Focus:**
    - Border: `1px solid #a855f7`.
    - Shadow: `0 0 10px rgba(168, 85, 247, 0.3)`.
    - Outline: None.

### Cards (Todo Items)
- **Container:**
    - Background: `rgba(255, 255, 255, 0.03)`.
    - Border: `1px solid rgba(255, 255, 255, 0.05)`.
    - Radius: `12px`.
    - Checkbox: Custom styled (Circle/Square with accent check).
    - Text: Strikethrough when checked (opacity 0.5).
    - Hover: Slight lift (transform `translateY(-2px)`), Background `rgba(255, 255, 255, 0.07)`.

## 5. Layout Structure
- **Global:** CSS Reset, flexible box model.
- **Dashboard:**
    - **Header:** Logo (Text with Gradient), User Avatar.
    - **Main Content:** Centered, Max-width 800px.
    - **Filter Bar:** Tabs (All, Active, Completed) - Active tab has bottom border glow.
    - **List:** Vertical stack of Todo Cards.
    - **Add Task:** Input field at the top of the list or Floating Action Button (FAB).
