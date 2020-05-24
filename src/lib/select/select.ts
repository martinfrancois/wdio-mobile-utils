import { Selector } from './selector';
import {
    ANDROID_SELECTOR_NULL_ERROR,
    IOS_SELECTOR_NULL_ERROR,
    UNSUPPORTED_PLATFORM_ERROR,
} from '../internal/utils';

/**
 * @internal
 */
const Selectors = {
    ANDROID: {
        UI_SELECTOR_PREFIX: 'android=new UiSelector()',
    },
    IOS: {
        PREDICATE_PREFIX: '-ios predicate string:',
    },
};

/**
 * @internal
 */
function buildSelector(selector: Selector): string {
    if (!selector) {
        throw new Error(
            'Selector which has been passed in is: ' + JSON.stringify(selector)
        );
    }
    if (browser.isAndroid) {
        const androidSelector = selector._android();
        if (!androidSelector) {
            throw new Error(ANDROID_SELECTOR_NULL_ERROR);
        }
        return Selectors.ANDROID.UI_SELECTOR_PREFIX + androidSelector;
    } else if (browser.isIOS) {
        const iosSelector = selector._ios();
        if (!iosSelector) {
            throw new Error(IOS_SELECTOR_NULL_ERROR);
        }
        return Selectors.IOS.PREDICATE_PREFIX + iosSelector;
    }
    throw new Error(UNSUPPORTED_PLATFORM_ERROR);
}

/**
 * Selects one element on mobile platforms in a cross-platform way.
 * Works in the same way as {@link $} in WebdriverIO.
 * Uses {@code UiSelector} on Android and {@code ios predicate} on iOS.
 *
 * @param selector to use
 * @category Select
 */
export function mobile$(selector: Selector): WebdriverIO.Element {
    return $(buildSelector(selector));
}

/**
 * Selects all elements on mobile platforms in a cross-platform way.
 * Works in the same way as {@link $$} in WebdriverIO.
 * Uses {@code UiSelector} on Android and {@code ios predicate} on iOS.
 *
 * @param selector to use
 * @category Select
 */
export function mobile$$(selector: Selector): WebdriverIO.ElementArray {
    return $$(buildSelector(selector));
}
