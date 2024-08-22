import type {Playlist} from "@/shared/models/Playlist";

export interface FormatProps extends
    Omit<Playlist, 'musicQuantity' | 'totalDuration' | 'saved'>
{
    type: 'Плейлист' | 'Папка',
    owner: string
}