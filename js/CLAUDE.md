# js/

Contains the single JavaScript file for the site.

## script.js

Loaded by `projects.html` to dynamically render GitHub repository cards.

### Key logic

- **`FEATURED_REPOS_ORDER`** — hardcoded array of repo names that appear first, in the specified order.
- Remaining repos are fetched from `https://api.github.com/users/jmayanja33/repos` and sorted by last-updated date.
- Each repo renders as a `.repo-card` element. Cards whose repo name matches a file in `project-pages/` get a link to that detail page.

### Notes

- No framework or bundler — plain vanilla JS, loaded with a `<script>` tag.
- The GitHub API has an unauthenticated rate limit of 60 requests/hour per IP; this is fine for a personal portfolio with low traffic.
- To add a project detail page link, add a file at `project-pages/<repo-name>.html` — the card link is generated automatically by matching the repo name.
