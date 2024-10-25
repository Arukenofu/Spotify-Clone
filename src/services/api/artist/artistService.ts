import {artistInfo} from "@/services/api/artist/mocks/artistinfo";

export class ArtistService {
    async getFullArtistInfo(id: number) {
        // GET /artist/:id
        return artistInfo;
    }
}