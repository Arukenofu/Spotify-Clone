import type { FastifyReply, FastifyRequest } from 'fastify'

interface IProxyImageQueryParams extends FastifyRequest {
  query: {
    url?: string
  }
}

async function proxyImageHandler(request: FastifyRequest, reply: FastifyReply) {
  const { url } = (request as IProxyImageQueryParams).query

  if (!url) {
    reply.status(400).send({ error: 'Параметр "url" обязателен.' })
    return
  }

  try {
    const response = await fetch(url)
    const contentType = response.headers.get('content-type')
    reply.header('Content-Type', contentType || 'image/jpeg')

    const contentLength = response.headers.get('content-length')
    if (contentLength) {
      reply.header('Content-Length', contentLength)
    }

    reply.code(response.status)

    return response.body
  }
  catch (_) {
    console.log(_)
    reply.status(500).send({ error: 'Ошибка проксирования изображения.' })
  }
}

export default proxyImageHandler
