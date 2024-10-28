import type { SimpleArtist } from '@/services/types/Entities/Artist';

export interface Music {
  id: number | string;
  name: string;
  artists: SimpleArtist[];
  avatar?: string;
  color?: string | null;
  url: string;
  uploadedDate: string;
  duration: number;
  listenings: number;
  albumId: number;
  isAdded?: boolean;
}
