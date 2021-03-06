import { Selector } from './selector';
import { mobile$, mobile$$ } from './select';
import {
    ANDROID_UISELECTOR_PROPERTIES,
    AndroidSelector,
} from './androidSelector';
import { IOS_SELECTOR_NULL_ERROR } from '../internal/utils';

describe('Select', function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore mock browser for testing
    global.browser = {
        isAndroid: false,
        isIOS: true,
    };

    const selector = Selector.enabled();
    const selectorIos = '-ios predicate string:enabled == 1';

    const mock$ = jest.fn();
    const mock$$ = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore mock $ for testing
    global.$ = mock$;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore mock $$ for testing
    global.$$ = mock$$;

    beforeEach(() => {
        mock$.mockReset();
        mock$$.mockReset();
    });

    describe('iOS', function () {
        it('should return a WebdriverIO.Element with ios-predicate when calling mobile$() on iOS', function () {
            mobile$(selector);
            expect(mock$$.mock.calls.length).toBe(0);
            expect(mock$.mock.calls.length).toBe(1);
            expect(mock$.mock.calls[0][0]).toBe(selectorIos);
        });

        it('should return a WebdriverIO.ElementArray with ios-predicate when calling mobile$$() on iOS', function () {
            mobile$$(selector);
            expect(mock$.mock.calls.length).toBe(0);
            expect(mock$$.mock.calls.length).toBe(1);
            expect(mock$$.mock.calls[0][0]).toBe(selectorIos);
        });

        it('should throw an error if the iOS selector is null and it is being used on the iOS platform', function () {
            const anyAndroidSelector = AndroidSelector.of(
                ANDROID_UISELECTOR_PROPERTIES.CLASS_NAME,
                ''
            );
            const selector = Selector.custom(anyAndroidSelector, null);

            expect(() => mobile$(selector)).toThrowError(
                IOS_SELECTOR_NULL_ERROR
            );
        });
    });
});
