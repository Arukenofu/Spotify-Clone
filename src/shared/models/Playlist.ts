export interface Playlist {
  id: number;
  name: string;
  to: string;
  description?: string;
  musicQuantity?: number;
  totalDuration?: number;
  image?: URL;
  saved?: number;
  owner?: string;
}
