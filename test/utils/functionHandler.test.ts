import { isArrayOfString, removeEmptyValues, objectMap } from '../../src/utils/functionHandler';

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

    describe('test removeEmptyValues function', () => {
        const objWithoutNullField = {
            firstName: 'David',
            lastName: 'Heymann',
            phone: '0549754982',
            clearance: '0',
            zeroNumber: 0,
        };
        it('should return same object that insert', () => {
            expect(removeEmptyValues(objWithoutNullField)).toEqual(objWithoutNullField);
        });
        it('should return obj without undefined, null', () => {
            const objWithNullField = {
                ...objWithoutNullField,
                undefinedValue: undefined,
                nullValue: null,
            };
            expect(removeEmptyValues(objWithNullField)).toEqual(objWithoutNullField);
        });
    });

    describe('test objectMap function', () => {
        const func = (value: any) => (typeof value === 'number' ? value.toString() : value);
        const objWithoutNumber = {
            firstName: 'David',
            lastName: 'Heymann',
            phone: '0549754982',
            clearance: '0',
            boolValue: true,
        };
        it('should return same object that insert', () => {
            expect(objectMap(objWithoutNumber, func)).toEqual(objWithoutNumber);
        });
        it('should return value number too string', () => {
            expect(objectMap({ ...objWithoutNumber, numValue: 29 }, func)).toEqual({ ...objWithoutNumber, numValue: '29' });
        });
    });
});
