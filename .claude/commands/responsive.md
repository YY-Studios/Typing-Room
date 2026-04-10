Audit the current component or file for mobile responsiveness issues.

Check for:

1. **Fixed widths** — hard-coded px widths (w-[800px]) that break on mobile
2. **Touch targets** — buttons/links smaller than 44×44px
3. **Mobile-first** — styles written desktop-first without mobile fallback
4. **Hover-only interactions** — hover: states with no active: equivalent for touch
5. **Font sizes** — text smaller than 12px (text-xs) on mobile
6. **Overflow** — anything that could cause horizontal scroll
7. **Images** — missing w-full or max-w-full on img elements

Report findings as a checklist:

- ✅ Pass / ⚠️ Warning / ❌ Fail for each category
- List specific line numbers or class names with issues
- Suggest Tailwind fixes inline

Do NOT auto-fix — report only.
