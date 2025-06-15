import type { Album, Playlist, Track } from '@spotify/web-api-ts-sdk'

export type PlayerTypesStr = 'album' | 'playlist'

export type PlayerTypes = Playlist<Track> | Album
