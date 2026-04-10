Audit the current component or file for mobile responsiveness issues. Follow these standards:

**Breakpoints (Tailwind)**

- Default (no prefix): mobile base styles
- sm: 640px+, md: 768px+, lg: 1024px+
- Always write mobile-first — default styles for mobile, expand with sm:/md:/lg:

**Touch targets**

- All buttons/links: minimum 44×44px (use min-h-[44px] min-w-[44px] or padding)

**Forbidden patterns**

- Hard-coded px widths (w-[800px]) — use max-w- + w-full instead
- hover: only interactions — touch has no hover, always pair with active:
- Font smaller than text-xs (12px) on mobile alone
- Anything causing horizontal scroll

**Images**

- img elements must have w-full or max-w-full
- Use object-cover with container for fixed-size images

---

Check the provided component for each category above and report:

- ✅ Pass / ⚠️ Warning / ❌ Fail
- Specific line numbers or Tailwind class names with issues
- Suggested Tailwind fix for each issue

Do NOT auto-fix — report only.
