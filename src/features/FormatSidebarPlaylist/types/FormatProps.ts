export type FormatEntity = 'Folder' | 'Playlist' | 'Album';

export interface FormatProps {
  id: number;
  name: string;
  type: FormatEntity;
  owner: string;
  image?: string | null;
}
