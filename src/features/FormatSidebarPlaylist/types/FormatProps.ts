import type { Playlist } from '@/shared/models/Playlist';
import type { Entities } from '@/shared/models/Entities';

export type FormatEntity = Exclude<Entities, 'Artist' | 'User'> | 'Folder'

export interface FormatProps extends Omit<Playlist, 'musicQuantity' | 'totalDuration' | 'saved'> {
  type: FormatEntity;
  owner: string;
}
