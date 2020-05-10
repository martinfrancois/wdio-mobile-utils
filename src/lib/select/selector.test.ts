import { Selector } from './selector';

describe('Selector', function () {
    const VALUE = 'TEST VALUE';

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

    describe('accessibilityId', function () {
        const selector = Selector.accessibilityId(VALUE);

        it('should return the selector for Android when ".android()" is called', function () {
            expect(selector.android()).toBe(`.description("${VALUE}")`);
        });

        it('should return the selector for iOS when ".ios()" is called', function () {
            expect(selector.ios()).toBe(`name == '${VALUE}'`);
        });
    });

    describe('accessibilityIdStartsWith', function () {
        const selector = Selector.accessibilityIdStartsWith(VALUE);

        it('should return the selector for Android when ".android()" is called', function () {
            expect(selector.android()).toBe(
                `.descriptionStartsWith("${VALUE}")`
            );
        });

        it('should return the selector for iOS when ".ios()" is called', function () {
            expect(selector.ios()).toBe(`name BEGINSWITH '${VALUE}'`);
        });
    });

    describe('accessibilityIdMatches', function () {
        const selector = Selector.accessibilityIdMatches(VALUE);

        it('should return the selector for Android when ".android()" is called', function () {
            expect(selector.android()).toBe(`.descriptionMatches("${VALUE}")`);
        });

        it('should return the selector for iOS when ".ios()" is called', function () {
            expect(selector.ios()).toBe(`name MATCHES '${VALUE}'`);
        });
    });

    describe('accessibilityIdContains', function () {
        const selector = Selector.accessibilityIdContains(VALUE);

        it('should return the selector for Android when ".android()" is called', function () {
            expect(selector.android()).toBe(`.descriptionContains("${VALUE}")`);
        });

        it('should return the selector for iOS when ".ios()" is called', function () {
            expect(selector.ios()).toBe(`name CONTAINS '${VALUE}'`);
        });
    });
});
