import type { Album } from '@/services/types/Entities/Album'
import type { Track } from '@/services/types/Entities/Track'
import type { Recommendation } from '@/services/types/Recommendation'

export interface Discography {
  albums: Album[]
  popularTracks: Track[]
  recommended: Recommendation[]
}
