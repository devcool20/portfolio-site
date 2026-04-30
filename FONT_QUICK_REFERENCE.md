# Font Quick Reference Card

## Font Stack
```
Primary: IBM Plex Mono
Alternative: Courier Prime
Fallback: Courier New → Courier → system monospace
```

## CSS Variables
```css
var(--font-technical)      /* Primary technical font */
var(--font-technical-alt)  /* Alternative technical font */
var(--font-gardein)        /* Legacy var (now points to technical) */
```

## Font Weights Cheat Sheet

| Use Case | Weight | Example |
|----------|--------|---------|
| Hero titles, main h1 | 700 | `font-weight: 700` |
| Section headings, h2 | 600 | `font-weight: 600` |
| Subsections, h3 | 600 | `font-weight: 600` |
| Small headings, h4-h6 | 500 | `font-weight: 500` |
| Buttons, labels | 600 | `font-weight: 600` |
| Body text, paragraphs | 400 | `font-weight: 400` |
| Light text | 300 | `font-weight: 300` |

## Letter Spacing Guide

| Element Type | Spacing | CSS |
|--------------|---------|-----|
| H1 | 0.02em | `letter-spacing: 0.02em` |
| H2 | 0.02em | `letter-spacing: 0.02em` |
| H3 | 0.01em | `letter-spacing: 0.01em` |
| H4-H6 | 0.01em | `letter-spacing: 0.01em` |
| Uppercase labels | 0.15em | `letter-spacing: 0.15em` |
| Body text | default | - |

## Tailwind Classes

All Tailwind font utilities now use IBM Plex Mono:

```html
<!-- Weight classes -->
<h1 class="font-bold">Heavy heading (700)</h1>
<h2 class="font-semibold">Section heading (600)</h2>
<p class="font-medium">Medium text (500)</p>
<p class="font-normal">Body text (400)</p>
<p class="font-light">Light text (300)</p>

<!-- Font family -->
<code class="font-mono">Technical text</code>

<!-- Uppercase with proper spacing -->
<span class="uppercase tracking-[0.15em]">Technical Label</span>
```

## Common Patterns

### Technical Label
```html
<span class="text-xs font-semibold uppercase tracking-[0.15em]">
  SEC. 02
</span>
```

### Section Heading
```html
<h2 class="text-4xl font-semibold tracking-tight">
  Section Title
</h2>
```

### Body Copy
```html
<p class="text-base font-normal leading-relaxed">
  Regular paragraph text
</p>
```

### Button
```html
<button class="text-sm font-semibold uppercase tracking-wider">
  Action
</button>
```

### Code/Monospace
```html
<code class="font-mono text-sm">
  Technical content
</code>
```

## File Locations

| What | Where |
|------|-------|
| Font loading | `src/app/layout.tsx` |
| Font variables | `src/app/globals.css` (line 14-20) |
| Global styles | `src/app/globals.css` (line 38-110) |
| Font weights | `src/app/globals.css` (line 88-109) |

## Customization Examples

### Change primary font weight
```css
/* In globals.css */
h1 {
  font-weight: 600;  /* Change from 700 */
}
```

### Adjust letter spacing
```css
/* In globals.css */
.uppercase {
  letter-spacing: 0.2em;  /* Change from 0.15em */
}
```

### Use alternative font for specific element
```tsx
<h1 style={{ fontFamily: 'var(--font-technical-alt)' }}>
  Alternative Font Heading
</h1>
```

## Testing Checklist

- [ ] Homepage hero displays IBM Plex Mono
- [ ] Section headings use correct weights (600-700)
- [ ] Body text is readable at 400 weight
- [ ] Uppercase labels have proper spacing
- [ ] Buttons use 600 weight
- [ ] Blog content renders with technical font
- [ ] Code blocks use monospace
- [ ] Responsive sizes look good on mobile
- [ ] Font loads quickly (check Network tab)
- [ ] Fallbacks work if font fails to load

## Browser DevTools

To verify fonts in browser:

```javascript
// In browser console
getComputedStyle(document.querySelector('h1')).fontFamily
// Should return: "IBM Plex Mono", "Courier New", Courier, monospace

getComputedStyle(document.querySelector('h1')).fontWeight
// Should return: "700"

getComputedStyle(document.querySelector('h1')).letterSpacing
// Should return: 0.02em equivalent in px
```

## Performance Metrics

Expected font loading:
- First contentful paint: < 2s
- Font display: swap (text visible immediately)
- Font size: ~50-80KB total (optimized)
- Formats: woff2 (modern), woff (fallback)

---

**Last Updated**: Font implementation complete
**Font Version**: IBM Plex Mono (Google Fonts)
**Supported Weights**: 300, 400, 500, 600, 700
