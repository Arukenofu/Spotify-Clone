import type {Image} from "@spotify/web-api-ts-sdk";

export function getImageUrlSafe(
    images: Image[]
) {
    for (let i = images.length - 1; i >= 0; i--) {
        if (images[i].url) {
            return images[i].url;
        }
    }
    return null;
}