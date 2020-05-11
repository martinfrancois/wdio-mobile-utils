import { CHROME_APP_ID, DEFAULT_TIMEOUT, SAFARI_BUNDLE_ID } from './constants';
import { assertIdDefined, Os } from './internal/utils';

// see http://appium.io/docs/en/commands/device/app/app-state/
export enum APP_RUNNING_STATE {
    NOT_INSTALLED = 0,
    NOT_RUNNING = 1,
    BACKGROUND_OR_SUSPENDED = 2,
    BACKGROUND = 3,
    FOREGROUND = 4,
}

/**
 * Removes, if present, the ~ character in the beginning of a string.
 * This is useful in cases where the automationText can be passed in by the developer, but needs to be without a ~ in front. This makes
 * sure even if the automationText contains a ~ that is not allowed, that it's properly removed, providing greater convenience.
 */
export function removeStartingTilde(key: string) {
    if (key.startsWith('~')) {
        return key.substring(1); // cut off ~ in front
    } else {
        return key;
    }
}

/**
 * Get the automation text of an element
 *
 * @param {element} element
 *
 * @return {string}
 */
export function getAutomationTextOfElement(element: WebdriverIO.Element) {
    if (browser.isAndroid) {
        return element.getAttribute('content-desc');
    } else {
        return element.getAttribute('label');
    }
}

/**
 * Returns the state of the app.
 * @param {string} appId ID of the app (Android)
 * @param {string} bundleId bundle id of the app (iOS)
 * @see http://appium.io/docs/en/commands/device/app/app-state/
 */
export function queryAppState(appId?: string, bundleId?: string) {
    if (browser.isIOS) {
        assertIdDefined(bundleId, Os.IOS);
        return browser.execute('mobile: queryAppState', { bundleId: bundleId });
    } else {
        assertIdDefined(appId, Os.ANDROID);
        return browser.queryAppState(appId);
    }
}

/**
 * Returns true if the specified app state is met.
 *
 * @param {boolean} state       Which state should be checked for
 * @param {boolean} wait        If set to true, will wait for the app to be running.
 * @param {string} appId        ID of the app (Android)
 * @param {string} bundleId     bundle id of the app (iOS)
 */
export function isAppState(
    state: APP_RUNNING_STATE,
    wait = false,
    appId?: string,
    bundleId?: string
): boolean {
    if (wait) {
        return browser.waitUntil(
            () => {
                return queryAppState(appId, bundleId) === state;
            },
            DEFAULT_TIMEOUT,
            'App is not in state: ' + state
        );
    } else {
        return queryAppState(appId, bundleId) === state;
    }
}

/**
 * Returns true if the specified app state is met for Safari.
 *
 * @param {boolean} state       Which state should be checked for
 * @param {boolean} wait        If set to true, will wait for the app to be running.
 * @param {string} appId        ID of the app (Android)
 * @param {string} bundleId     bundle id of the app (iOS)
 */
export function isBrowserAppState(
    state: APP_RUNNING_STATE,
    wait = false
): boolean {
    if (browser.isIOS) {
        return isAppState(state, wait, undefined, SAFARI_BUNDLE_ID);
    } else {
        return isAppState(state, wait, CHROME_APP_ID, undefined);
    }
}

/**
 * Opens Safari.
 */
export function openSafari() {
    browser.waitUntil(() => {
        browser.execute('mobile: launchApp', { bundleId: SAFARI_BUNDLE_ID });
        return isBrowserAppState(APP_RUNNING_STATE.FOREGROUND, false);
    });
}

/**
 * Get Safari URL.
 */
export function getSafariUrl(): WebdriverIO.Element {
    return $('~URL');
}

/**
 * Opens the app.
 *
 * @param {boolean} wait whether or not the start of the app should be awaited
 * @param {string} appId ID of the app (Android)
 * @param {string} bundleId bundle id of the app (iOS)
 */
export function openApp(wait = false, appId?: string, bundleId?: string) {
    browser.waitUntil(() => {
        if (browser.isAndroid) {
            browser.activateApp(appId);
        } else {
            browser.execute('mobile: activateApp', { bundleId: bundleId });
        }
        return isAppState(APP_RUNNING_STATE.FOREGROUND, wait, appId, bundleId);
    });
}
