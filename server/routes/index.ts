import type {FastifyInstance} from "fastify";
import proxyImageHandler from "./proxy-image";
import trackIdHandler from "./track/id";

async function apiRoutes (fastify: FastifyInstance) {
    fastify.get('/proxy-image', proxyImageHandler);
    fastify.get('/track/:id', trackIdHandler);
}

export default apiRoutes;