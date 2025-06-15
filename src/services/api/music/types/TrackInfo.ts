import type { Track } from '@/services/types/Entities/Track'
import type { Recommendation } from '@/services/types/Recommendation'

export interface PopularArtistsTracks {
  artistName: string
  trackList: Track[]
}

export interface TrackInfo {
  trackInfoDossier: Track
  recommendedRelatedTracks: Track[]
  popularArtistsTracks: PopularArtistsTracks[]
  otherInfo: Recommendation[]
}
