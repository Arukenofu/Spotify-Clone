function proxy(image: string) {
    if (!image) return null;

    return `/api/proxy-image?url=${image}`
}

export {proxy};