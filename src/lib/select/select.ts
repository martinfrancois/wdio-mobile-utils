import { Selector } from './selector';
import {
    ANDROID_SELECTOR_NULL_ERROR,
    IOS_SELECTOR_NULL_ERROR,
    UNSUPPORTED_PLATFORM_ERROR,
} from '../internal/utils';

const Selectors = {
    ANDROID: {
        UI_SELECTOR_PREFIX: 'android=new UiSelector()',
    },
    IOS: {
        PREDICATE_PREFIX: '-ios predicate string:',
    },
};

function buildSelector(selector: Selector): string {
    if (!selector) {
        throw new Error(
            'Selector which has been passed in is: ' + JSON.stringify(selector)
        );
    }
    if (browser.isAndroid) {
        const androidSelector = selector.android();
        if (!androidSelector) {
            throw new Error(ANDROID_SELECTOR_NULL_ERROR);
        }
        return Selectors.ANDROID.UI_SELECTOR_PREFIX + androidSelector;
    } else if (browser.isIOS) {
        const iosSelector = selector.ios();
        if (!iosSelector) {
            throw new Error(IOS_SELECTOR_NULL_ERROR);
        }
        return Selectors.IOS.PREDICATE_PREFIX + iosSelector;
    }
    throw new Error(UNSUPPORTED_PLATFORM_ERROR);
}

export function mobile$(selector: Selector): WebdriverIO.Element {
    return $(buildSelector(selector));
}

export function mobile$$(selector: Selector): WebdriverIO.ElementArray {
    return $$(buildSelector(selector));
}
