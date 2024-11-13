import type {FormatTypes} from "#imports";
import formats from "@/features/MedialibSidebar/constants/formats";
import useCachedRef from "@/shared/composables/useCachedRef";
import {useSidebarWidthStore} from "@/features/MedialibSidebar";
import {type Component, computed} from "vue";
import Grid from "@/features/MedialibSidebar/Formats/Grid.vue";
import Compact from "@/features/MedialibSidebar/Formats/Compact.vue";
import List from "@/features/MedialibSidebar/Formats/List.vue";

const currentComponentName = useCachedRef<FormatTypes>('format', 'Grid', {
    expectedTypes: ['string'],
    expectedValues: formats
});

export default function() {
    const { isMinimized } = useSidebarWidthStore();

    const currentComponent = computed<Component>(() => {
        if (isMinimized.value) {
            return Grid;
        }

        if (currentComponentName.value === 'Grid') {
            return Grid;
        }

        if (currentComponentName.value === 'Compact') {
            return Compact;
        }

        return List;
    });

    function setComponent(name: FormatTypes) {
        currentComponentName.value = name;
    }

    const getComponentName = computed(() => {
        return currentComponentName.value;
    });

    return {
        currentComponent,
        setComponent,
        getComponentName
    };
}