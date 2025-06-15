import type { CreatableMedialibEntities } from '@/services/api/medialib/types/CreateMedialibEntityResponse'
import type { MediaLibTypes } from '@/services/api/medialib/types/MediaLibTypes'
import type { ResponseOK } from '@/services/types/Responses/ResponseOK'
import api from '@/services/api'
import { createEntityReturnData } from '@/services/api/medialib/mocks/createEntityReturnData'
import mediaLib from '@/services/api/medialib/mocks/mediaLib'

class ApiMedialibService {
  async getMediaLib() {
    return mediaLib satisfies MediaLibTypes[]
  }

  async createMedialibEntity(type: CreatableMedialibEntities) {
    return createEntityReturnData(type)

    // return api<CreatePlaylistResponse>('/api/medialib/createEntity', {
    //      method: 'POST'
    //      body: {
    //          type: type
    //      }
    // });
  }

  async renameFolder(id: string | number) {
    // /api/medialib/renameFolder
    return { message: 'OK' }
  }

  async removeMediaLibEntity(id: number | string) {
    return api<ResponseOK>(`/api/medialib/remove/${id}`, {
      method: 'DELETE',
    })
  }

  async toggleEntityPinnedState(id: number | string, currentState: boolean) {
    const route = currentState ? 'unpin' : 'pin'

    return api(`/api/medialib/${id}/${route}`, {
      method: 'POST',
    })
  }
}

const service = new ApiMedialibService()
export default service
