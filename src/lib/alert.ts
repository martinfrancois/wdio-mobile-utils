import { selectEqualsType } from './utils';

const SELECTORS = {
    ANDROID: {
        ALERT: '',
    },
    IOS: {
        ALERT: 'XCUIElementTypeAlert',
    },
};

/**
 * Waits for a native alert to be shown.
 */
export function waitForAlertDisplayed() {
    if (browser.isAndroid) {
        throw new Error('Not implemented yet for Android!');
    } else {
        return selectEqualsType(SELECTORS.IOS.ALERT, true);
    }
}

/**
 * Returns whether or not a native alert is shown.
 */
export function isAlertDisplayed() {
    if (browser.isAndroid) {
        throw new Error('Not implemented yet for Android!');
    } else {
        return selectEqualsType(SELECTORS.IOS.ALERT, false);
    }
}

/**
 * Accepts the alert in a cross-platform way.
 * For example, this would press the "OK" or "Yes" button.
 */
export function acceptAlert() {
    if (browser.isAndroid) {
        throw new Error('Not implemented yet for Android!');
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
export function dismissAlert() {
    if (browser.isAndroid) {
        throw new Error('Not implemented yet for Android!');
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
