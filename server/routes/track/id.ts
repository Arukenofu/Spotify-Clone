import SpottyDl from "spottydl";
import ytdl from "@distube/ytdl-core";
import type {FastifyReply, FastifyRequest} from "fastify";

async function trackIdHandler(request: FastifyRequest, reply: FastifyReply) {
    const {id} = (request.params as {id: string});

    if (!id) {
        reply.status(400).send({ error: 'Параметр "id" обязателен.' });return;
    }

    const data = await SpottyDl.getTrack(`https://open.spotify.com/track/${id}`);
    if (typeof data === 'string') {
        reply.status(401).send(data); return;
    }

    const videoUrl = `https://www.youtube.com/watch?v=${data.id}`;

    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, {
        quality: 'highestaudio',
        filter: 'audioonly',
    });
    const stream = ytdl.downloadFromInfo(info, { format });

    reply
        .header('Content-Type', 'audio/webm')
        .header('Content-Disposition', 'inline')

    return stream;
}

export default trackIdHandler;