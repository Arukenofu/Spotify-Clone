import type { Item } from '../colors/getMaskColor'
import { getImageUrlSafe } from '@/shared/utils/image/getImageUrlSafe.ts'

export function findImage(data: Item, arrayKey: number) {
  if ('images' in data && data?.images?.length) {
    return getImageUrlSafe(data.images, arrayKey) ?? null
  }
  if ('album' in data && data.album?.images?.length) {
    return getImageUrlSafe(data.album.images, arrayKey) ?? null
  }

  return null
}
