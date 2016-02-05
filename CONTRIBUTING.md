This repo actually contains multiple projects in addition to the formal styleguide. In order to start making changes, you'll first need to bootstrap the project:

```bash
npm run bootstrap
```

Make *every* required change across all repos. For a given rule change, this will often involve at least a change to `eslint-config-shopify` and to the README for this repo. You can lint and test your changes across all repos by running:

```bash
npm run check
```

Once you are satisfied with your changes, open a pull request and get your changes merged. Then, follow these steps:

- Update any relevant dependencies (for example, if updating `eslint-plugin-shopify`, update the peer dependency for `eslint-config-shopify`) to the version you are going to bump to
- Update the `CHANGELOG.md` file at the root of the repo
- Commit all of these version-related changes

Finally, run the publishing command:

```bash
npm run publish-all
```

This command will ask you for the new version and will publish new versions of all packages that had changes. The current version is always shown in the `VERSION` file at the root of this repository.
