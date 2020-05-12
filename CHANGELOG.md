# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [7.0.1](https://github.com/martinfrancois/wdio-mobile-utils/compare/6-v7.0.0...6-v7.0.1) (2020-05-12)

## 7.0.0 (2020-05-11)

### ⚠ BREAKING CHANGES

-   **npm:** WebdriverIO v5 was upgraded to WebdriverIO v6.
    On the branch `v5`, the library will still be published for WebdriverIO v5.

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** Replace calls to the method by `$('~URL')`
    The method was removed as it doesn't really serve a purpose and is too simple to be included in a library.

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** Rename calls to the method `getAutomationTextOfElement` to `getAccessibilityIdOfElement`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **androidSelector:** `AndroidSelector.android(...)` is now `AndroidSelector.of(...)`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **iosSelector:** `IosSelector.ios(...)` is now `IosSelector.of(...)`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** App-related utility functions `queryAppState`, `isAppState`, `isBrowserAppState`, `openSafari`, `openApp` were moved from `utils.ts` to `appUtils.ts`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** The old select API (in utils.ts) was replaced by `mobile$(...)` and `mobile$$(...)` methods instead.

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** For consistency, the order of parameters was changed to always include `appId` and `bundleId` last.

To migrate, change all `openApp` calls to include the `wait` parameter as the first parameter, followed by `appId` and `bundleId`

-   **npm:** Since NodeJS 8 is no longer supported from the 31st of December 2019, NodeJS 10 is required as a minimum.

### Features

