# Lenis + Modal Scroll Fix

## Problem
When using Lenis smooth scroll library with a modal/drawer, scrolling with mouse wheel over the modal's content caused the background page to scroll instead of the modal's content.

## Root Cause
Lenis intercepts all wheel events at the document level. Even when `lenis.stop()` is called and body scroll is locked, Lenis still captures wheel events from scrollable elements inside the modal.

## Solution
Use Lenis's built-in `data-lenis-prevent` attribute on the scrollable container inside the modal.

```tsx
<div 
  data-lenis-prevent
  className="flex-1 p-4 overflow-y-auto"
  onWheel={(e) => e.stopPropagation()}
>
  {/* scrollable content */}
</div>
```

### Key Points
- `data-lenis-prevent` tells Lenis to skip processing scroll events for that element
- `onWheel={(e) => e.stopPropagation()}` prevents wheel events from bubbling up to document level where Lenis could capture them
- Works alongside `lenis?.stop()` for locking body scroll

### Alternative Approaches That Didn't Work
- Event capture phase interception with `preventDefault()`
- Dispatching new wheel events after interception
- CSS-based solutions alone (`touch-pan-y`, `overscroll-contain`)
- Using `will-change-scroll` CSS property

---

# Next.js 16: Middleware Deprecation

## Finding
Next.js 16 (v16.1.6) shows a warning: "The 'middleware' file convention is deprecated. Please use 'proxy' instead."

## Implication
The `src/middleware.ts` file will need to be converted to use the new "proxy" convention in a future Next.js version.

## Reference
See: https://nextjs.org/docs/messages/middleware-to-proxy

---

# Standard Modal Pattern (This Project)

## When to Apply
For any modal/drawer in this project that has scrollable content, apply these three fixes:

### 1. Outer Modal Wrapper
Add `data-modal-content` attribute:
```tsx
<motion.div
  data-modal-content
  className="relative ml-auto w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col"
  onClick={(e) => e.stopPropagation()}
>
```

### 2. Scrollable Container(s)
Add `data-lenis-prevent` and `onWheel` handler to each scrollable div:
```tsx
<div 
  data-lenis-prevent
  className="flex-1 p-4 overflow-y-auto"
  onWheel={(e) => e.stopPropagation()}
>
```

### Applied To
- ✅ CustomQuoteModal.tsx
- ✅ PrePaymentModal.tsx