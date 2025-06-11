import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import SpottyDl from 'spottydl';
import ytdl from '@distube/ytdl-core';
import {pipeline} from 'stream';
import {promisify} from 'util';

interface IProxyImageQueryParams {
    url?: string;
}

const pump = promisify(pipeline);

async function apiRoutes (fastify: FastifyInstance) {
    fastify.get('/health', async (_: FastifyRequest, reply: FastifyReply) => {
        reply.send({ status: 'not ok' });
    });

    fastify.get<{ Querystring: IProxyImageQueryParams }>('/proxy-image', async (request, reply) => {
        const { url } = request.query;

        if (!url) {
            reply.status(400).send({ error: 'Параметр "url" обязателен.' });
            return;
        }

        try {
            const response = await fetch(url);
            const contentType = response.headers.get('content-type');
            reply.header('Content-Type', contentType || 'image/jpeg');

            const contentLength = response.headers.get('content-length');
            if (contentLength) {
                reply.header('Content-Length', contentLength);
            }

            reply.code(response.status);

            return response.body;
        } catch (err: any) {
            fastify.log.error('Proxy image error:', err);
            reply.status(500).send({ error: 'Ошибка проксирования изображения.' });
        }
    });

    fastify.get('/track/:id', async (request, reply) => {
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

        const url = format.url;

        const range = request.headers.range;
        const headers: Record<string, string> = {};

        if (range) headers['Range'] = range;

        const response = await fetch(url, {headers});
        if (!response.ok || !response.body) {
            reply.code(500).send('Failed to fetch audio');
            return;
        }

        const contentType = response.headers.get('content-type') || 'audio/webm';
        const contentLength = response.headers.get('content-length');
        const contentRange = response.headers.get('content-range');

        reply.header('Content-Type', contentType);
        if (contentLength) reply.header('Content-Length', contentLength);
        if (contentRange) reply.header('Content-Range', contentRange);

        await pump(response.body, reply.raw).catch((error: any) => {
            if (error.code === 'ERR_STREAM_PREMATURE_CLOSE') return;

            console.log(error);
        });
})}

export default apiRoutes;