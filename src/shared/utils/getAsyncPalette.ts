import {Vibrant} from "node-vibrant/browser";

type ImageSource = string | HTMLImageElement | Buffer;

export default async function (url: ImageSource) {
    return await Vibrant.from(url).getPalette();
}