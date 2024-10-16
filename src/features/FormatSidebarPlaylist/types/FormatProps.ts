import type { Playlist } from '@/services/types/Playlist';
import type { Entities } from '@/services/types/Entities';

export type FormatEntity = Exclude<Entities, 'Artist' | 'User'> | 'Folder'

export interface FormatProps extends Omit<Playlist, 'musicQuantity' | 'totalDuration' | 'saved'> {
  type: FormatEntity;
  owner: string;
}
