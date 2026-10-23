# CreatorKit deployment notes

## Current state
- The static site is being prepared for GitHub Pages.
- Keep API keys, service-role keys, SMTP credentials, and other secrets out of this repository.
- Do not describe authentication, cloud persistence, AI generation, or payments as live until the corresponding services are configured and tested.

## GitHub Pages
1. Upload the site files so `index.html` is at the repository root.
2. In Settings → Pages, choose deployment from a branch and select the branch/folder containing the site.
3. Wait for the Pages workflow/deployment to finish, then test the public URL on mobile and desktop.

## Safe workflow
Use `creatorkit-v22-initial` for site changes and review changes before merging into `main`.
