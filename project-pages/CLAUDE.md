# project-pages/

One HTML file per GitHub project, providing a detail view linked from the repo cards on `projects.html`.

## Adding a new project page

1. Copy `template.html` and rename it to `<repo-name>.html` (must match the GitHub repo name exactly for the auto-link in `js/script.js` to work).
2. Fill in: project description, Key Features list, Technologies Used list, and the GitHub repo link.
3. Update the `<title>` and `<h1>` tags.

## Current pages

| File | Project |
|---|---|
| `airport-simulation.html` | Airport simulation model |
| `analyzing-energy-consumption.html` | Energy consumption analysis |
| `automated-grading.html` | Automated grading system |
| `certificate-management.html` | Certificate management tool |
| `jmayanja33.github.io.html` | This portfolio site |
| `march-madness-pool-analytics.html` | March Madness pool analytics |
| `modeling-football-overtime.html` | Football overtime modeling |
| `modeling-spreads.html` | Spread modeling |
| `predicting-mlb-attendance.html` | MLB attendance prediction |
| `quarterback-evaluation-models.html` | QB evaluation models |
| `template.html` | Canonical template — do not delete |

## Notes

- All pages share `../css/style.css` and use the same nav/footer structure as the rest of the site.
- The `.active` class in `<nav>` should be set on the "Projects" link (since these pages are children of the projects section).
