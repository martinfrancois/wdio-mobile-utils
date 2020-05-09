// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import logger from '@wdio/logger';
import { DEFAULT_TIMEOUT, SAFARI_BUNDLE_ID } from './constants';
import { isIosSimulator } from './environment';
import { APP_RUNNING_STATE, isAppState, isBrowserAppState } from './utils';
import { Context } from '../types/appium';
import { assertIdDefined, Os } from './internal/utils';

const ALERT_OPEN_SELECTOR = '~Open';

const log = logger('Deeplink');

function openDeeplinkIosRealDevices(deeplink: string, bundleId: string): void {
    log.info('Opening Deeplink for real iOS devices');

    let webviewContexts: Context[] = [];

    log.trace('Launching Safari');
    browser.waitUntil(() => {
        browser.execute('mobile: launchApp', { bundleId: SAFARI_BUNDLE_ID });
        return isBrowserAppState(APP_RUNNING_STATE.FOREGROUND, false);
    });

    // terminate the app under test
    browser.execute('mobile: terminateApp', { bundleId: bundleId });
    isAppState(APP_RUNNING_STATE.NOT_RUNNING, true, undefined, bundleId);

    // find safari context
    browser.waitUntil(
        () => {
            const contexts = browser.execute(
                'mobile: getContexts'
            ) as Context[];
            log.trace('Contexts: ' + JSON.stringify(contexts));
            webviewContexts = contexts.filter((context) => {
                return context.id.startsWith('WEBVIEW');
            });
            if (webviewContexts.length) {
                return true;
            } else {
                // restart Safari
                browser.execute('mobile: terminateApp', {
                    bundleId: SAFARI_BUNDLE_ID,
                });
                isBrowserAppState(APP_RUNNING_STATE.NOT_RUNNING, true);
                browser.execute('mobile: launchApp', {
                    bundleId: SAFARI_BUNDLE_ID,
                });
                isBrowserAppState(APP_RUNNING_STATE.FOREGROUND, true);
                // try again
                return false;
            }
        },
        DEFAULT_TIMEOUT,
        'No Safari WebView context found.'
    );
    log.debug('WEBVIEW Contexts: ' + JSON.stringify(webviewContexts));

    let openButton: WebdriverIO.Element | undefined;
    browser.waitUntil(
        () => {
            let isDisplayed = false;

            /*
        since there can be multiple contexts that match, try each one until we find one that is working
        for example: [
          {"id": "NATIVE_APP"},
          {"id": "WEBVIEW_5","title": "","url": "about:blank"},
          {"id": "WEBVIEW_6","title": "","url": "about:blank"},
          {"id": "WEBVIEW_8","title": "","url": "about:blank"}
        ]
         */
            webviewContexts.forEach((webviewContext) => {
                if (!isDisplayed) {
                    log.trace(
                        'Switch to WEBVIEW Context: ' +
                            JSON.stringify(webviewContext)
                    );
                    // switch to WebView context of Safari
                    browser.switchContext(webviewContext.id);
                    // open deeplink in Safari
                    log.trace('Open Deeplink in Safari');
                    browser.url(deeplink);
                    // switch back to native context (NATIVE_APP) so we can interact with the alert that pops up
                    browser.switchContext('NATIVE_APP');
                    openButton = $(ALERT_OPEN_SELECTOR);
                    isDisplayed = openButton.isDisplayed();
                }
            });
            return isDisplayed;
        },
        DEFAULT_TIMEOUT,
        'Cannot open deeplink in Safari'
    );

    if (openButton) {
        if (openButton.isDisplayed()) {
            log.debug('Alert with Open button for Deeplink opened');
        } else {
            log.warn(
                'Alert with Open button for Deeplink could not be found, trying to click it anyways'
            );
        }

        // confirm opening the deeplink by clicking the "Open" button on the alert
        openButton.click();
        log.trace('Open button was clicked on Alert');
        if (
            isAppState(APP_RUNNING_STATE.FOREGROUND, true, undefined, bundleId)
        ) {
            log.info(
                'App was opened successfully via deeplink and is running in the foreground'
            );
        } else {
            const message =
                'App could not be opened with deeplink: ' + deeplink;
            log.error(message);
            throw new Error(message);
        }
    } else {
        const message =
            'Could not find an open button for deeplink: ' + deeplink;
        log.error(message);
        throw new Error(message);
    }
}

function openDeeplinkIosSimulators(deeplink: string, bundleId: string): void {
    log.trace('Launching Safari');
    browser.waitUntil(() => {
        browser.execute('mobile: launchApp', { bundleId: SAFARI_BUNDLE_ID });
        return isBrowserAppState(APP_RUNNING_STATE.FOREGROUND, false);
    });

    // terminate the app under test
    browser.execute('mobile: terminateApp', { bundleId: bundleId });
    isAppState(APP_RUNNING_STATE.NOT_RUNNING, true, undefined, bundleId);

    const urlButtonSelector =
        "type == 'XCUIElementTypeButton' && name CONTAINS 'URL'";
    const urlButton = $(`-ios predicate string:${urlButtonSelector}`);

    // Wait for the url button to appear and click on it so the text field will appear
    urlButton.waitForDisplayed(DEFAULT_TIMEOUT);
    urlButton.click();

    const urlFieldSelector =
        "type == 'XCUIElementTypeTextField' && name CONTAINS 'URL'";
    const urlField = $(`-ios predicate string:${urlFieldSelector}`);

    // Submit the url and add a break
    urlField.setValue(deeplink + '\uE007');

    const openButton = $('~Open');

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
        if (isIosSimulator()) {
            openDeeplinkIosSimulators(path, bundleId as string);
        } else {
            openDeeplinkIosRealDevices(path, bundleId as string);
        }
    } else {
        assertIdDefined(appId, Os.ANDROID);
        browser.closeApp();
        browser.execute('mobile: deepLink', {
            url: path,
            package: appId,
        });
    }
}
