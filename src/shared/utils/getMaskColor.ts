import type {PartialSearchResult, User} from "@spotify/web-api-ts-sdk";
import getAsyncPalette from "@/shared/utils/getAsyncPalette";

type Item = NonNullable<PartialSearchResult[keyof PartialSearchResult]>['items'][number] | User;

export function findImage(data: Item, arrayKey: number) {
    if ('images' in data && data?.images?.length) {
        return data.images[arrayKey].url ?? null;
    }
    if ('album' in data && data.album?.images?.length) {
        return data.album.images[arrayKey]?.url ?? null;
    }

    return null;
}

export async function getMaskColor(data: Item, arrayKey: number = 0) {
    try {
        const image = findImage(data, arrayKey);
        if (!image) return null;

        const palette = await getAsyncPalette(image);
        if (!palette.Vibrant) return null;

        return palette.Vibrant.hex;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return null;
    }
}