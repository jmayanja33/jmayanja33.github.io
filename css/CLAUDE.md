# css/

Contains the single shared stylesheet for the entire site.

## style.css

All pages import this one file. Key conventions:

- **Color palette** — defined as CSS variables on `:root`. Primary blue is `#2563eb`; nav and footer use black.
- **Layout** — Flexbox for component-level arrangement, CSS Grid for multi-column sections.
- **Responsive** — one breakpoint at `768px` via media queries. Mobile-first is not enforced; desktop styles come first and are overridden at `max-width: 768px`.

## Notes

- There is no preprocessor or build step — edits to `style.css` take effect immediately on page reload.
- Avoid adding per-page stylesheets; keep all styles here to maintain a single source of truth.
