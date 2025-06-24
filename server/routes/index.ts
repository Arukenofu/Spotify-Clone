import type { FastifyInstance } from 'fastify'
import trackLyricsHandler from './lyrics'
import proxyImageHandler from './proxy-image'
import videoSearchHandler from './searchvideo'
import trackIdHandler from './trackById'
import trackNameHandler from './trackByName'
import videoIdHandler from './videoById'
import videoNameHandler from './videoByName'

async function apiRoutes(fastify: FastifyInstance) {
  fastify.get('/proxy-image', proxyImageHandler)
  fastify.get('/track', trackNameHandler)
  fastify.get('/track/:id', trackIdHandler)
  fastify.get('/video', videoNameHandler)
  fastify.get('/video/:id', videoIdHandler)
  fastify.get('/lyrics', trackLyricsHandler)
  fastify.get('/searchvideo', videoSearchHandler)
}

export default apiRoutes
