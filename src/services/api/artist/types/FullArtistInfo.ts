import type { Discography } from '@/services/types/Discography'
import type { Artist } from '@/services/types/Entities/Artist'

export interface FullArtistInfo extends Artist {
  discography: Discography
}
