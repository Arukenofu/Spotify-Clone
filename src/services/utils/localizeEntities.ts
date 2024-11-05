import type {Entities} from "@/services/types/Entities";

export default function (entity: Entities | 'Folder') {
    if (entity === 'Playlist') {
        return 'Плейлист'
    }
    if (entity === 'Artist') {
        return 'Исполнитель'
    }
    if (entity === 'User') {
        return 'Пользователь'
    }
    if (entity === 'Album') {
        return 'Альбом'
    }
    if (entity === 'Track') {
        return 'Трек'
    }
    if (entity === 'Folder') {
        return 'Папка'
    }
}