import type { ResponseOK } from '@/services/types/Responses/ResponseOK'
import api from '@/services/api'
import { artistDiscography } from '@/services/api/artist/mocks/artistDiscography'
import { artistInfo } from '@/services/api/artist/mocks/artistinfo'

class ApiArtistService {
  async getArtistInfo(artistId: string | number) {
    // GET /api/artist/:id
    return artistInfo
  }

  async getArtistDiscography(artistId: string | number) {
    // GET /api/artist/:id/discography
    return artistDiscography
  }

  async getFullArtistInfoWithDiscography(artistId: string | number) {
    const artistInfo = await this.getArtistInfo(artistId)
    const artistDiscography = await this.getArtistDiscography(artistId)

    return {
      ...artistInfo,
      discography: artistDiscography,
    }
  }

  async toggleArtistSubscription(state: boolean, artistId: string | number) {
    const endpoint = state ? 'unsubscribe' : 'subscribe'
    const method = state ? 'DELETE' : 'POST'

    return await api<ResponseOK>(`/api/artist/${endpoint}`, {
      method,
      body: {
        artistId,
      },
      onResponseError: ({ error }) => {
        throw new Error(error?.message)
      },
    })
  }
}

const artistService = new ApiArtistService()
export default artistService
