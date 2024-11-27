import type {SimpleArtist} from '@/services/types/Entities/Artist';

export interface SimpleTrack {
  id: number | string;
  name: string;
  image: string | null;
  color: string | null;
  artists: SimpleArtist[];
  isAddedToFavorites: boolean;
  duration: number;
}

export interface Track {
  id: number | string;
  name: string;
  artists: SimpleArtist[];
  avatar: string | null;
  color: string | null;
  url: string;
  uploadedDate: string;
  duration: number;
  listenings: number;
  isAddedToFavorites: boolean;
  album: {
    id: number | string;
    name: string;
  }
}
