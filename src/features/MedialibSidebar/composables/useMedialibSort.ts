import { computed } from 'vue'
import useCachedRef from '@/shared/composables/useCachedRef'

export type SortOption = 'Recents' | 'RecentlyAdded' | 'Alphabetical' | 'Creator'

export const sorts: SortOption[] = [
  'Recents',
  'RecentlyAdded',
  'Alphabetical',
  'Creator',
]

const currentSort = useCachedRef<SortOption>('medialibSort', 'Recents', {
  expectedValues: sorts,
})

export function useMedialibSort() {
  const activeIndex = computed(() => {
    return sorts.indexOf(currentSort.value)
  })

  function setSort(newValue: SortOption) {
    currentSort.value = newValue
  }

  return {
    name: currentSort,
    activeIndex,
    setSort,
  }
}
