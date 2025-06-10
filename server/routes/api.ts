import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

interface IProxyImageQueryParams {
  url?: string;
}

async function apiRoutes (fastify: FastifyInstance) {
  fastify.get('/health', async (_: FastifyRequest, reply: FastifyReply) => {
    reply.send({ status: 'ok' });
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
}

export default apiRoutes;