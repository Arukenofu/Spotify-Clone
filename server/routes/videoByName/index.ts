import type { FastifyReply, FastifyRequest } from 'fastify'
import ytdl from '@distube/ytdl-core'
import { getMediaInfo } from '../../utils/getMediaInfo'
import { searchMedia } from '../../utils/searchMedia'

async function videoNameHandler(request: FastifyRequest, reply: FastifyReply) {
  const { name, artist } = request.query as {
    name?: string
    artist?: string
  }

  if (!name || !artist) {
    reply.status(400).send({ error: 'Параметры "name" и "artist" обязательны' })
    return
  }

  const id = await searchMedia('youtube', `${name} - ${artist}`)
  const videoUrl = `https://www.youtube.com/watch?v=${id}`

  const info = await getMediaInfo(videoUrl)

  const format = ytdl.chooseFormat(info.formats, {
    quality: 'highestvideo',
    filter: 'video',
  })

  const stream = ytdl.downloadFromInfo(info, {
    format,
  })

  reply.header('Content-Type', format.mimeType!)
    .header('Content-Disposition', 'inline')

  return stream
}

export default videoNameHandler
