import type { Item } from '../colors/getMaskColor'

export function findImage(data: Item, arrayKey: number) {
  if ('images' in data && data?.images?.length) {
    return data.images[arrayKey].url ?? null
  }
  if ('album' in data && data.album?.images?.length) {
    return data.album.images[arrayKey]?.url ?? null
  }

  return null
}
