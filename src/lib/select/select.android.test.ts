import { Selector } from './selector';
import { mobile$, mobile$$ } from './select';

describe('Select', function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore mock browser for testing
    global.browser = {
        isAndroid: true,
        isIOS: false,
    };

    const selector = Selector.enabled();
    const selectorAndroid = 'android=new UiSelector().enabled(true)';

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

    describe('Android', function () {
        it('should return a WebdriverIO.Element with UiSelector when calling mobile$() on Android', function () {
            mobile$(selector);
            expect(mock$$.mock.calls.length).toBe(0);
            expect(mock$.mock.calls.length).toBe(1);
            expect(mock$.mock.calls[0][0]).toBe(selectorAndroid);
        });

        it('should return a WebdriverIO.Element with UiSelector when calling mobile$$() on Android', function () {
            mobile$$(selector);
            expect(mock$.mock.calls.length).toBe(0);
            expect(mock$$.mock.calls.length).toBe(1);
            expect(mock$$.mock.calls[0][0]).toBe(selectorAndroid);
        });
    });
});
