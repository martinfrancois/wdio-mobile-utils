// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import logger from '@wdio/logger';
import { DEFAULT_TIMEOUT, SAFARI_BUNDLE_ID } from './constants';
import { APP_RUNNING_STATE, isAppState, isBrowserAppState } from './utils';
import { assertIdDefined, Os } from './internal/utils';

const log = logger('Deeplink');

/**
 * Returns whether the current appium version is 1.17.0 or above.
 *
 * Since some features are only available from Appium 1.17.0, this acts to determine whether a compatibility layer is
 * necessary or not.
 */
function isAppiumVersionAtLeast1170(): boolean {
    return Number(browser.status().build.version.substr(0, 4)) >= 1.17;
}

/**
 * Returns whether the current appium version is 1.17.0 or above.
 *
 * Since some features are only available from Appium 1.17.0, this acts to determine whether a compatibility layer is
 * necessary or not.
 */
function acceptAlert() {
    if (isAppiumVersionAtLeast1170()) {
        browser.execute('mobile: alert', { action: 'accept' });
    } else {
        log.info(
            'Appium version is below 1.17.0, deeplink only works on English iOS devices! Support for Appium <1.17.0 will be dropped in the future.'
        );
        // backwards compatibility layer to Appium versions lower than 1.17.0, only works for English iOS devices!
        const openButton = $('~Open');
        openButton.waitForDisplayed(DEFAULT_TIMEOUT);
        openButton.click();
    }
}

function openDeeplinkIos(deeplink: string, bundleId: string): void {
    log.info('Opening Deeplink on iOS');

    log.trace('Launching Safari');
    browser.waitUntil(() => {
        browser.execute('mobile: launchApp', { bundleId: SAFARI_BUNDLE_ID });
        return isBrowserAppState(APP_RUNNING_STATE.FOREGROUND, false);
    });

    // terminate the app under test
    browser.execute('mobile: terminateApp', { bundleId: bundleId });
    isAppState(APP_RUNNING_STATE.NOT_RUNNING, true, undefined, bundleId);

    const urlButtonSelector =
        "(type == 'XCUIElementTypeButton' || type == 'XCUIElementTypeTextField') && name CONTAINS 'URL'";
    const urlButton = $(`-ios predicate string:${urlButtonSelector}`);

    // Wait for the url button to appear and click on it so the text field will appear
    urlButton.waitForDisplayed(DEFAULT_TIMEOUT);
    urlButton.click();

    const urlFieldSelector =
        "type == 'XCUIElementTypeTextField' && name CONTAINS 'URL'";
    const urlField = $(`-ios predicate string:${urlFieldSelector}`);

    // Submit the url and add a break
    urlField.setValue(deeplink + '\uE007');

    acceptAlert();

    log.trace('Open button was clicked on Alert');
    if (isAppState(APP_RUNNING_STATE.FOREGROUND, true, undefined, bundleId)) {
        log.info(
            'App was opened successfully via deeplink and is running in the foreground'
        );
    } else {
        const message =
            'Could not find an open button for deeplink: ' + deeplink;
        log.error(message);
        throw new Error(message);
    }
}

/**
 * Opens the app with the specified deeplink path routing to the view that should be shown.
 *
 * When using Appium <1.17.0 with iOS, it will only work with English system language.
 * Upgrade to Appium >=1.17.0 for support of all locales on iOS.
 * Support for Appium <1.17.0 will be dropped in the future.
 *
 * @param {string} path to the deeplink.
 * @param {string} appId ID of the app (Android)
 * @param {string} bundleId bundle id of the app (iOS)
 */
export function openDeeplink(
    path: string,
    appId?: string,
    bundleId?: string
): void {
    log.trace('openDeeplink: ' + path);
    if (browser.isIOS) {
        assertIdDefined(bundleId, Os.IOS);
        openDeeplinkIos(path, bundleId as string);
    } else {
        assertIdDefined(appId, Os.ANDROID);
        log.info('Opening Deeplink on Android');
        browser.closeApp();
        browser.execute('mobile: deepLink', {
            url: path,
            package: appId,
        });
    }
}
