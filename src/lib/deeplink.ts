import logger from '@wdio/logger';
import { DEFAULT_TIMEOUT } from './constants';
import {
    assertIdDefined,
    Platform,
    UNSUPPORTED_PLATFORM_ERROR,
} from './internal/utils';
import { acceptAlert } from './alert';
import { APP_RUNNING_STATE, isAppState, openSafari } from './appUtils';
import { mobile$ } from './select/select';
import { Type } from './select/type';
import { Selector } from './select/selector';
import {
    IOS_PREDICATE_ATTRIBUTES,
    IOS_PREDICATE_COMPARATOR,
    IosSelector,
} from './select/iosSelector';

const log = logger('Deeplink');

/**
 * Accepts an alert in Safari which appears upon opening a deeplink, tapping the "Open" button.
 */
function openDeeplinkAlert(timeout: number): void {
    try {
        acceptAlert();
    } catch (e) {
        log.info(
            'Appium version is below 1.17.0, deeplink only works on English iOS devices! Support for Appium <1.17.0 will be dropped in the future.'
        );
        // accepting an alert on Safari was added in Appium 1.17.0, apply backward compatibility layer for older versions
        const openButton = $('~Open');
        openButton.waitForDisplayed({ timeout: timeout });
        openButton.click();
    }
}

function openDeeplinkIos(
    deeplink: string,
    bundleId: string,
    timeout: number
): void {
    log.info('Opening Deeplink on iOS');

    log.trace('Launching Safari');
    openSafari();

    // terminate the app under test
    browser.execute('mobile: terminateApp', { bundleId: bundleId });
    isAppState(
        APP_RUNNING_STATE.NOT_RUNNING,
        true,
        undefined,
        bundleId,
        timeout
    );

    const nameContainsUrl = Selector.custom(
        null,
        IosSelector.of(
            IOS_PREDICATE_ATTRIBUTES.NAME,
            IOS_PREDICATE_COMPARATOR.EQUALS,
            'URL'
        )
    );

    const urlButton = mobile$(
        Selector.and(
            Selector.or(
                Selector.type(Type.BUTTON),
                Selector.type(Type.TEXT_FIELD)
            ),
            nameContainsUrl
        )
    );

    // Wait for the url button to appear and click on it so the text field will appear
    urlButton.waitForDisplayed({ timeout: timeout });
    urlButton.click();

    const urlField = mobile$(
        Selector.and(Selector.type(Type.TEXT_FIELD), nameContainsUrl)
    );

    // Submit the url and add a break
    urlField.setValue(deeplink + '\uE007');

    openDeeplinkAlert(timeout);

    log.trace('Open button was clicked on Alert');
    if (
        isAppState(
            APP_RUNNING_STATE.FOREGROUND,
            true,
            undefined,
            bundleId,
            timeout
        )
    ) {
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

function openDeeplinkAndroid(path: string, appId: string): void {
    log.info('Opening Deeplink on Android');
    browser.closeApp();
    browser.execute('mobile: deepLink', {
        url: path,
        package: appId,
    });
}

/**
 * Opens the app with the specified deeplink path routing to the view that should be shown.
 *
 * @note When using Appium <1.17.0 with iOS, it will only work with English system language.
 * Upgrade to Appium >=1.17.0 for support of all locales on iOS.
 * Support for Appium <1.17.0 will be dropped in the future.
 * @param {string} path to the deeplink
 * @param {string} appId ID of the app (Android)
 * @param {string} bundleId bundle id of the app (iOS)
 * @param {number} timeout how long to wait in each step of the process until the deeplink has been opened
 */
export function openDeeplink(
    path: string,
    appId?: string,
    bundleId?: string,
    timeout = DEFAULT_TIMEOUT
): void {
    log.trace('openDeeplink: ' + path);
    if (browser.isIOS) {
        assertIdDefined(bundleId, Platform.IOS);
        openDeeplinkIos(path, bundleId as string, timeout);
    } else if (browser.isAndroid) {
        assertIdDefined(appId, Platform.ANDROID);
        openDeeplinkAndroid(path, appId as string);
    } else {
        throw new Error(UNSUPPORTED_PLATFORM_ERROR);
    }
}
