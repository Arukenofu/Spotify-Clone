import Fastify from 'fastify';
import type {FastifyError, FastifyReply, FastifyRequest} from 'fastify/';
import cors from '@fastify/cors';
import staticPlugin from '@fastify/static';
import formbody from '@fastify/formbody';
import path from 'path';
import {fileURLToPath} from 'url';
import * as fs from "fs/promises";
import apiRoutes from "./routes/api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify();

const PORT = 3000;
const isProduction = process.env.NODE_ENV === 'production';

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.register(formbody);

fastify.register(apiRoutes, {prefix: '/api'});

if (isProduction) {
    const distPath = path.join(__dirname, '../dist');
    fastify.log.info(`Dist path (production): ${distPath}`);

    fastify.register(staticPlugin, {
        root: distPath,
        prefix: '/'
    });

    fastify.setNotFoundHandler(async (request, reply) => {
        const url = request.raw.url;

        if (url?.startsWith('/api')) {
            reply.status(404).send({ error: 'API route not found' });
        } else {
            const indexPath = path.join(distPath, 'index.html');
            const file = await fs.readFile(indexPath);
            reply.type('text/html').send(file);
        }
    });
}

fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    fastify.log.error('Server Error:', error);
    const statusCode: number = error.statusCode || 500;
    reply.status(statusCode).send({
        error: 'Что-то пошло не так!',
        details: error
    });
});

const startFastifyServer = async (): Promise<void> => {
    try {
        await fastify.listen({port: PORT, host: '0.0.0.0'});
        console.log(`Сервер запущен на порту ${PORT}`);
        console.log(`Среда: ${isProduction ? 'production' : 'development'}`);
    } catch (err: any) {
        fastify.log.error(err);
    }
};

await startFastifyServer();