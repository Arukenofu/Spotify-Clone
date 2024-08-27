export default function (title: string, options?: Options) {
    const isTemporarily = options?.temporarily || false;

    if (isTemporarily) {
        if (!title) {
            document.title = window.tempTitle;
            window.tempTitle = '';

            return;
        }

        window.tempTitle = document.title;
        document.title = title;

        return;
    }

    if (window.tempTitle) {
        window.tempTitle = title;

        return;
    }

    document.title = title;
}

interface Options {
    temporarily?: boolean;
}