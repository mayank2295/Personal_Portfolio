# Mayank Gupta — Portfolio

An editorial-minimal personal portfolio. Confident typography, a single restrained
accent, physics-based smooth scroll, and high-craft motion. No frameworks, no build step.

## 🔗 [Live Demo](https://mayank2308.vercel.app/)

## ✨ Highlights

- **Editorial design system** — Fraunces display serif + Inter + JetBrains Mono, warm
  ink/paper palettes, animated light system (glow orbs + grain + vignette), single accent.
- **Smooth scrolling** via [Lenis](https://github.com/darkroomengineering/lenis).
- **Scroll-driven motion** via [GSAP + ScrollTrigger](https://gsap.com/) — masked headline
  reveals, clip-path wipes, animated counters, seamless marquee, parallax.
- **Signature interactions** — custom cursor (precise dot + elastic, velocity-stretched
  ring), magnetic buttons, cursor-reactive background torch, and a project list with a
  cursor-following preview.
- **Accessible** — semantic landmarks, `:focus-visible` styling, WCAG-AA text contrast,
  keyboard-safe mobile menu, `prefers-reduced-motion` support.
- **Self-contained assets** — branded social/OG image and project tiles generated from the
  design system (no third-party stock or hotlinked images).
- Light / dark theme (persisted), full SEO + Open Graph / Twitter / JSON-LD metadata.

## 🛠️ Tech Stack

HTML5 · Modern CSS (custom properties, `clamp()`, grid, `color-mix`) · Vanilla JavaScript
(ES modules pattern, no framework) · GSAP + ScrollTrigger · Lenis · inline SVG icons

## 📁 Structure

```
index.html              # Markup (semantic landmarks, inline SVG icons)
css/main.css            # Single design-system stylesheet (tokens + components)
js/main.js              # Lenis + GSAP orchestration, nav, counters, marquee
js/cursor.js            # Custom cursor, magnetic, torch, work-image preview
js/theme.js             # Theme toggle (persisted, theme-color sync)
js/form.js              # Contact form (Formspree) + email copy
assets/og.png           # Generated 1200×630 social share card
assets/images/projects  # Generated branded project tiles
```

## 🚀 Quick Start

```bash
git clone https://github.com/mayank2295/Personal_Portfolio.git
cd Personal_Portfolio
# Open index.html, or serve statically:
npx serve .
```

Libraries (GSAP, Lenis) load from CDN — no install or build step required.

## 👤 Author

**Mayank Gupta** — [LinkedIn](https://linkedin.com/in/mayank-g22) · [GitHub](https://github.com/mayank2295)
