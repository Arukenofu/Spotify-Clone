let timeout: ReturnType<typeof setTimeout>;

export default function() {
    function debounce(
        callback: Function,
        delay: number
    ) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            callback();
        }, delay);
    }

    return {
        debounce,
        clear: () => {
            clearTimeout(timeout);
        }
    }
}