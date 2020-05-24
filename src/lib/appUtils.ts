// see http://appium.io/docs/en/commands/device/app/app-state/
import { CHROME_APP_ID, DEFAULT_TIMEOUT, SAFARI_BUNDLE_ID } from './constants';
import {
    assertIdDefined,
    Platform,
    UNSUPPORTED_PLATFORM_ERROR,
} from './internal/utils';

export enum APP_RUNNING_STATE {
    NOT_INSTALLED = 0,
    NOT_RUNNING = 1,
    BACKGROUND_OR_SUSPENDED = 2,
    BACKGROUND = 3,
    FOREGROUND = 4,
}

/**
 * Returns the state of the app.
 * @param {string} appId ID of the app (Android)
 * @param {string} bundleId bundle id of the app (iOS)
 * @returns {APP_RUNNING_STATE} the current app's running state
 * @see http://appium.io/docs/en/commands/device/app/app-state/
 * @category App Utility
 */
export function queryAppState(
    appId?: string,
    bundleId?: string
): APP_RUNNING_STATE {
    if (browser.isIOS) {
        assertIdDefined(bundleId, Platform.IOS);
        return browser.execute('mobile: queryAppState', { bundleId: bundleId });
    } else if (browser.isAndroid) {
        assertIdDefined(appId, Platform.ANDROID);
        return browser.queryAppState(appId);
    }
    throw new Error(UNSUPPORTED_PLATFORM_ERROR);
}

/**
 * Returns true if the specified app state is met.
 *
 * @param {boolean} state       which state to check for
 * @param {boolean} wait        If set to true, will wait for the app to be running.
 * @param {string} appId        ID of the app (Android)
 * @param {string} bundleId     bundle id of the app (iOS)
 * @param {number} timeout      how long to wait until the state is met
 * @category App Utility
 */
export function isAppState(
    state: APP_RUNNING_STATE,
    wait = false,
    appId?: string,
    bundleId?: string,
    timeout = DEFAULT_TIMEOUT
): boolean {
    if (wait) {
        return browser.waitUntil(
            () => {
                return queryAppState(appId, bundleId) === state;
            },
            timeout,
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
 * @category App Utility
 */
export function isBrowserAppState(
    state: APP_RUNNING_STATE,
    wait = false
): boolean {
    if (browser.isIOS) {
        return isAppState(state, wait, undefined, SAFARI_BUNDLE_ID);
    } else if (browser.isAndroid) {
        return isAppState(state, wait, CHROME_APP_ID, undefined);
    }
    throw new Error(UNSUPPORTED_PLATFORM_ERROR);
}

/**
 * Opens Safari and waits until it is running.
 * @category App Utility
 */
export function openSafari(): void {
    browser.waitUntil(() => {
        browser.execute('mobile: launchApp', { bundleId: SAFARI_BUNDLE_ID });
        return isBrowserAppState(APP_RUNNING_STATE.FOREGROUND, false);
    });
}

/**
 * Opens the app.
 *
 * @param {boolean} wait whether or not the start of the app should be awaited
 * @param {string} appId ID of the app (Android)
 * @param {string} bundleId bundle id of the app (iOS)
 * @category App Utility
 */
export function openApp(wait = false, appId?: string, bundleId?: string): void {
    browser.waitUntil(() => {
        if (browser.isAndroid) {
            browser.activateApp(appId);
        } else if (browser.isIOS) {
            browser.execute('mobile: activateApp', { bundleId: bundleId });
        } else {
            throw new Error(UNSUPPORTED_PLATFORM_ERROR);
        }
        return isAppState(APP_RUNNING_STATE.FOREGROUND, wait, appId, bundleId);
    });
}
