import type { FormatEntity } from '@/features/FormatSidebarPlaylist';

export default function localizeTypes(type: FormatEntity) {
  if (type === 'Playlist') {
    return 'Плейлист'
  }
  if (type === 'Folder') {
    return 'Папка'
  }

  return 'Папка'
}