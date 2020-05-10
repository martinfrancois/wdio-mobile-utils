import { CHROME_APP_ID, DEFAULT_TIMEOUT, SAFARI_BUNDLE_ID } from './constants';
import { assertIdDefined, Os } from './internal/utils';

const SELECTORS = {
    ANDROID: {
        UI_SELECTOR_PREFIX: 'android=new UiSelector()',
    },
    IOS: {
        PREDICATE_PREFIX: '-ios predicate string:',
    },
};

// see https://developer.android.com/reference/android/support/test/uiautomator/UiSelector.html
export enum ANDROID_UISELECTOR_PROPERTIES {
    CHECKABLE = 'checkable',
    CHECKED = 'checked',
    CLASS_NAME = 'className',
    CLASS_NAME_MATCHES = 'classNameMatches',
    CLICKABLE = 'clickable',
    DESCRIPTION = 'description',
    DESCRIPTION_CONTAINS = 'descriptionContains',
    DESCRIPTION_MATCHES = 'descriptionMatches',
    DESCRIPTION_STARTS_WITH = 'descriptionStartsWith',
    ENABLED = 'enabled',
    FOCUSABLE = 'focusable',
    FOCUSED = 'focused',
    FROM_PARENT = 'fromParent',
    INDEX = 'index',
    INSTANCE = 'instance',
    LONG_CLICKABLE = 'longClickable',
    PACKAGE_NAME = 'packageName',
    PACKAGE_NAME_MATCHES = 'packageNameMatches',
    RESOURCE_ID = 'resourceId',
    RESOURCE_ID_MATCHES = 'resourceIdMatches',
    SCROLLABLE = 'scrollable',
    SELECTED = 'selected',
    TEXT = 'text',
    TEXT_CONTAINS = 'textContains',
    TEXT_MATCHES = 'textMatches',
    TEXT_STARTS_WITH = 'textStartsWith',
}

// see https://github.com/facebookarchive/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules
export enum IOS_PREDICATE_ATTRIBUTES {
    NAME = 'name',
    VALUE = 'value',
    LABEL = 'label',
    RECT = 'rect',
    TYPE = 'type',
    ENABLED = 'enabled',
    VISIBLE = 'visible',
    ACCESSIBLE = 'accessible',
    ACCESSIBILITY_CONTAINER = 'accessibilityContainer',
}

// see https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html
enum IOS_PREDICATE_COMPARATOR {
    EQUALS = '==',
    NOT_EQUALS = '!=',
    CONTAINS = 'CONTAINS',
    BEGINS_WITH = 'BEGINSWITH',
    ENDS_WITH = 'ENDSWITH',
    LIKE = 'LIKE',
    MATCHES = 'MATCHES',
}

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
 * Builds a selector for use with Android's UiSelector.
 *
 * For example, to search for a text on the screen on Android, you would use the following selector:
 * {@code android=new UiSelector().text("Text to search for")}
 * With:
 * @param property in the example being: {@code text}
 * @param argument in the example being: {@code Text to search for}
 */
export function buildAndroidUiSelector(
    property: ANDROID_UISELECTOR_PROPERTIES,
    argument: string
) {
    return (
        SELECTORS.ANDROID.UI_SELECTOR_PREFIX +
        '.' +
        property +
        '("' +
        removeStartingTilde(argument) +
        '")'
    );
}

/**
 * Builds a selector for use with iOS predicates.
 *
 * For example, to search for a text on the screen on iOS, you would use the following selector:
 * {@code -ios predicate string:name == 'Text to search for'}
 * With:
 * @param attribute      in the example being: {@code name}
 * @param comparator     in the example being: {@code ==}
 * @param argument       in the example being: {@code Text to search for}
 */
