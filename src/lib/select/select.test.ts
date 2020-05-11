import { Selector } from './selector';
import { mobile$, mobile$$ } from './select';
import { UNSUPPORTED_PLATFORM_ERROR } from '../internal/utils';

describe('Select', function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore mock browser for testing
    global.browser = {
        isAndroid: false,
        isIOS: false,
    };

    const selectorNullError = 'Selector which has been passed in is: null';
    const selectorUndefinedError =
        'Selector which has been passed in is: undefined';

    const selector = Selector.enabled();

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

    it('should throw an error when calling mobile$() with undefined or null', function () {
        expect(() =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore to force passing null
            mobile$(null)
        ).toThrowError(selectorNullError);

        expect(() =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore to force passing undefined
            mobile$(undefined)
        ).toThrowError(selectorUndefinedError);
    });

    it('should throw an error when calling mobile$$() with undefined or null', function () {
        expect(() =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore to force passing null
            mobile$$(null)
        ).toThrowError(selectorNullError);

        expect(() =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore to force passing undefined
            mobile$$(undefined)
        ).toThrowError(selectorUndefinedError);
    });

    describe('Unsupported Platform', function () {
        it('should throw an error when trying to use mobile$() on a platform other than Android or iOS', function () {
            expect(() => mobile$(selector)).toThrowError(
                UNSUPPORTED_PLATFORM_ERROR
            );
        });

        it('should throw an error when trying to use mobile$$() on a platform other than Android or iOS', function () {
            expect(() => mobile$$(selector)).toThrowError(
                UNSUPPORTED_PLATFORM_ERROR
            );
        });
    });
});
