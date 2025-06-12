import type {Album, PartialSearchResult, User} from "@spotify/web-api-ts-sdk";
import {FastAverageColor} from "fast-average-color";

type Item = NonNullable<PartialSearchResult[keyof PartialSearchResult]>['items'][number] | User | Album;

export function increaseSaturation(r: number, g: number, b: number, factor = 1.2) {
    r /= 255; g /= 255; b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);

    // eslint-disable-next-line prefer-const
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h /= 6;
    }

    s = Math.min(s * factor, 1);

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function findImage(data: Item, arrayKey: number) {
    if ('images' in data && data?.images?.length) {
        return data.images[arrayKey].url ?? null;
    }
    if ('album' in data && data.album?.images?.length) {
        return data.album.images[arrayKey]?.url ?? null;
    }

    return null;
}

export async function facColor(url: string) {
    const fac = new FastAverageColor();

    return fac.getColorAsync(url, {
        algorithm: 'sqrt',
        mode: 'speed'
    })
}

export async function getMaskColor(data: Item, arrayKey: number = 0) {
    try {
        const image = findImage(data, arrayKey);
        if (!image) return null;

        const palette = await facColor(image);

        let [r, g, b] = palette.value;

        [r, g, b] = increaseSaturation(r, g, b);

        return `rgb(${r}, ${g}, ${b})`;
    } catch (_) {
        return null;
    }
}