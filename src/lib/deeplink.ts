// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import logger from '@wdio/logger';
import { DEFAULT_TIMEOUT, SAFARI_BUNDLE_ID } from './constants';
import { APP_RUNNING_STATE, isAppState, isBrowserAppState } from './utils';
import { assertIdDefined, Os } from './internal/utils';

const ALERT_OPEN_SELECTOR = '~Open';

const log = logger('Deeplink');

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

    const openButton = $(ALERT_OPEN_SELECTOR);

    openButton.waitForDisplayed(DEFAULT_TIMEOUT);
    openButton.click();
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
