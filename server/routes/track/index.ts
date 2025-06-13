import ytdl from "@distube/ytdl-core";
import YTMusic from "ytmusic-api"
import type {FastifyReply, FastifyRequest} from "fastify";

async function trackIdHandler(request: FastifyRequest, reply: FastifyReply) {
    const {name, artist} = (request.query as {name?: string, artist?: string});

    if (!name || !artist) {
        reply.status(400).send({ error: 'Параметры "name и artist" обязательны' });return;
    }
    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    const data = await ytmusic.searchSongs(`${name} - ${artist}`);
    if (!data?.length) {
        reply.status(401).send(data); return;
    }

    const id = data[0].videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${id}`;

    const info = await ytdl.getInfo(videoUrl, {

    });
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