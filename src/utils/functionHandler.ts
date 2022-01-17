export const removeEmptyValues = (obj: any): any => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v != null),
        //  .map(([k, v]) => [k, v === Object(v) ? removeEmptyValues(v) : v]),
    );
};

export const isArrayOfString = (arr: Array<any>): boolean => {
    return Array.isArray(arr) && arr.every((element) => typeof element === 'string');
};

export const objectMap = (object: Object, mapFn: (value: any) => any) => {
    return Object.keys(object).reduce((result: Object, key: string) => {
        // eslint-disable-next-line no-param-reassign
        result[key] = mapFn(object[key]);
        return result;
    }, {});
};
