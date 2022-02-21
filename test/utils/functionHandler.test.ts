import { isArrayOfString } from '../../src/utils/functionHandler';

describe('test utils functionHandler', () => {
    describe('test arrayOfString function', () => {
        it('should return false for undefined', () => {
            expect(isArrayOfString(undefined)).toBeFalsy();
        });
        it('should return false for not string array', () => {
            expect(isArrayOfString(['string', 10])).toBeFalsy();
        });
        it('should return true for string array', () => {
            expect(isArrayOfString(['string', 'second string'])).toBeTruthy();
        });
    });
});
