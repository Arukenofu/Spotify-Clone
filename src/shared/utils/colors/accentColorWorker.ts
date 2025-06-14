import AccentColorWorker from './__accentColorWorker.ts?worker';

let worker: Worker | null = null;
const queue = new Map<string, Promise<string>>();
let handlers: ((value: string) => void)[] = [];

function initWorker() {
    if (!worker) {
        worker = new AccentColorWorker();

        worker.onmessage = (e) => {
            const result = e.data;
            console.log(result);
            const handler = handlers.shift();
            handler?.(result);
        };
    }
}

export function accentColorWorker(url: string): Promise<string> {
    if (queue.has(url)) return queue.get(url)!;

    initWorker();

    const promise = new Promise<string>((resolve) => {
        handlers.push(resolve);
        worker!.postMessage(url);
    });

    queue.set(url, promise);
    return promise;
}

export function destroyAccentWorker() {
    worker?.terminate();
    worker = null;
    queue.clear();
    handlers = [];
}