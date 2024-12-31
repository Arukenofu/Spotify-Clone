import {readonly} from "vue";
import useCachedRef from "@/shared/composables/useCachedRef";
import type {Formats} from "@/features/MusicCollectionFormat/types/Formats";

const format = useCachedRef<Formats>('playlistFormat', 'Compact', {
    expectedTypes: ['string'],
    expectedValues: ['Compact', 'List']
});

export const useMusicCollectionFormat = () => {
    function setFormat(newValue: Formats) {
        format.value = newValue;
    }

    return {
        format: readonly(format),
        setFormat
    }
}