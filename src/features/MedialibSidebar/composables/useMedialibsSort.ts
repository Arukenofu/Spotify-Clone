import useCachedRef from "@/shared/composables/useCachedRef";
import sorts from "../constants/sorts";
import {computed, readonly} from "vue";
import type {sortOption} from "../constants/sorts";

const currentSort = useCachedRef<sortOption>('medialibSort', 'Недавно добавленные', {
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