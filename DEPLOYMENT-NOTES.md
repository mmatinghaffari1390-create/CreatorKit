# CreatorKit deployment notes

## Verified status
- Development branch: `creatorkit-v22-initial`.
- Pull request [#1](https://github.com/mmatinghaffari1390-create/CreatorKit/pull/1) is open, targets `main`, and has not been merged.
- The PR is currently reported as mergeable with a clean merge state; review the actual diff before approving any merge.
- CI smoke checks passed for the current head commit `b619175a23c0d15afbc936358918d9fba0a1a42b` in both push run [39893841082](https://github.com/mmatinghaffari1390-create/CreatorKit/actions/runs/39893841082) and pull-request run [39893834734](https://github.com/mmatinghaffari1390-create/CreatorKit/actions/runs/39893834734).
- The successful CI runs are automated smoke checks, not a real browser-based visual, accessibility, or security audit.
- GitHub Pages has not been confirmed active for this repository. Do not assume a public site URL exists until GitHub reports a successful deployment.

## Pre-launch QA checklist
Complete these checks in a real browser before calling the site launch-ready:

- [ ] Open the page at mobile and desktop widths; check for horizontal overflow and clipped content.
- [ ] Switch Persian/English repeatedly and confirm RTL/LTR direction, labels, and button text update consistently.
- [ ] Test all eight tools: titles, hashtags, idea prompts, weekly planner, descriptions, hooks, outlines, and script starters.
- [ ] Test copy actions in a normal browser context and confirm the visible success/failure message matches the result.
- [ ] Save several drafts, reload the page, load a draft, delete one, and test malformed/older saved entries gracefully.
- [ ] Navigate with keyboard only; confirm skip link, visible focus, sensible focus order, and no keyboard traps.
- [ ] Enable reduced-motion in the operating system/browser and check that motion is reduced.
- [ ] Inspect browser console for errors and check network requests for unexpected third-party calls.
- [ ] Confirm the page makes no unsupported claims about real AI, accounts, email verification, cross-device sync, collaboration, or payments.
- [ ] Check page title, description, social preview metadata, and legibility on a small screen.

## Before public launch
1. Review the [pull request diff](https://github.com/mmatinghaffari1390-create/CreatorKit/pull/1) and confirm checks remain green.
2. In repository **Settings → Pages**, check whether Pages is enabled. If using the included workflow, choose **GitHub Actions** as the build/deployment source when available.
3. Ensure repository Actions settings allow the workflow's declared Pages permissions.
4. Only after the owner explicitly approves publishing, merge the pull request into `main`. The Pages workflow is configured to run on pushes to `main`.
5. Open the deployment run in **Actions** and confirm the deploy job succeeds. Use the public URL reported by GitHub Pages; do not guess it.
6. Run the pre-launch checklist above against the deployed URL and fix any issues before announcing the site.

## Security and privacy
- Keep API keys, service-role keys, SMTP credentials, OAuth secrets, and other secrets out of the repository and browser-side code.
- Current tools run locally. Drafts live in the current browser's local storage and do not sync between devices; clearing browser data can remove them.
- Do not describe authentication, cloud persistence, real AI generation, collaboration, or payments as live until the relevant services are configured and tested.
- Static smoke checks do not replace browser, accessibility, privacy, or security testing.

## Safe workflow
Make ordinary site changes on `creatorkit-v22-initial`, review the pull request, and keep `main` unchanged until publishing is explicitly approved.
