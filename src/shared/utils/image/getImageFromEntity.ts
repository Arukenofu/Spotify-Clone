import { getImageUrlSafe } from '@/shared/utils/image/getImageUrlSafe'

type Item = { url: string }[]

export default function getImageFromEntity(
  item: Item,
  arrayKey: number = 1,
) {
  if (!item?.length || !item) {
    return null
  }

  return getImageUrlSafe(item, arrayKey)
}
