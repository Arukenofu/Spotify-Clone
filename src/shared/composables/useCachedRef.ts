import {ref, watch} from "vue";

interface Options {
    expectedValues?: any[],
    expectedTypes?: string[],
    min?: number,
    max?: number
}

export default function<T>(key: string, initialValue: T, options: Options = {}) {
    const innerRef = ref(initialValue);
    const cachedValue = localStorage.getItem(key);

    innerRef.value = !cachedValue || checkJSON(parseJSON(cachedValue), options) === 'fail' ?
        initialValue : parseJSON(cachedValue);

    watch(innerRef, (value) => {
        localStorage.setItem(key, stringifyJSON(value));
    });

    return innerRef;
}

function checkJSON<T>(value: T, options: Options = {}): 'passed' | 'fail' {
    const {expectedValues, expectedTypes, min, max} = options;

    const checkByInclude = (value: any, expected: any[]) => {
        return expected.includes(value);
    }

    if (expectedTypes && !checkByInclude(typeof value, expectedTypes)) {
        return 'fail';
    }

    if (min && typeof value === 'number' && min > value) {
        return 'fail'
    }

    if (max && typeof value === 'number' && max < value) {
        return 'fail'
    }

    if (expectedValues && !checkByInclude(value, expectedValues)) {
        return 'fail';
    }

    return 'passed';
}

function parseJSON(value: string) {
    try {
        return JSON.parse(value)
    } catch {
        return value
    }
}

function stringifyJSON<T>(value: T) {
    if (typeof value === "string") {
        return value;
    } else {
        return JSON.stringify(value);
    }
}