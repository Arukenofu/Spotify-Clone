import {Vibrant, WorkerPipeline} from "node-vibrant/worker";
import PipelineWorker from "node-vibrant/worker.worker?worker";

type ImageSource = string | HTMLImageElement | Buffer;

export function getPaletteWorker(src: ImageSource) {
    Vibrant.use(new WorkerPipeline(PipelineWorker as never));
    return Vibrant.from(src).getPalette();
}