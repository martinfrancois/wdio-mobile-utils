<h1 align="center">wdio-mobile-utils</h1>

<p align="center">A cross-platform mobile end-to-end testing library for WebdriverIO.</p>

<p align="center">
    <a href="https://www.npmjs.com/package/wdio-mobile-utils"><img src="https://img.shields.io/npm/v/wdio-mobile-utils/latest.svg?style=flat-square" alt="NPM Version" /></a>
    <a href="https://travis-ci.com/martinfrancois/wdio-mobile-utils"><img src="https://img.shields.io/travis/com/martinfrancois/wdio-mobile-utils?style=flat-square" alt="Travis CI Build Status" /></a>
    <a href="https://github.com/martinfrancois/wdio-mobile-utils/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/wdio-mobile-utils.svg?style=flat-square" alt="GitHub license" /></a>
    <a href="https://www.npmjs.com/package/wdio-mobile-utils"><img src="https://img.shields.io/npm/dm/wdio-mobile-utils.svg?style=flat-square" alt="NPM Downloads" /></a>
    <a href="https://codecov.io/gh/martinfrancois/wdio-mobile-utils"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/martinfrancois/wdio-mobile-utils.svg?style=flat-square"></a>
    <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square" alt="Commitizen friendly" /></a>
</p>

## Install

Releases for WebdriverIO v5 are released on the `v5` branch, while releases for WebdriverIO v6 are releases on the `master` branch.

Check the [releases here](https://github.com/martinfrancois/wdio-mobile-utils/releases), the releases for WebdriverIO v6 are prefixed with `6-`, while releases for WebdriverIO v5 are prefixed with `5-`.

```
npm install -D wdio-mobile-utils@7.0.1          # WebdriverIO v6
npm install -D wdio-mobile-utils@6.0.2          # WebdriverIO v5
```

## TSDoc

You can find documentation for the individual methods here:
https://martinfrancois.github.io/wdio-mobile-utils/

## Mobile Selectors

In cases where you cannot use `accessibilityId`s, it is recommended to use `ios predicate` for iOS and `UiSelector` for Android.
wdio-mobile-utils provides an abstraction to build mobile selectors easily which are cross-platform.
This means you can build your selectors using `mobile$` and `mobile$$` and wdio-mobile-utils will automatically convert this into an `ios predicate` for iOS and `UiSelector` for Android for you automatically, depending on which platform the test is running on.

To select **one element**, use `mobile$`, which is the equivalent to `$` in WebdriverIO.
To select **all elements** use `mobile$$`, which is the equivalent to `$$` in WebdriverIO.

For example, to select a **button** with the text `Login` which works on **both Android and iOS**, we can use the following selector with wdio-mobile-utils:

```javascript
// compact form
mobile$(Selector.and(Selector.type(Type.BUTTON), Selector.text('Login')));

// long form
mobile$(Selector.and(Selector.type(Type.BUTTON), Selector.text('Login')));
```

Internally, it will convert this into the following `ios predicate` and `UiSelector` selectors, depending on the platform the test is running on:

```javascript
// UiSelector
$('android=new UiSelector().className("android.widget.Button").text("Login")');

// ios predicate
$("-ios predicate string:type == 'XCUIElementTypeButton' && label == 'Login'");
```

You can find all of the different `Selector`s you can use in the [TSDoc for Selector](https://martinfrancois.github.io/wdio-mobile-utils/classes/selector.html).

### Custom Selectors

If you can't find a selector you're looking for, if it's generic enough to be useful for others, consider contributing with a [PR here](https://github.com/martinfrancois/wdio-mobile-utils/pulls).

If you need to use a very specific selector or one that may only work on one platform and you still want to make use of the easy fluent API of wdio-mobile-utils, you can use a custom selector.

For example:

```javascript
mobile$(
    Selector.custom(
        AndroidSelector.of(ANDROID_UISELECTOR_PROPERTIES.RESOURCE_ID, 'URL'),
        IosSelector.of(
            IOS_PREDICATE_ATTRIBUTES.VALUE,
            IOS_PREDICATE_COMPARATOR.EQUALS,
            'URL'
        )
    )
);
```

To create a selector which only works on one platform, set one of the selectors to `null`, like so:

```javascript
mobile$(
    Selector.custom(
        null, // no selector on Android
        IosSelector.of(
            IOS_PREDICATE_ATTRIBUTES.RECT,
            IOS_PREDICATE_COMPARATOR.EQUALS,
            'URL'
        )
    )
);
```

Note that when creating a selector which only works on one platform (for example, only for iOS), if a test is executed on the other platform (for example, Android), it will throw an error.
This also applies in cases where a selector which only works on one platform is combined with a cross-platform selector, which is used on the other platform.

## Usage

Check out the [recording](http://saucecon.com/agenda-2020?agendaPath=session/251027) and the [slides](https://github.com/martinfrancois/saucecon-2020-1-codebase-2-mobile-platforms/blob/master/SauceCon_2020_Online.pdf) of my presentation at SauceCon Online 2020 for detailed information on how to use the library.
