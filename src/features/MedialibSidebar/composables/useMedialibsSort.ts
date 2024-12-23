import useCachedRef from "@/shared/composables/useCachedRef";
import type {sortOption} from "../constants/sorts";
import sorts from "../constants/sorts";
import {computed, readonly} from "vue";

const currentSort = useCachedRef<sortOption>('medialibSort', 'Recents', {
    expectedValues: sorts
});

export default function() {
    const currentActiveSortIndex = computed(() => {
        return sorts.indexOf(currentSort.value);
    });

    function setSort(newValue: sortOption) {
        currentSort.value = newValue;
    }

    return {
        currentSort: readonly(currentSort),
        currentActiveSortIndex,
        setSort,
    }
}