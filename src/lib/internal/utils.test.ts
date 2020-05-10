import { isString } from './utils';

describe('Internal Utils', function () {
    describe('isString', function () {
        it('should return true if argument passed is a string', function () {
            expect(isString('test')).toBe(true);
        });

        it('should return false if argument passed is a boolean', function () {
            expect(isString(true)).toBe(false);
        });

        it('should return false if argument passed is a number', function () {
            expect(isString(1)).toBe(false);
        });
    });
});
