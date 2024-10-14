import type { Artist } from '@/shared/models/Artist';
import type { Playlist } from '@/shared/models/Playlist';

interface SimpleArtist extends Pick<Artist, 'id' | 'name' | 'url'> {}

export interface Music {
  id: number;
  name: string;
  artists?: SimpleArtist[];
  avatar?: string;
  url: string;
  uploadedDate?: string;
  duration?: number,
  album?: Playlist;
  isAdded?: boolean;
}
