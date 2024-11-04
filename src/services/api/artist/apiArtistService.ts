import {artistInfo} from "@/services/api/artist/mocks/artistinfo";
import api from "@/services/api";
import type { FullArtistInfo } from "./types/FullArtistInfo";
import type {ResponseOK} from "@/services/types/Responses/ResponseOK";

class ApiArtistService {
    async getFullArtistInfo(artistId: number) {
        return artistInfo satisfies FullArtistInfo;
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

const artistService = new ApiArtistService();
export default artistService;