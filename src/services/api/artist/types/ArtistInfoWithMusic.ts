import type {Discography} from "@/services/types/Discography";
import type {Artist} from "@/services/types/Entities/Artist";

export interface ArtistInfoWithMusic extends Artist {
    discography: Discography;
}