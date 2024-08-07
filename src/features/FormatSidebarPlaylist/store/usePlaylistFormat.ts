import {defineStore, storeToRefs} from "pinia";
import {type Component, computed} from "vue";
import useCachedRef from "@/shared/composables/useCachedRef";

import Grid from "@/features/FormatSidebarPlaylist/Formats/Grid.vue";
import Compact from "@/features/FormatSidebarPlaylist/Formats/Compact.vue";
import List from "@/features/FormatSidebarPlaylist/Formats/List.vue";

import type {FormatTypes} from "@/features/FormatSidebarPlaylist/types/FormatTypes";
import formats from "@/features/FormatSidebarPlaylist/constants/formats";

const formatStore = defineStore('usePlaylistFormat', () => {
    const currentComponentName = useCachedRef<FormatTypes>('format', 'Grid', {
        expectedTypes: ['string'],
        expectedValues: formats
    });

    const currentComponent = computed<Component>(() => {
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
    })

    return {
        currentComponent,
        setComponent,
        getComponentName
    }
});

export default function () {
    const store = formatStore();
    const {currentComponent, getComponentName} = storeToRefs(store);
    const {setComponent} = store;

    return {
        currentComponent,
        setComponent,
        getComponentName
    }
}