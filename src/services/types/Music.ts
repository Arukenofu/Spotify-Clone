import type { SimpleArtist } from '@/services/types/Artist';
import type { Playlist } from '@/services/types/Playlist';

export interface Music {
  id: number;
  name: string;
  artists: SimpleArtist[];
  avatar?: string;
  url: string;
  uploadedDate: string;
  duration: number,
  album?: Playlist;
  isAdded?: boolean;
}