export function buildIosPredicate(
    attribute: IOS_PREDICATE_ATTRIBUTES,
    comparator: IOS_PREDICATE_COMPARATOR,
    argument: string
) {
    return (
        SELECTORS.IOS.PREDICATE_PREFIX +
        attribute +
        ' ' +
        comparator +
        ' ' +
        "'" +
        removeStartingTilde(argument) +
        "'"
    );
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
 * Internal function as a base for the select methods.
 */
function _selectBase(
    selector: string,
    wait: boolean,
    all: boolean,
    reverse = false
) {
    let element; // can be Element or Element[]
    if (all) {
        if (wait) {
            // $$ returns an array of elements, which means we cannot call .waitForDisplayed on it
            throw new Error('Wait is only supported for single elements');
        }
        element = $$(selector);
    } else {
        element = $(selector);
        if (wait) {
            const errorMessage: string =
                'No element found with selector: ' + selector;
            element.waitForDisplayed(DEFAULT_TIMEOUT, reverse, errorMessage);
        }
    }
    return element;
}

/**
 * Returns the selector of the element on the screen with the specified text.
 *
 * @param {string} text    the text of the element to be found
 */
export function equalsText(text: string): string {
    if (browser.isAndroid) {
        return buildAndroidUiSelector(ANDROID_UISELECTOR_PROPERTIES.TEXT, text);
    } else {
        return buildIosPredicate(
            IOS_PREDICATE_ATTRIBUTES.LABEL,
            IOS_PREDICATE_COMPARATOR.EQUALS,
            text
        );
    }
}

/**
 * Returns the element on the screen with the specified text.
 *
 * @param {string} text    the text of the element to be found
 * @param {boolean} wait   If set to true, will wait for the element to be shown first before it's returned
 * @param {boolean} all    By default it will only return the first element. If this is set to {@code true} it will return all elements.
 */
export function selectEqualsText(text: string, wait = false, all = false) {
    return _selectBase(equalsText(text), wait, all);
}

/**
 * Returns the selector of the element on the screen with the specified type.
 *
 * @param {string} type    the type of the element to be found
 */
export function equalsType(type: string): string {
    if (browser.isAndroid) {
        throw new Error('Not implemented yet');
    } else {
        return buildIosPredicate(
            IOS_PREDICATE_ATTRIBUTES.TYPE,
            IOS_PREDICATE_COMPARATOR.EQUALS,
            type
        );
    }
}

/**
 * Returns the element on the screen with the specified type.
 *
 * @param {string} type    the type of the element to be found
 * @param {boolean} wait   If set to true, will wait for the element to be shown first before it's returned
 * @param {boolean} all    By default it will only return the first element. If this is set to {@code true} it will return all elements.
 */
export function selectEqualsType(type: string, wait = false, all = false) {
    return _selectBase(equalsType(type), wait, all);
}

/**
 * Returns the selector of the element on the screen having the text starting with the specified text.
 *
 * @param {string} text    the text of the element to be found
 */
export function startsWithText(text: string): string {
    if (browser.isAndroid) {
        return buildAndroidUiSelector(
            ANDROID_UISELECTOR_PROPERTIES.TEXT_STARTS_WITH,
            text
        );
    } else {
        return buildIosPredicate(
            IOS_PREDICATE_ATTRIBUTES.LABEL,
            IOS_PREDICATE_COMPARATOR.BEGINS_WITH,
            text
        );
    }
}

/**
 * Returns the element on the screen having the text starting with the specified text.
 *
 * @param {string} text    the text of the element to be found
 * @param {boolean} wait   If set to true, will wait for the element to be shown first before it's returned
 * @param {boolean} all    By default it will only return the first element. If this is set to {@code true} it will return all elements.
 */
export function selectStartsWithText(text: string, wait = false, all = false) {
    return _selectBase(startsWithText(text), wait, all);
}

/**
 * Returns the selector of the element on the screen which contains the specified {@code automationText}.
 *
 * @param {string} automationText    the automationText of the element to be found
 */
export function containsAutomationText(automationText: string): string {
    if (browser.isAndroid) {
        return buildAndroidUiSelector(
            ANDROID_UISELECTOR_PROPERTIES.DESCRIPTION_CONTAINS,
            automationText
        );
    } else {
        return buildIosPredicate(
            IOS_PREDICATE_ATTRIBUTES.NAME,
            IOS_PREDICATE_COMPARATOR.CONTAINS,
            automationText
        );
    }
}

/**
 * Returns the element on the screen which contains the specified {@code automationText}.
 *
 * @param {string} automationText    the automationText of the element to be found
 * @param {boolean} wait   If set to true, will wait for the element to be shown first before it's returned
 * @param {boolean} all    By default it will only return the first element. If this is set to {@code true} it will return all elements.
 */
export function selectContainsAutomationText(
    automationText: string,
    wait = false,
    all = false,
    reverse = false
) {
    return _selectBase(
        containsAutomationText(automationText),
        wait,
        all,
        reverse
    );
}

/**
 * Returns the selector for the element on the screen which starts with the specified {@code automationText}.
 *
 * @param {string} automationText    the automationText of the element to be found
 */
export function startsWithAutomationText(automationText: string): string {
    if (browser.isAndroid) {
        return buildAndroidUiSelector(
            ANDROID_UISELECTOR_PROPERTIES.DESCRIPTION_STARTS_WITH,
            automationText
        );
    } else {
        return buildIosPredicate(
            IOS_PREDICATE_ATTRIBUTES.NAME,
            IOS_PREDICATE_COMPARATOR.BEGINS_WITH,
            automationText
        );
    }
}

/**
 * Returns the element on the screen which starts with the specified {@code automationText}.
 *
 * @param {string} automationText    the automationText of the element to be found
 * @param {boolean} wait   If set to true, will wait for the element to be shown first before it's returned
 * @param {boolean} all    By default it will only return the first element. If this is set to {@code true} it will return all elements.
 */
export function selectStartsWithAutomationText(
    automationText: string,
    wait = false,
    all = false
) {
    return _selectBase(startsWithAutomationText(automationText), wait, all);
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
 * Returns the first text field it can find.
 *
 * @param {WebdriverIO.Element} element     (optional) if set, returns the first text field found in the element
 */
export function textField(element?: WebdriverIO.Element): WebdriverIO.Element {
    if (element) {
        return browser.isAndroid
            ? element.$('android.widget.EditText')
            : element.$('UIATextField');
    } else {
        return browser.isAndroid
            ? $('android.widget.EditText')
            : $('UIATextField');
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
