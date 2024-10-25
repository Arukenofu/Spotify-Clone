function checkCssAspectRatioSupport() {
    return CSS.supports('aspect-ratio', '1/1');
}

function checkCssVariablesSupport() {
    return CSS.supports('--variable', 'black')
}

function checkCssCalcSupport() {
    return CSS.supports('width', 'calc(1px + 1px)');
}

function checkCssClampSupport() {
    return CSS.supports('width', 'clamp(100px, 50%, 200px)');
}

function checkCssContainerQueriesSupport() {
    return CSS.supports('container', 'inline-size') || CSS.supports('contain', 'layout');
}

function checkEs6Support() {
    try {
        new Function('(a = 0) => a')
        return true;
    } catch {
        return false;
    }
}

function checkCssViewportSupport() {
    return CSS.supports('height', '100lvh');
}

function checkIntersectionObserverSupport() {
    return 'IntersectionObserver' in window;
}

function checkMutationObserverSupport() {
    return 'MutationObserver' in window;
}

export default function verifyBrowserSupport() {
    const checkList = [
        checkCssAspectRatioSupport,
        checkCssVariablesSupport,
        checkCssCalcSupport,
        checkCssClampSupport,
        checkCssContainerQueriesSupport,
        checkCssViewportSupport,
        checkEs6Support,
        checkIntersectionObserverSupport,
        checkMutationObserverSupport
    ];

    const functionChecks = checkList.map(check => ({
        [check.name]: check()
    }));
    const isPassed = functionChecks.some(check => check);

    return {
        functionChecks,
        isPassed
    }
}