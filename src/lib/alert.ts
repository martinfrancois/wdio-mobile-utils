import { mobile$ } from './select/select';
import {
    ANDROID_UISELECTOR_PROPERTIES,
    AndroidSelector,
} from './select/androidSelector';
import { Selector } from './select/selector';
import {
    IOS_PREDICATE_ATTRIBUTES,
    IOS_PREDICATE_COMPARATOR,
    IosSelector,
} from './select/iosSelector';

const SELECTORS = {
    ANDROID: {
        RESOURCE_ID: 'android:id/alertTitle',
    },
    IOS: {
        TYPE: 'XCUIElementTypeAlert',
    },
};

function alertElement(): WebdriverIO.Element {
    return mobile$(
        Selector.custom(
            AndroidSelector.android(
                ANDROID_UISELECTOR_PROPERTIES.RESOURCE_ID,
                SELECTORS.ANDROID.RESOURCE_ID
            ),
            IosSelector.of(
                IOS_PREDICATE_ATTRIBUTES.TYPE,
                IOS_PREDICATE_COMPARATOR.EQUALS,
                SELECTORS.IOS.TYPE
            )
        )
    );
}

/**
 * Waits for a native alert to be shown.
 */
export function waitForAlertDisplayed(): WebdriverIO.Element {
    const element = alertElement();
    element.waitForDisplayed();
    return element;
}

/**
 * Returns whether or not a native alert is shown.
 */
export function isAlertDisplayed(): boolean {
    return alertElement().isDisplayed();
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
