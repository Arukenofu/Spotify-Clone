import {defineStore, storeToRefs} from "pinia";
import {computed, defineAsyncComponent, markRaw, ref} from "vue";

import type CurrentPanelData from "@/features/InfoPanel/models/CurrentPanelData";

import CurrentPlaylistQueue from "@/widgets/LayoutInfoPanel/Panels/CurrentPlaylistQueue.vue";

const useInfoStore = defineStore('useInfoContentStore', () => {
    const currentPanel = ref<CurrentPanelData | null>({
        name: 'CurrentPlaylistQueue',
        component: CurrentPlaylistQueue
    });

    const currentPanelName = computed(() => currentPanel.value?.name);
    const currentPanelComponent = computed(() => currentPanel.value?.component)

    function setNewPanel(componentName: string | null) {
        if (!componentName) {
            currentPanel.value = null;
            return;
        }

        if (currentPanelName.value === componentName) {
            currentPanel.value = null;
            return;
        }

        const component = markRaw(defineAsyncComponent( () => {
            return import(`@/widgets/LayoutInfoPanel/Panels/${componentName}.vue`)
        }));

        if (!component) {
            currentPanel.value = null;
            return;
        }

        currentPanel.value = {
            name: componentName,
            component: component,
        }
        console.log(currentPanel.value)
    }

    return {
        currentPanelName,
        currentPanelComponent,
        setNewPanel
    }
});

export default function () {
    const store = useInfoStore();
    const {currentPanelName, currentPanelComponent} = storeToRefs(store);
    const {setNewPanel} = store;

    return {
        currentPanelName,
        currentPanelComponent,
        setNewPanel
    }
}