import type { FastifyReply, FastifyRequest } from 'fastify'
import ytdl from '@distube/ytdl-core'
import { getMediaInfo } from '../../utils/getMediaInfo'
import { searchMedia, type SearchSources } from '../../utils/searchMedia'

async function trackNameHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, artist, source } = request.query as { name?: string, artist?: string, source?: SearchSources }

    if (!name || !artist) {
      reply.status(400).send({ error: 'Параметры "name и artist" обязательны' })
      return
    }

    const id = await searchMedia(source ?? 'yt-music', `${name} - ${artist}`)
    const videoUrl = `https://www.youtube.com/watch?v=${id}`

    const info = await getMediaInfo(videoUrl)
    const format = ytdl.chooseFormat(info.formats, {
      quality: 'highestaudio',
      filter: 'audioonly',
    })
    const stream = ytdl.downloadFromInfo(info, { format })

    reply
      .header('Content-Type', 'audio/webm')
      .header('Content-Disposition', 'inline')

    return stream
  }
  catch (e) {
    console.error(e)
  }
}

export default trackNameHandler
