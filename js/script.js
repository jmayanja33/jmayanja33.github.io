// GitHub username used for all API requests
const GITHUB_USERNAME = 'jmayanja33';

// Ordered list of repos to pin at the top of the projects grid
const FEATURED_REPOS_ORDER = [
    'march-madness-pool-analytics',
    'quarterback-evaluation-models',
    'automated-grading',
    'airport-simulation',
    'modeling-spreads',
    'analyzing-energy-consumption',
    'certificate-management'
];

/**
 * Fetches all public repositories for GITHUB_USERNAME from the GitHub API,
 * separates them into featured and non-featured buckets, and triggers rendering.
 *
 * Featured repos are placed first in the order defined by FEATURED_REPOS_ORDER.
 * Remaining repos are sorted by last-updated date (newest first).
 * On failure, displays an error message in the loading element.
 *
 * @async
 * @returns {Promise<void>}
 */
async function fetchRepositories() {
    // Grab DOM references needed throughout this function
    const loading = document.getElementById('loading');
    const container = document.getElementById('repos-container');

    try {
        // Request up to 100 repos sorted by last-updated date
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const allRepos = await response.json();

        // Buckets for featured (pinned) vs. remaining repos
        const featuredRepos = [];
        const otherRepos = [];

        // Pull featured repos out in the declared pin order
        FEATURED_REPOS_ORDER.forEach(repoName => {
            const repo = allRepos.find(r => r.name === repoName);
            if (repo) {
                featuredRepos.push(repo);
            }
        });

        // Collect every repo not in the featured list
        allRepos.forEach(repo => {
            if (!FEATURED_REPOS_ORDER.includes(repo.name)) {
                otherRepos.push(repo);
            }
        });

        // Sort non-featured repos by last-updated descending
        otherRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Merge: pinned repos first, then remaining by recency
        const repos = [...featuredRepos, ...otherRepos];

        // Hide the loading spinner now that data is ready
        loading.style.display = 'none';

        // Render cards and (legacy) log page scaffolding
        displayRepositories(repos);
        createRepositoryPages(repos);

    } catch (error) {
        // Surface the error in the UI instead of silently failing
        loading.textContent = 'Error loading repositories. Please check the username in script.js';
        console.error('Error:', error);
    }
}

/**
 * Renders an array of GitHub repository objects as cards inside #repos-container.
 *
 * Each card includes the repo name, description, star/fork/language metadata,
 * a link to the local project detail page, and a link to GitHub.
 * Cards are registered with revealObserver for scroll-triggered fade-in.
 *
 * @param {Object[]} repos - Array of repository objects returned by the GitHub API.
 * @param {string}   repos[].name             - Repository name.
 * @param {string}   repos[].description      - Repository description (may be null).
 * @param {number}   repos[].stargazers_count - Number of stars.
 * @param {number}   repos[].forks_count      - Number of forks.
 * @param {string}   repos[].language         - Primary language (may be null).
 * @param {string}   repos[].html_url         - URL to the repo on GitHub.
 * @returns {void}
 */
function displayRepositories(repos) {
    // Target container where all repo cards will be injected
    const container = document.getElementById('repos-container');

    repos.forEach(repo => {
        // Build the card element and populate it with repo data
        const card = document.createElement('div');
        card.className = 'repo-card reveal';

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="repo-meta">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
                ${repo.language ? `<span>💻 ${repo.language}</span>` : ''}
            </div>
            <div class="repo-links">
                <a href="project-pages/${repo.name}.html" class="repo-link">Details</a>
                <a href="${repo.html_url}" target="_blank" class="repo-link">View on GitHub</a>
            </div>
        `;

        // Append the card and wire it into the scroll-reveal observer
        container.appendChild(card);
        revealObserver.observe(card);
    });
}

/**
 * Logs the scaffolding HTML for each repository's standalone detail page.
 *
 * This function does not write files to disk — it prints page templates to the
 * console as a guide for manually creating pages under project-pages/.
 *
 * @param {Object[]} repos - Array of repository objects returned by the GitHub API.
 * @param {string}   repos[].name             - Repository name (used as the page filename).
 * @param {string}   repos[].description      - Repository description.
 * @param {string}   repos[].language         - Primary language.
 * @param {number}   repos[].stargazers_count - Number of stars.
 * @param {number}   repos[].forks_count      - Number of forks.
 * @param {string}   repos[].created_at       - ISO timestamp of repo creation.
 * @param {string}   repos[].updated_at       - ISO timestamp of last update.
 * @param {string}   repos[].homepage         - Optional live-demo URL.
 * @param {string[]} repos[].topics           - Array of topic tags.
 * @param {string}   repos[].html_url         - URL to the repo on GitHub.
 * @returns {void}
 */
function createRepositoryPages(repos) {
    repos.forEach(repo => {
        // Log the target filename so it's easy to identify which file to create
        console.log(`Create page: repo-pages/${repo.name}.html with the following content:`);

        // Full HTML scaffold for a project detail page
        const pageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${repo.name} - My Portfolio</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">My Portfolio</a>
            <ul class="nav-menu">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../bio.html">Bio</a></li>
                <li><a href="../interests.html">Interests</a></li>
                <li><a href="../resume.html">Resume</a></li>
                <li><a href="../repositories.html" class="active">Repositories</a></li>
                <li><a href="../extras.html">Extras</a></li>
                <li><a href="../contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>

    <main class="container">
        <div class="page-header">
            <h1>${repo.name}</h1>
            <a href="${repo.html_url}" target="_blank" class="download-btn">View on GitHub</a>
        </div>

        <div class="content-section">
            <div class="interest-category">
                <h2>Description</h2>
                <p>${repo.description || 'No description available'}</p>
            </div>

            <div class="interest-category">
                <h2>Repository Details</h2>
                <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
                <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                <p><strong>Forks:</strong> ${repo.forks_count}</p>
                <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            </div>

            ${repo.homepage ? `
            <div class="interest-category">
                <h2>Live Demo</h2>
                <p><a href="${repo.homepage}" target="_blank">${repo.homepage}</a></p>
            </div>
            ` : ''}

            <div class="interest-category">
                <h2>Topics</h2>
                <p>${repo.topics && repo.topics.length > 0 ? repo.topics.join(', ') : 'No topics specified'}</p>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <div class="social-links">
                <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" class="social-icon">
                </a>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" class="social-icon">
                </a>
            </div>
            <p>&copy; 2024 My Portfolio. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
        `;

        // Print the scaffold so it can be copied into the appropriate file
        console.log(pageContent);
    });
}

// Kick off the repo fetch only on the projects page
if (document.getElementById('repos-container')) {
    fetchRepositories();
}

// ─── Scroll Reveal ─────────────────────────────────

// IntersectionObserver that adds .visible once an element enters the viewport
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

/**
 * Registers every .reveal, .reveal-left, and .reveal-right element with
 * revealObserver so they animate in when they enter the viewport.
 *
 * Called once on DOMContentLoaded (or immediately if the DOM is already ready).
 *
 * @returns {void}
 */
function initScrollReveal() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });
}

// Defer until DOM is parsed, or run immediately if already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
    initScrollReveal();
}
