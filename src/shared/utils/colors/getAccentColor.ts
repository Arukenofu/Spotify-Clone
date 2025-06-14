import {rgbToHsl} from "@/shared/utils/colors/rgbToHsl";
import palette from "@jayimbee/palette";

interface RGBA {
    r: number;
    g: number;
    b: number;
    a?: number;
}

function getMostSaturatedColor(colors: RGBA[]): RGBA {
    let maxSaturation = -1;
    let mostSaturated = colors[0];

    for (const color of colors) {
        const [, saturation, lightness] = rgbToHsl(color.r, color.g, color.b);

        if (lightness < 0.1) continue;

        if (saturation > maxSaturation) {
            maxSaturation = saturation;
            mostSaturated = color;
        }
    }

    return mostSaturated;
}

async function medianCutColors(image: string) {
    const imgData = await palette.extractImageDataFromSrc(image, 1);

    return palette.quantize(imgData);
}

async function getAccentColor(url: string) {
    if (!url) return null;

    const colors = await medianCutColors(url);
    const {r, g, b} = getMostSaturatedColor(colors);

    return `rgb(${r}, ${g}, ${b})`;
}

export {getAccentColor, getMostSaturatedColor, medianCutColors}