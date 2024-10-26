import {artistInfo} from "@/services/api/artist/mocks/artistinfo";
import api from "@/services/api";
import type {ResponseOK} from "@/services/types/Responses";

export class ArtistService {
    async getFullArtistInfo(artistId: number) {
        // GET /api/artist/:id
        return artistInfo;
    }

    async toggleArtistSubscription(state: boolean, artistId: number) {
        const endpoint = state ? 'unsubscribe' : 'subscribe';

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