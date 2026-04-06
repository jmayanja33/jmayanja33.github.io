# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website hosted on GitHub Pages. It uses vanilla HTML, CSS, and JavaScript with no build tools, no package manager, and no framework. Changes pushed to the `main` branch are automatically deployed.

## Development

No build or install step is needed. Open HTML files directly in a browser or use a local static file server (e.g., `python3 -m http.server`).

There are no linting or test commands.

## Architecture

### Multi-Page Site Structure

Each page is a standalone HTML file sharing a common layout:
1. `<nav class="navbar">` — sticky navigation with `.active` class on the current page's link
2. `<main class="container">` — page content
3. `<footer class="footer">` — social links

All pages share a single stylesheet (`css/style.css`) and optionally include `js/script.js`.

### Project Pages (`project-pages/`)

Each GitHub project gets a manually maintained detail page. The file `project-pages/template.html` is the canonical template — copy it when adding a new project page. Each page typically has:
- Description section
- Key Features (bulleted list)
- Technologies Used (bulleted list)
- Link to the GitHub repo

### Dynamic GitHub Repos (`js/script.js`)

`projects.html` dynamically fetches repositories from the GitHub API (`https://api.github.com/users/jmayanja33/repos`) and renders `.repo-card` elements. Featured repos are hardcoded in order in `FEATURED_REPOS_ORDER`; remaining repos are sorted by last updated. Cards link to pages in `project-pages/` by matching repo names to file names.

### Styling (`css/style.css`)

- CSS variables on `:root` for the color palette (primary blue: `#2563eb`, black nav/footer)
- Flexbox and CSS Grid for layouts
- Single responsive breakpoint at 768px via media queries

## Content Notes

- `interests.html` exists but is intentionally commented out of all navigation menus
- Resume PDF lives at `assets/josh_mayanja_resume.pdf`
- Hockey highlight videos on `extras.html` are embedded YouTube iframes
- Social/icon images are loaded from the Flaticon CDN
