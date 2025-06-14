import {getMostSaturatedColor} from './getAccentColor';
import palette from "@jayimbee/palette";

async function extractImageDataFromWorker(
    src: string
): Promise<Uint8ClampedArray> {
    const response = await fetch(src, { mode: "cors" });
    const blob = await response.blob();

    const imageBitmap = await createImageBitmap(blob);

    const width = imageBitmap.width;
    const height = imageBitmap.height;
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Ошибка");
    }

    ctx.drawImage(imageBitmap, 0, 0, width, height);

    return ctx.getImageData(0, 0, width, height).data;
}


self.onmessage = async (event) => {
    const url = event.data;
    const data = await extractImageDataFromWorker(url);

    const colors = palette.quantize(data)

    const { r, g, b } = getMostSaturatedColor(colors);
    self.postMessage(`rgb(${r}, ${g}, ${b})`);
};