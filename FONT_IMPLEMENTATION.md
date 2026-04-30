# Technical Font Implementation

## Overview

The entire portfolio site now uses **IBM Plex Mono** as the primary font, with **Courier Prime** as an alternative, creating a technical drawing/engineering blueprint aesthetic throughout the application.

## Fonts Used

### Primary Font: IBM Plex Mono
- **Type**: Monospace technical font
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- **Purpose**: Matches the technical/engineering drawing style from the reference image
- **Source**: Google Fonts via Next.js font optimization

### Alternative Font: Courier Prime  
- **Type**: Typewriter-style monospace
- **Weights**: 400 (Regular), 700 (Bold)
- **Purpose**: Fallback for headings and emphasis
- **Source**: Google Fonts via Next.js font optimization

### Fallback Stack
```css
"IBM Plex Mono", "Courier New", "Courier", monospace
```

## Implementation Details

### 1. Font Loading (layout.tsx)
Fonts are loaded using Next.js 16's font optimization system:

```typescript
import { IBM_Plex_Mono, Courier_Prime } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-technical",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-technical-alt",
  display: "swap",
});
```

### 2. CSS Variables (globals.css)
```css
:root {
  --font-technical: var(--font-technical), "IBM Plex Mono", "Courier New", "Courier", monospace;
  --font-technical-alt: var(--font-technical-alt), "Courier Prime", "Courier New", monospace;
  --font-gardein: var(--font-technical), "IBM Plex Mono", "Courier New", "Courier", monospace;
}
```

Note: `--font-gardein` is maintained for backward compatibility but now points to the technical font.

### 3. Global Application
All text elements use the technical font:
```css
body {
  font-family: var(--font-technical);
}

h1, h2, h3, h4, h5, h6, p, span, a, button, input, textarea, select, label {
  font-family: var(--font-technical);
}
```

## Font Weight Guidelines

To maintain the technical drawing aesthetic, font weights have been calibrated:

| Element | Weight | Letter Spacing | Purpose |
|---------|--------|----------------|---------|
| H1 | 700 | 0.02em | Major headings |
| H2 | 600 | 0.02em | Section headings |
| H3 | 600 | 0.01em | Subsection headings |
| H4-H6 | 500 | 0.01em | Minor headings |
| Body | 400 | default | Regular text |
| Uppercase Labels | 600 | 0.15em | Technical labels |

## Special Classes

### .font-mono
Forces technical font (useful for overrides):
```css
.font-mono {
  font-family: var(--font-technical) !important;
}
```

### Uppercase Text
Uppercase text (common in technical drawings) gets extra letter spacing:
```css
.uppercase,
[class*="uppercase"] {
  letter-spacing: 0.15em;
}
```

## Component-Specific Styling

### Slate System
All slate components (blog and content sections) use the technical font with specific weights:
- Slate headings: 700 weight
- Slate labels: 600 weight
- Slate body text: 400 weight
- Slate buttons: 600 weight

### Blog Content
Notion-rendered blog content uses:
- Paragraphs: 400 weight
- Headings: 700 weight with 0.02em letter spacing
- Code blocks: Technical font maintained

### Hero Section
Blueprint hero uses technical font with:
- Main title: 500 weight
- Labels: 600 weight
- Buttons: 600 weight

## Visual Characteristics

The technical font implementation provides:

1. **Monospace uniformity**: All characters have equal width, mimicking technical drawings
2. **Clear hierarchy**: Achieved through weight variations (500-700) rather than font changes
3. **Enhanced readability**: Increased letter spacing (0.01em-0.15em) for technical aesthetic
4. **Consistency**: Single font family throughout entire app

## Migration Notes

- All previous references to `var(--font-gardein)` now resolve to the technical font
- Font weights reduced from 800 to 600-700 for better technical appearance
- Letter spacing added to headings and uppercase text
- All fonts load via Next.js font optimization (automatic subsetting, preloading)

## Performance

- **Font files**: Automatically optimized and self-hosted by Next.js
- **Loading strategy**: `display: swap` prevents flash of invisible text
- **Subsetting**: Only Latin characters loaded
- **Preloading**: Critical font files preloaded automatically

## Browser Support

The font stack ensures compatibility across all modern browsers with graceful fallbacks:
1. IBM Plex Mono (Next.js optimized)
2. Courier New (system font)
3. Courier (system font)
4. Generic monospace (system default)
