import {artistInfo} from "@/services/api/artist/mocks/artistinfo";
import api from "@/services/api";
import type {ResponseOK} from "@/services/types/Responses";
import type { FullArtistInfo } from "./types/FullArtistInfo";

export class ArtistService {
    async getFullArtistInfo(artistId: number) {
        // GET /api/artist/:id
        return artistInfo satisfies FullArtistInfo;
    }

    async toggleArtistSubscription(state: boolean, artistId: number) {
        const endpoint = state ? 'unsubscribe' : 'subscribe';

        // POST /api/artist/subscribe
        // POST /api/artist/unsubscribe
        return await api<ResponseOK>(`/api/artist/${endpoint}`, {
            method: 'POST',
            body: {
                artistId: artistId,
            },
            onResponseError: ({error}) => {
                throw new Error(error?.message);
            }
        });
    }
}