import {defineStore, storeToRefs} from "pinia";
import {computed, defineAsyncComponent, markRaw, ref} from "vue";

import type CurrentPanelData from "@/features/InfoPanel/types/CurrentPanelData";

const useInfoStore = defineStore('useInfoContentStore', () => {
    const currentPanel = ref<CurrentPanelData | null>(null);

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