import type { FastifyInstance } from 'fastify'
import trackLyricsHandler from './lyrics'
import proxyImageHandler from './proxy-image'
import trackIdHandler from './track'

async function apiRoutes(fastify: FastifyInstance) {
  fastify.get('/proxy-image', proxyImageHandler)
  fastify.get('/track/:id', trackIdHandler)
  fastify.get('/lyrics', trackLyricsHandler)
}

export default apiRoutes
