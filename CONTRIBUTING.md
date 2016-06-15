This repo actually contains multiple projects in addition to the formal styleguide. In order to start making changes, you'll first need to bootstrap the project:

```bash
script/setup
```

Make *every* required change across all repos. For a given rule change, this will often involve at least a change to `eslint-plugin-shopify` and to the README for this repo. You should also update the README(s) for the affected packages and add your changes to the unreleased section in the top-level CHANGELOG. You can lint and test your changes across all repos by running:

```bash
script/test
```

Once you are satisfied with your changes, open a pull request and get your changes merged. Then, update the unreleased section of the CHANGELOG with links to the relevant pull requests, rename the section to the new version, and commit these changes. Finally, run the publishing command:

```bash
script/publish
```

This command will ask you for the new version and will publish new versions of all packages that had changes. The current version is always shown in the `VERSION` file at the root of this repository.
