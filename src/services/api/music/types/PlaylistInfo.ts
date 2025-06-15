import type { Playlist } from '@/services/types/Entities/Playlist'
import type { Track } from '@/services/types/Entities/Track'

export interface PlaylistInfo {
  playlistInfoDossier: Playlist
  playlistQueue: Track[]
}
