# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.0.1](https://github.com/martinfrancois/wdio-mobile-utils/compare/v3.0.0...v3.0.1) (2020-05-09)

### Bug Fixes

-   **deeplink:** remove context approach for real devices ([9b52082](https://github.com/martinfrancois/wdio-mobile-utils/commit/9b52082892db76e89b0bf7f840ebbfe1748fbcfc))

## [3.0.0](https://github.com/martinfrancois/wdio-mobile-utils/compare/v2.1.2...v3.0.0) (2020-05-09)

### ⚠ BREAKING CHANGES

-   **utils:** For consistency, the order of parameters was changed to always include `appId` and `bundleId` last.

To migrate, change all `openApp` calls to include the `wait` parameter as the first parameter, followed by `appId` and `bundleId`

### Features

-   **deeplink:** improve logging output for opening a deeplink in iOS Simulator ([bcf9f06](https://github.com/martinfrancois/wdio-mobile-utils/commit/bcf9f06fe90e8fc99e13738f798b03cb2d98abea))

### Bug Fixes

-   **deeplink:** errors of `bundleId` not being defined ([d532a66](https://github.com/martinfrancois/wdio-mobile-utils/commit/d532a66523046262cc54554363a137b9e9b1fa58))

*   **utils:** change parameter order for `appId` and `bundleId` to be always last ([8e5b7cb](https://github.com/martinfrancois/wdio-mobile-utils/commit/8e5b7cb582ad1e8eee84bb7c9c8c9b642886a2f4))

### [2.1.2](https://github.com/martinfrancois/wdio-mobile-utils/compare/v2.1.1...v2.1.2) (2020-05-09)

### Bug Fixes

-   **deeplink:** compilation error due to renamed import ([ce14b4c](https://github.com/martinfrancois/wdio-mobile-utils/commit/ce14b4ca7a5891bc6a19ce45395b651cd094b9ff))

### [2.1.1](https://github.com/martinfrancois/wdio-mobile-utils/compare/v2.1.0...v2.1.1) (2020-05-09)

## [2.1.0](https://github.com/martinfrancois/wdio-mobile-utils/compare/v2.0.4...v2.1.0) (2020-05-09)

### Features

-   **appium:** add types for appium ([ae1620c](https://github.com/martinfrancois/wdio-mobile-utils/commit/ae1620c73c48b7a84f88693d40cf61463a6e484e))
-   **deeplink:** add deeplink functions ([975a766](https://github.com/martinfrancois/wdio-mobile-utils/commit/975a766974e60b515398b7f2bd5b245d851f72eb))
-   **environment:** add method to find out if the test is running on an ios simulator ([076c3d1](https://github.com/martinfrancois/wdio-mobile-utils/commit/076c3d1da3927c126006b4ba6dd27228ada2649a))
-   **utils:** add utility functions ([b6e79b1](https://github.com/martinfrancois/wdio-mobile-utils/commit/b6e79b11787b2cd0853524671cfda5f38e7fcc93))

### [2.0.4](https://github.com/martinfrancois/wdio-mobile-utils/compare/v2.0.3...v2.0.4) (2020-03-04)

### [2.0.3](https://github.com/martinfrancois/wdio-mobile-utils/compare/v2.0.2...v2.0.3) (2020-03-04)

### [2.0.2](https://github.com/martinfrancois/wdio-mobile-utils/compare/v2.0.1...v2.0.2) (2020-03-04)

### [2.0.1](https://github.com/martinfrancois/wdio-mobile-utils/compare/v2.0.0...v2.0.1) (2020-03-04)

## 2.0.0 (2020-03-03)

### ⚠ BREAKING CHANGES

-   **npm:** Since NodeJS 8 is no longer supported from the 31st of December 2019, NodeJS 10 is required as a minimum.

### build

-   **npm:** define NodeJS 10 as minimum ([4006f66](https://github.com/martinfrancois/wdio-mobile-utils/commit/4006f66890d57bdd1e0036a53838cbdec21f0b4a))
