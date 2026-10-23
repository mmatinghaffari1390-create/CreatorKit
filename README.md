# CreatorKit

A free-first, bilingual creator toolkit for YouTubers, gamers, streamers, and digital creators.

## Included now

- Persian (RTL) and English (LTR) interface
- Video title ideas
- Starter hashtags from a topic
- Random idea prompts
- Weekly publishing planner
- Video descriptions, opening hooks, outlines, and script starters
- Copy-to-clipboard with a fallback for browsers that restrict the Clipboard API
- A local draft library: save, load, and delete up to 20 drafts on the current browser/device
- Responsive layout, keyboard skip link, visible focus indicators, and reduced-motion support

## Run locally

No build step or package installation is needed. Open `index.html` in a modern browser, or serve the repository with any static HTTP server. For example, with Node.js installed:

```sh
npx serve .
```

## Checks

Run the repository's automated static smoke checks with Node.js 20 or newer:

```sh
node scripts/smoke-check.mjs
```

The GitHub Actions workflow runs the same checks for pushes to the development branch and pull requests targeting `main`.

## Privacy and current limitations

The current tools run locally in the browser. Drafts are stored in that browser's local storage and do not sync to another device. Clearing browser data may remove them, so copy important work elsewhere as a backup.

This version does **not** yet provide real AI generation, user accounts, email verification, cloud sync, collaboration, or payments. Those features need a backend/provider integration, privacy and security review, and any required credentials. The site must not imply those features are active until they are implemented and tested.

## GitHub Pages

The Pages workflow is configured for deployment from the repository's default branch. This development branch is intentionally kept separate; the pull request must be reviewed and merged before the main-branch deployment workflow can publish this version.
