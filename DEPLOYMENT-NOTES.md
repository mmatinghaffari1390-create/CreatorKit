# CreatorKit deployment notes

## Verified status
- The development branch is `creatorkit-v22-initial`; do not publish it by merging automatically.
- The Pages workflow is configured to deploy on pushes to `main` and can also be run manually.
- GitHub Pages has not been confirmed active for this repository yet. After checking repository settings, enable it if needed and verify the first deployment in Actions.
- CI smoke checks passed for commit `74b1f9c3f0dd3d08d1168b534548cb7fb9f4d6ba`; this is not a visual browser test.

## Before public launch
1. Review [pull request #1](https://github.com/mmatinghaffari1390-create/CreatorKit/pull/1), inspect its diff and confirm the checks are green.
2. In the repository, open **Settings → Pages**. If using the included GitHub Actions workflow, choose **GitHub Actions** as the build/deployment source when that option is available.
3. Ensure the Pages workflow is allowed to run and the repository Actions permissions allow the workflow's declared Pages permissions.
4. Only after the owner explicitly approves publishing, merge the pull request into `main`. The Pages workflow is triggered by pushes to `main`.
5. Open the deployment run in **Actions** and confirm the deploy job succeeds. Use the public URL reported by GitHub Pages rather than guessing it.
6. Test the published site on a phone and desktop, including Persian/English switching, each generator, copy, and save/load/delete drafts.

## Security and privacy
- Keep API keys, service-role keys, SMTP credentials, OAuth secrets, and other secrets out of the repository and browser-side code.
- The current tools run locally. Drafts live in the current browser's local storage and do not sync between devices; clearing browser data can remove them.
- Do not describe authentication, cloud persistence, real AI generation, collaboration, or payments as live until the relevant services are configured and tested.
- Static smoke checks do not replace browser, accessibility, privacy, or security testing.

## Safe workflow
Make ordinary site changes on `creatorkit-v22-initial`, review the pull request, and keep `main` unchanged until publishing is explicitly approved.