-   consistently throw an error if the platform is neither Android nor iOS ([7eee09a](https://github.com/martinfrancois/wdio-mobile-utils/commit/7eee09ae1840bff50f3282e06ecc8385f1427437))
-   **alert:** add utility functions ([6d6c93d](https://github.com/martinfrancois/wdio-mobile-utils/commit/6d6c93d0b332895727932a89fbb68a0d30f7c5b8))
-   **alert:** add visibility check for android ([ba129f4](https://github.com/martinfrancois/wdio-mobile-utils/commit/ba129f4563ed545f4fcc8f8e735e76e80c4e792e))
-   **utils:** remove method `getSafariUrl` ([d93ff78](https://github.com/martinfrancois/wdio-mobile-utils/commit/d93ff78a41f181ef435d1d8e361b2633c5026f09))
-   allow timeout to be defined ([0abcb15](https://github.com/martinfrancois/wdio-mobile-utils/commit/0abcb158efeb652592a6d1864b4cca8715cbdf2b))
-   **appium:** add types for appium ([ae1620c](https://github.com/martinfrancois/wdio-mobile-utils/commit/ae1620c73c48b7a84f88693d40cf61463a6e484e))
-   **deeplink:** add deeplink functions ([975a766](https://github.com/martinfrancois/wdio-mobile-utils/commit/975a766974e60b515398b7f2bd5b245d851f72eb))
-   **deeplink:** improve logging output for opening a deeplink in iOS Simulator ([bcf9f06](https://github.com/martinfrancois/wdio-mobile-utils/commit/bcf9f06fe90e8fc99e13738f798b03cb2d98abea))
-   **deeplink:** support iOS devices of any locale when using Appium >=1.17.0 ([b12126f](https://github.com/martinfrancois/wdio-mobile-utils/commit/b12126f98c7e81212312310de7b04f0da16687bd))
-   **environment:** add method to find out if the test is running on an ios simulator ([076c3d1](https://github.com/martinfrancois/wdio-mobile-utils/commit/076c3d1da3927c126006b4ba6dd27228ada2649a))
-   **gestures:** add gestures utility functions ([127c2b3](https://github.com/martinfrancois/wdio-mobile-utils/commit/127c2b35ce13c95324e6ca0f406cc1489401a22a))
-   **internal/utils:** add method to check if argument is of type string ([ffcdd4c](https://github.com/martinfrancois/wdio-mobile-utils/commit/ffcdd4ce0abdd01da1c60ae65e3b1c974cfc96cb))
-   **select:** add accessibilityId selectors ([684a7af](https://github.com/martinfrancois/wdio-mobile-utils/commit/684a7afe837e94b393b4d41a3581f4bdf9a20559))
-   **select:** add initial new select API with `enabled` and `disabled` selectors ([e8aaef0](https://github.com/martinfrancois/wdio-mobile-utils/commit/e8aaef03de539a360ff3f92389a0d484a9b55afe))
-   **select:** add select API to use with selectors ([72e818f](https://github.com/martinfrancois/wdio-mobile-utils/commit/72e818f44db4d6c32c3380190d0fc716d8e86923))
-   **select:** add text selectors ([a2dc010](https://github.com/martinfrancois/wdio-mobile-utils/commit/a2dc0108f50ab9b872414f43b4177121bd1e395d))
-   **select:** add type selector ([10efd99](https://github.com/martinfrancois/wdio-mobile-utils/commit/10efd994ba7eb905823d40747e6ea88f8564c4c3))
-   **select:** implement combination selectors (and & or) for iOS ([1b4918d](https://github.com/martinfrancois/wdio-mobile-utils/commit/1b4918d722a42a23c2279ce1d4a491cfe02f9b9b))
-   **selector:** allow either the iOS or Android selector to be null ([108209f](https://github.com/martinfrancois/wdio-mobile-utils/commit/108209f7145dab763c451dbe6e48c7673e28cfeb))
-   **selector:** implement and & or for android (happy path) ([af78f42](https://github.com/martinfrancois/wdio-mobile-utils/commit/af78f428704c809179e3ade22dfe795d50aee92e))
-   **selector:** implement edge cases for or & and combinations on Android ([2a9bd72](https://github.com/martinfrancois/wdio-mobile-utils/commit/2a9bd72d6c3abe7244cb8d41123b355781b8ac7a))
-   **utils:** add utility functions ([b6e79b1](https://github.com/martinfrancois/wdio-mobile-utils/commit/b6e79b11787b2cd0853524671cfda5f38e7fcc93))
-   **utils:** remove old select API in favor of new select API ([4503cb4](https://github.com/martinfrancois/wdio-mobile-utils/commit/4503cb41f261aa0fd26e6ab50c8699d18fede7f9))

### Bug Fixes

-   **deeplink:** compilation error due to renamed import ([ce14b4c](https://github.com/martinfrancois/wdio-mobile-utils/commit/ce14b4ca7a5891bc6a19ce45395b651cd094b9ff))
-   **deeplink:** deeplink only finding `XCUIElementTypeTextField` but not `XCUIElementTypeButton` on iPhone Simulator ([27a097b](https://github.com/martinfrancois/wdio-mobile-utils/commit/27a097bef5ba85a05ef88bf7cd09e65a11759ce2))
-   **deeplink:** errors of `bundleId` not being defined ([d532a66](https://github.com/martinfrancois/wdio-mobile-utils/commit/d532a66523046262cc54554363a137b9e9b1fa58))
-   **deeplink:** fix deeplink execution on Android ([0b29cf5](https://github.com/martinfrancois/wdio-mobile-utils/commit/0b29cf51d653e5c64f972644cded903988c5ac7c))
-   **deeplink:** implement backward compatibility layer differently to fix tests on Sauce Labs Virtual Cloud iOS Simulators ([476d7b3](https://github.com/martinfrancois/wdio-mobile-utils/commit/476d7b3532e2d58470899cb13b0313f146818248))
-   **deeplink:** remove context approach for real devices ([9b52082](https://github.com/martinfrancois/wdio-mobile-utils/commit/9b52082892db76e89b0bf7f840ebbfe1748fbcfc))
-   **select:** throw an error only when a selector is really accessed on a platform which is null ([54a0700](https://github.com/martinfrancois/wdio-mobile-utils/commit/54a0700822c77cc406c9d87a5a78c2896a94f616))

*   **androidSelector:** rename factory method to `of` ([becd0d0](https://github.com/martinfrancois/wdio-mobile-utils/commit/becd0d0f0180e24d38a7abc342960515d68be2b0))
*   **iosSelector:** rename factory method to `of` ([33bfe60](https://github.com/martinfrancois/wdio-mobile-utils/commit/33bfe60887c17645647019e6b154130d0e5a9979))
*   **utils:** change parameter order for `appId` and `bundleId` to be always last ([8e5b7cb](https://github.com/martinfrancois/wdio-mobile-utils/commit/8e5b7cb582ad1e8eee84bb7c9c8c9b642886a2f4))
*   **utils:** move app-related utility functions to appUtils.ts ([ef4eb71](https://github.com/martinfrancois/wdio-mobile-utils/commit/ef4eb712b75254d2bc7015043b793aa158be3d61))
*   **utils:** rename `getAutomationTextOfElement` to `getAccessibilityIdOfElement` ([0cac320](https://github.com/martinfrancois/wdio-mobile-utils/commit/0cac32008ceec913b9dde7024dba2ee91590838e))

### build

-   **npm:** define NodeJS 10 as minimum ([4006f66](https://github.com/martinfrancois/wdio-mobile-utils/commit/4006f66890d57bdd1e0036a53838cbdec21f0b4a))
-   **npm:** update WebdriverIO version to v6 ([b106204](https://github.com/martinfrancois/wdio-mobile-utils/commit/b1062048ad40b41bfffe77fee499309dd5a1f355))

## [6.0.0](https://github.com/martinfrancois/wdio-mobile-utils/compare/5-v5.0.0...5-v6.0.0) (2020-05-11)

### ⚠ BREAKING CHANGES

-   **utils:** Replace calls to the method by `$('~URL')`
    The method was removed as it doesn't really serve a purpose and is too simple to be included in a library.

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** Rename calls to the method `getAutomationTextOfElement` to `getAccessibilityIdOfElement`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

### Features

-   consistently throw an error if the platform is neither Android nor iOS ([7eee09a](https://github.com/martinfrancois/wdio-mobile-utils/commit/7eee09ae1840bff50f3282e06ecc8385f1427437))
-   **utils:** remove method `getSafariUrl` ([d93ff78](https://github.com/martinfrancois/wdio-mobile-utils/commit/d93ff78a41f181ef435d1d8e361b2633c5026f09))

*   **utils:** rename `getAutomationTextOfElement` to `getAccessibilityIdOfElement` ([0cac320](https://github.com/martinfrancois/wdio-mobile-utils/commit/0cac32008ceec913b9dde7024dba2ee91590838e))

## 5.0.0 (2020-05-11)

### ⚠ BREAKING CHANGES

-   **androidSelector:** `AndroidSelector.android(...)` is now `AndroidSelector.of(...)`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **iosSelector:** `IosSelector.ios(...)` is now `IosSelector.of(...)`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** App-related utility functions `queryAppState`, `isAppState`, `isBrowserAppState`, `openSafari`, `openApp` were moved from `utils.ts` to `appUtils.ts`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** The old select API (in utils.ts) was replaced by `mobile$(...)` and `mobile$$(...)` methods instead.

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** For consistency, the order of parameters was changed to always include `appId` and `bundleId` last.

To migrate, change all `openApp` calls to include the `wait` parameter as the first parameter, followed by `appId` and `bundleId`

-   **npm:** Since NodeJS 8 is no longer supported from the 31st of December 2019, NodeJS 10 is required as a minimum.

### Features

-   allow timeout to be defined ([0abcb15](https://github.com/martinfrancois/wdio-mobile-utils/commit/0abcb158efeb652592a6d1864b4cca8715cbdf2b))
-   **alert:** add utility functions ([6d6c93d](https://github.com/martinfrancois/wdio-mobile-utils/commit/6d6c93d0b332895727932a89fbb68a0d30f7c5b8))
-   **alert:** add visibility check for android ([ba129f4](https://github.com/martinfrancois/wdio-mobile-utils/commit/ba129f4563ed545f4fcc8f8e735e76e80c4e792e))
-   **appium:** add types for appium ([ae1620c](https://github.com/martinfrancois/wdio-mobile-utils/commit/ae1620c73c48b7a84f88693d40cf61463a6e484e))
-   **deeplink:** add deeplink functions ([975a766](https://github.com/martinfrancois/wdio-mobile-utils/commit/975a766974e60b515398b7f2bd5b245d851f72eb))
-   **deeplink:** improve logging output for opening a deeplink in iOS Simulator ([bcf9f06](https://github.com/martinfrancois/wdio-mobile-utils/commit/bcf9f06fe90e8fc99e13738f798b03cb2d98abea))
-   **deeplink:** support iOS devices of any locale when using Appium >=1.17.0 ([b12126f](https://github.com/martinfrancois/wdio-mobile-utils/commit/b12126f98c7e81212312310de7b04f0da16687bd))
-   **environment:** add method to find out if the test is running on an ios simulator ([076c3d1](https://github.com/martinfrancois/wdio-mobile-utils/commit/076c3d1da3927c126006b4ba6dd27228ada2649a))
-   **gestures:** add gestures utility functions ([127c2b3](https://github.com/martinfrancois/wdio-mobile-utils/commit/127c2b35ce13c95324e6ca0f406cc1489401a22a))
-   **internal/utils:** add method to check if argument is of type string ([ffcdd4c](https://github.com/martinfrancois/wdio-mobile-utils/commit/ffcdd4ce0abdd01da1c60ae65e3b1c974cfc96cb))
-   **select:** add accessibilityId selectors ([684a7af](https://github.com/martinfrancois/wdio-mobile-utils/commit/684a7afe837e94b393b4d41a3581f4bdf9a20559))
-   **select:** add initial new select API with `enabled` and `disabled` selectors ([e8aaef0](https://github.com/martinfrancois/wdio-mobile-utils/commit/e8aaef03de539a360ff3f92389a0d484a9b55afe))
-   **select:** add select API to use with selectors ([72e818f](https://github.com/martinfrancois/wdio-mobile-utils/commit/72e818f44db4d6c32c3380190d0fc716d8e86923))
-   **select:** add text selectors ([a2dc010](https://github.com/martinfrancois/wdio-mobile-utils/commit/a2dc0108f50ab9b872414f43b4177121bd1e395d))
-   **select:** add type selector ([10efd99](https://github.com/martinfrancois/wdio-mobile-utils/commit/10efd994ba7eb905823d40747e6ea88f8564c4c3))
-   **select:** implement combination selectors (and & or) for iOS ([1b4918d](https://github.com/martinfrancois/wdio-mobile-utils/commit/1b4918d722a42a23c2279ce1d4a491cfe02f9b9b))
-   **selector:** allow either the iOS or Android selector to be null ([108209f](https://github.com/martinfrancois/wdio-mobile-utils/commit/108209f7145dab763c451dbe6e48c7673e28cfeb))
-   **selector:** implement and & or for android (happy path) ([af78f42](https://github.com/martinfrancois/wdio-mobile-utils/commit/af78f428704c809179e3ade22dfe795d50aee92e))
-   **selector:** implement edge cases for or & and combinations on Android ([2a9bd72](https://github.com/martinfrancois/wdio-mobile-utils/commit/2a9bd72d6c3abe7244cb8d41123b355781b8ac7a))
-   **utils:** add utility functions ([b6e79b1](https://github.com/martinfrancois/wdio-mobile-utils/commit/b6e79b11787b2cd0853524671cfda5f38e7fcc93))
-   **utils:** remove old select API in favor of new select API ([4503cb4](https://github.com/martinfrancois/wdio-mobile-utils/commit/4503cb41f261aa0fd26e6ab50c8699d18fede7f9))

### Bug Fixes

-   **deeplink:** compilation error due to renamed import ([ce14b4c](https://github.com/martinfrancois/wdio-mobile-utils/commit/ce14b4ca7a5891bc6a19ce45395b651cd094b9ff))
-   **deeplink:** deeplink only finding `XCUIElementTypeTextField` but not `XCUIElementTypeButton` on iPhone Simulator ([27a097b](https://github.com/martinfrancois/wdio-mobile-utils/commit/27a097bef5ba85a05ef88bf7cd09e65a11759ce2))
-   **deeplink:** errors of `bundleId` not being defined ([d532a66](https://github.com/martinfrancois/wdio-mobile-utils/commit/d532a66523046262cc54554363a137b9e9b1fa58))
-   **deeplink:** implement backward compatibility layer differently to fix tests on Sauce Labs Virtual Cloud iOS Simulators ([476d7b3](https://github.com/martinfrancois/wdio-mobile-utils/commit/476d7b3532e2d58470899cb13b0313f146818248))
-   **deeplink:** remove context approach for real devices ([9b52082](https://github.com/martinfrancois/wdio-mobile-utils/commit/9b52082892db76e89b0bf7f840ebbfe1748fbcfc))
-   **select:** throw an error only when a selector is really accessed on a platform which is null ([54a0700](https://github.com/martinfrancois/wdio-mobile-utils/commit/54a0700822c77cc406c9d87a5a78c2896a94f616))

### build

-   **npm:** define NodeJS 10 as minimum ([4006f66](https://github.com/martinfrancois/wdio-mobile-utils/commit/4006f66890d57bdd1e0036a53838cbdec21f0b4a))

*   **androidSelector:** rename factory method to `of` ([becd0d0](https://github.com/martinfrancois/wdio-mobile-utils/commit/becd0d0f0180e24d38a7abc342960515d68be2b0))
*   **iosSelector:** rename factory method to `of` ([33bfe60](https://github.com/martinfrancois/wdio-mobile-utils/commit/33bfe60887c17645647019e6b154130d0e5a9979))
*   **utils:** change parameter order for `appId` and `bundleId` to be always last ([8e5b7cb](https://github.com/martinfrancois/wdio-mobile-utils/commit/8e5b7cb582ad1e8eee84bb7c9c8c9b642886a2f4))
*   **utils:** move app-related utility functions to appUtils.ts ([ef4eb71](https://github.com/martinfrancois/wdio-mobile-utils/commit/ef4eb712b75254d2bc7015043b793aa158be3d61))

### [4.0.1](https://github.com/martinfrancois/wdio-mobile-utils/compare/v4.0.0...v4.0.1) (2020-05-11)

### Bug Fixes

-   **select:** throw an error only when a selector is really accessed on a platform which is null ([54a0700](https://github.com/martinfrancois/wdio-mobile-utils/commit/54a0700822c77cc406c9d87a5a78c2896a94f616))

## [4.0.0](https://github.com/martinfrancois/wdio-mobile-utils/compare/v3.2.0...v4.0.0) (2020-05-11)

### ⚠ BREAKING CHANGES

-   **androidSelector:** `AndroidSelector.android(...)` is now `AndroidSelector.of(...)`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **iosSelector:** `IosSelector.ios(...)` is now `IosSelector.of(...)`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** App-related utility functions `queryAppState`, `isAppState`, `isBrowserAppState`, `openSafari`, `openApp` were moved from `utils.ts` to `appUtils.ts`

Signed-off-by: martinfrancois <f.martin@fastmail.com>

-   **utils:** The old select API (in utils.ts) was replaced by `mobile$(...)` and `mobile$$(...)` methods instead.

Signed-off-by: martinfrancois <f.martin@fastmail.com>

### Features

-   **internal/utils:** add method to check if argument is of type string ([ffcdd4c](https://github.com/martinfrancois/wdio-mobile-utils/commit/ffcdd4ce0abdd01da1c60ae65e3b1c974cfc96cb))
-   **select:** add accessibilityId selectors ([684a7af](https://github.com/martinfrancois/wdio-mobile-utils/commit/684a7afe837e94b393b4d41a3581f4bdf9a20559))
-   **select:** add initial new select API with `enabled` and `disabled` selectors ([e8aaef0](https://github.com/martinfrancois/wdio-mobile-utils/commit/e8aaef03de539a360ff3f92389a0d484a9b55afe))
-   **select:** add select API to use with selectors ([72e818f](https://github.com/martinfrancois/wdio-mobile-utils/commit/72e818f44db4d6c32c3380190d0fc716d8e86923))
-   **select:** add text selectors ([a2dc010](https://github.com/martinfrancois/wdio-mobile-utils/commit/a2dc0108f50ab9b872414f43b4177121bd1e395d))
-   **select:** add type selector ([10efd99](https://github.com/martinfrancois/wdio-mobile-utils/commit/10efd994ba7eb905823d40747e6ea88f8564c4c3))
-   **select:** implement combination selectors (and & or) for iOS ([1b4918d](https://github.com/martinfrancois/wdio-mobile-utils/commit/1b4918d722a42a23c2279ce1d4a491cfe02f9b9b))
-   **selector:** allow either the iOS or Android selector to be null ([108209f](https://github.com/martinfrancois/wdio-mobile-utils/commit/108209f7145dab763c451dbe6e48c7673e28cfeb))
-   **selector:** implement and & or for android (happy path) ([af78f42](https://github.com/martinfrancois/wdio-mobile-utils/commit/af78f428704c809179e3ade22dfe795d50aee92e))
-   **selector:** implement edge cases for or & and combinations on Android ([2a9bd72](https://github.com/martinfrancois/wdio-mobile-utils/commit/2a9bd72d6c3abe7244cb8d41123b355781b8ac7a))
-   **utils:** remove old select API in favor of new select API ([4503cb4](https://github.com/martinfrancois/wdio-mobile-utils/commit/4503cb41f261aa0fd26e6ab50c8699d18fede7f9))

*   **androidSelector:** rename factory method to `of` ([becd0d0](https://github.com/martinfrancois/wdio-mobile-utils/commit/becd0d0f0180e24d38a7abc342960515d68be2b0))
*   **iosSelector:** rename factory method to `of` ([33bfe60](https://github.com/martinfrancois/wdio-mobile-utils/commit/33bfe60887c17645647019e6b154130d0e5a9979))
*   **utils:** move app-related utility functions to appUtils.ts ([ef4eb71](https://github.com/martinfrancois/wdio-mobile-utils/commit/ef4eb712b75254d2bc7015043b793aa158be3d61))

## [3.2.0](https://github.com/martinfrancois/wdio-mobile-utils/compare/v3.1.3...v3.2.0) (2020-05-10)

### Features

-   **alert:** add utility functions ([6d6c93d](https://github.com/martinfrancois/wdio-mobile-utils/commit/6d6c93d0b332895727932a89fbb68a0d30f7c5b8))
-   **alert:** add visibility check for android ([ba129f4](https://github.com/martinfrancois/wdio-mobile-utils/commit/ba129f4563ed545f4fcc8f8e735e76e80c4e792e))

### [3.1.3](https://github.com/martinfrancois/wdio-mobile-utils/compare/v3.1.2...v3.1.3) (2020-05-10)

### [3.1.2](https://github.com/martinfrancois/wdio-mobile-utils/compare/v3.1.1...v3.1.2) (2020-05-10)

### [3.1.1](https://github.com/martinfrancois/wdio-mobile-utils/compare/v3.1.0...v3.1.1) (2020-05-09)

### Bug Fixes

-   **deeplink:** implement backward compatibility layer differently to fix tests on Sauce Labs Virtual Cloud iOS Simulators ([476d7b3](https://github.com/martinfrancois/wdio-mobile-utils/commit/476d7b3532e2d58470899cb13b0313f146818248))

## [3.1.0](https://github.com/martinfrancois/wdio-mobile-utils/compare/v3.0.1...v3.1.0) (2020-05-09)

### Features

-   **deeplink:** support iOS devices of any locale when using Appium >=1.17.0 ([b12126f](https://github.com/martinfrancois/wdio-mobile-utils/commit/b12126f98c7e81212312310de7b04f0da16687bd))

### Bug Fixes

-   **deeplink:** deeplink only finding `XCUIElementTypeTextField` but not `XCUIElementTypeButton` on iPhone Simulator ([27a097b](https://github.com/martinfrancois/wdio-mobile-utils/commit/27a097bef5ba85a05ef88bf7cd09e65a11759ce2))

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
