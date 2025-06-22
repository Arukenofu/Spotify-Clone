import type { FastifyInstance } from 'fastify'
import trackLyricsHandler from './lyrics'
import proxyImageHandler from './proxy-image'
import trackIdHandler from './track'
import videoIdHandler from './video'

async function apiRoutes(fastify: FastifyInstance) {
  fastify.get('/proxy-image', proxyImageHandler)
  fastify.get('/track', trackIdHandler)
  fastify.get('/video', videoIdHandler)
  fastify.get('/lyrics', trackLyricsHandler)
}

export default apiRoutes
