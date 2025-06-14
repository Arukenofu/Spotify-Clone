import {sdk} from "@/services/sdk";
import type {Page, PlaylistedTrack, Track, User} from "@spotify/web-api-ts-sdk";
import {getMaskColor} from "@/shared/utils/getMaskColor";
import {queryClient} from "@/app/lib/VueQuery";
import {proxy} from "@/shared/utils/proxy";

function fetchPlaylistData(albumId: string) {
    return sdk.playlists.getPlaylist(albumId);
}

async function getOwnerData(id: string) {
    const cachedUser = queryClient.getQueryData<User & {maskColor: string | null}>(['user', id])

    if (cachedUser && cachedUser.id === id) {
        return cachedUser;
    }

    const owner = await sdk.users.profile(id);
    const maskColor = await getMaskColor(owner)
    queryClient.setQueryData(['user', owner.id], {...owner, maskColor});

    return {...owner, maskColor};
}

export async function fetchPlaylist(playlistId: string) {
    const data = await fetchPlaylistData(playlistId);

    for (const image of data.images) {
        image.url = proxy(image.url)!;
    }

    const maskColor = await getMaskColor(data);
    const owner = await getOwnerData(data.owner.id);

    return {...data, owner, maskColor};
}

export function fetchNextPlaylist(nextLink: string) {
    return sdk.makeRequest<Page<PlaylistedTrack<Track>>>('GET', nextLink);
}