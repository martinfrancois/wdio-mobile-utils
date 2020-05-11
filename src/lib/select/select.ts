import { Selector } from './selector';
import { UNSUPPORTED_PLATFORM_ERROR } from '../internal/utils';

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
        return Selectors.ANDROID.UI_SELECTOR_PREFIX + selector.android();
    } else if (browser.isIOS) {
        return Selectors.IOS.PREDICATE_PREFIX + selector.ios();
    }
    throw new Error(UNSUPPORTED_PLATFORM_ERROR);
}

export function mobile$(selector: Selector): WebdriverIO.Element {
    return $(buildSelector(selector));
}

export function mobile$$(selector: Selector): WebdriverIO.ElementArray {
    return $$(buildSelector(selector));
}
