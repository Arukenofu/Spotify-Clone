export interface Playlist {
    id: number,
    owner: string,
    name: string,
    to: string | number,
    avatar?: string,
    type: 'Плейлист' | 'Папка'
}