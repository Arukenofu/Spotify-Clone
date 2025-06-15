import type { SimpleArtist } from '@/services/types/Entities/Artist'
import type { SimpleUser } from '@/services/types/Entities/User'

export interface Playlist {
  id: number | string
  name: string
  image: string | null
  color: string | null
  description: string | null
  info: {
    uploadedDate: string
    savedQuantity: number
    tracksAmount: number
    totalDuration: number
  }
  creators: (SimpleArtist | SimpleUser)[]
  isAdded: boolean
}
