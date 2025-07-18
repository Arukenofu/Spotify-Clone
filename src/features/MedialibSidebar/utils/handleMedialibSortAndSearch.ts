import type { sortOption } from '@/features/MedialibSidebar/constants/sorts'
import type { MediaLibTypes } from '@/services/api/medialib/types/MediaLibTypes'

interface Options {
  searchQuery: string
  sortBy: sortOption
}

export default function (
  mediaLib: MediaLibTypes[],
  options: Options,
) {
  let result = [...mediaLib]

  if (options.searchQuery) {
    result = mediaLib.filter((value) => {
      return value.name.toLowerCase().includes(options.searchQuery.toLowerCase())
    })
  }

  if (options.sortBy === 'Alphabetical') {
    result.sort((a, b) => {
      if (a.isPinned === b.isPinned) {
        return a.name.localeCompare(b.name)
      }
      return a.isPinned ? -1 : 1
    })
  }
  else {
    result.sort((a) => {
      return a.isPinned ? -1 : 1
    })
  }

  return result
}
