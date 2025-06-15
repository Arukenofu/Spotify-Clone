import type { MediaLibTypes } from '@/services/api/medialib/types/MediaLibTypes'
import { router } from '@/app/router'

export default async function handleMedialibClick(
  id: string | number,
  type: MediaLibTypes['type'],
  onFolder: Function,
) {
  if (type === 'Folder') {
    onFolder(); return
  }
  if (type === 'Collection') {
    await router.push(`/${type}`); return
  }

  await router.push(`/${type}/${id}`)
}
