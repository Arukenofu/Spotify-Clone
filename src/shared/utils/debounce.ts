let timeout: ReturnType<typeof setTimeout>;

export default function(
    callback: Function,
    delay: number
) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        callback();
    }, delay)
}