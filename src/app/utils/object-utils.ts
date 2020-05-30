export function removeEmptyProperties(object: Object): any {
    Object.keys(object).forEach(key => {
        if (object[key] === '') delete object[key];

        if (typeof object[key] === 'object') {
          Object.keys(object[key]).forEach(keyTwo => object[key][keyTwo] === '' ? delete object[key][keyTwo] : keyTwo)
        };

        if (Object.keys(object[key]).length === 0) {
          delete object[key];
        };

        return key
    });

    return object;
};