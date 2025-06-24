import type { FastifyReply, FastifyRequest } from 'fastify'
import ytdl from '@distube/ytdl-core'
import { getMediaInfo } from '../../utils/getMediaInfo'

async function trackIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as {
    id?: string
  }

  if (!id) {
    return reply.status(400).send({ error: 'Параметры "id" обязателен' })
  }

  const videoUrl = `https://www.youtube.com/watch?v=${id}`
  const info = await getMediaInfo(videoUrl)

  const format = ytdl.chooseFormat(info.formats, {
    quality: 'highestaudio',
    filter: 'video',
  })

  const stream = ytdl.downloadFromInfo(info, {
    format,
  })

  reply.header('Content-Type', format.mimeType!)
    .header('Content-Disposition', 'inline')

  return stream
}

export default trackIdHandler
