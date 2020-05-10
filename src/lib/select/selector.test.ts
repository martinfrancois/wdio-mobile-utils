import { Selector } from './selector';

describe('Selector', function () {
    describe('enabled', function () {
        const selector = Selector.enabled();

        it('should return the selector for Android when ".android()" is called', function () {
            expect(selector.android()).toBe('.enabled(true)');
        });

        it('should return the selector for iOS when ".ios()" is called', function () {
            expect(selector.ios()).toBe('enabled == 1');
        });
    });

    describe('disabled', function () {
        const selector = Selector.disabled();

        it('should return the selector for Android when ".android()" is called', function () {
            expect(selector.android()).toBe('.enabled(false)');
        });

        it('should return the selector for iOS when ".ios()" is called', function () {
            expect(selector.ios()).toBe('enabled == 0');
        });
    });
});
