# Node

## Version Strategy

As described in their [Long Term Support page](https://github.com/nodejs/LTS), Node.js will have two major version changes each year: odd-numbered releases, which are not supported after their six month span as "current", and even-numbered releases, which enter long term support (LTS) for a year and a half after their time as "current".

Given the importance of stability and bugfixes, we recommend that applications stay on the latest LTS release. Once a new release slated for LTS comes out, applications can transition at their own pace. However, applications should switch to the newer release before the end of active LTS for their current version.

In contrast to the recommendation for applications above, your development environment, particularly when working on a non-application project, can take advantage of newer versions of Node.js. This allows you to get the benefits that come with newer versions, such as a faster JavaScript runtime or debugging improvements, without sacrificing stability or security. However, make sure that you continue to test with Node.js versions that represent your production environment. For applications, this means you should test on the same LTS release you use in production. For non-applications (e.g., NPM packages), you should test on versions that are representative of versions your project supports, with a bare minimum that tests run for your lowest supported version.
