import {
    ANDROID_UISELECTOR_PROPERTIES,
    buildAndroidUiSelector,
    selectEqualsType,
} from './utils';

const SELECTORS = {
    ANDROID: {
        RESOURCE_ID: 'android:id/alertTitle',
    },
    IOS: {
        TYPE: 'XCUIElementTypeAlert',
    },
};

function getAndroidAlert(): WebdriverIO.Element {
    return $(
        buildAndroidUiSelector(
            ANDROID_UISELECTOR_PROPERTIES.RESOURCE_ID,
            SELECTORS.ANDROID.RESOURCE_ID
        )
    );
}

/**
 * Waits for a native alert to be shown.
 */
export function waitForAlertDisplayed(): WebdriverIO.Element {
    if (browser.isAndroid) {
        const element = getAndroidAlert();
        element.waitForDisplayed();
        return element;
    } else {
        return selectEqualsType(
            SELECTORS.IOS.TYPE,
            true
        ) as WebdriverIO.Element;
    }
}

/**
 * Returns whether or not a native alert is shown.
 */
export function isAlertDisplayed(): boolean {
    if (browser.isAndroid) {
        return getAndroidAlert().isDisplayed();
    } else {
        return (selectEqualsType(
            SELECTORS.IOS.TYPE,
            false
        ) as WebdriverIO.Element).isDisplayed();
    }
}

/**
 * Accepts the alert in a cross-platform way.
 * For example, this would press the "OK" or "Yes" button.
 */
export function acceptAlert(): void {
    if (browser.isAndroid) {
        browser.execute('mobile: acceptAlert');
    } else {
        // NOTE: using the button name as accessibility identifier does NOT work!
        // iOS Gestures are being used here:
        // http://appium.io/docs/en/writing-running-appium/ios/ios-xctest-mobile-gestures/
        browser.execute('mobile: alert', { action: 'accept' });
    }
}

/**
 * Dismisses the alert in a cross-platform way.
 * For example, this would press the "Close", "Cancel" or "No" button.
 */
export function dismissAlert(): void {
    if (browser.isAndroid) {
        browser.execute('mobile: dismissAlert');
    } else {
        // NOTE: using the button name as accessibility identifier does NOT work!
        // iOS Gestures are being used here:
        // http://appium.io/docs/en/writing-running-appium/ios/ios-xctest-mobile-gestures/
        browser.execute('mobile: alert', { action: 'dismiss' });
    }
}

/**
 * Returns the text of an alert.
 * @param wait whether to wait for an alert to appear or not
 * @returns the text of the alert or {@code null} if no alert is displayed
 */
export function getAlertText(wait: false): string | null {
    if (wait) {
        waitForAlertDisplayed();
    } else {
        if (!isAlertDisplayed()) {
            return null;
        }
    }
    return browser.getAlertText();
}
