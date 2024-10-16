import type {Entities} from "@/services/types/Entities";

export default function (entity: Entities) {
    if (entity === 'Playlist') {
        return 'Плейлист'
    }
    if (entity === 'Artist') {
        return 'Исполнитель'
    }
    if (entity === 'User') {
        return 'Пользователь'
    }
}