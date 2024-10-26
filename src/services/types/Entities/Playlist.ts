import type {SimpleArtist} from "@/services/types/Entities/Artist";
import type {SimpleUser} from "@/services/types/Entities/User";

export interface Playlist {
  id: number | string;
  name: string;
  imageUrl?: string | null;
  color?: string | null;
  description?: string | null;
  additional: {
    tracksQuantity: number;
    totalDuration: number;
    savedQuantity?: number;
  },
  creator: (SimpleArtist | SimpleUser)[]
}
