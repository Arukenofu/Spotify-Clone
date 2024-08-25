import {computed, defineAsyncComponent, markRaw, ref} from "vue";
import {defineStore, storeToRefs} from "pinia";

import type CurrentPanelData from "@/features/InfoPanel/types/CurrentPanelData";
import defaultWidth from "@/features/InfoPanel/constants/defaultWidth";

const useInfoStore = defineStore('useInfoContentStore', () => {
    const currentPanel = ref<CurrentPanelData | null>(null);

    const currentPanelName = computed(() => currentPanel.value?.name);
    const currentPanelComponent = computed(() => currentPanel.value?.component);

    function setPanelStyleWidth(value: number) {
        document.documentElement.style.setProperty('--panel-width', `${value}px`);
    }

    function setNewPanel(componentName: string | null) {
        function reset() {
            setPanelStyleWidth(0);
            currentPanel.value = null;
        }

        if (!componentName || currentPanelName.value === componentName) {
            reset(); return;
        }

        const component = markRaw(defineAsyncComponent( () => {
            return import(`@/widgets/LayoutInfoPanel/Panels/${componentName}.vue`)
        }));

        if (!component) {
            reset(); return;
        }

        currentPanel.value = {
            name: componentName,
            component: component,
        }
        setPanelStyleWidth(defaultWidth);
    }

    return {
        currentPanelName,
        currentPanelComponent,
        setNewPanel,
        setPanelStyleWidth
    }
});

export default function () {
    const store = useInfoStore();
    const {setNewPanel, setPanelStyleWidth} = store;

    return {
        ...storeToRefs(store),
        setNewPanel,
        setPanelStyleWidth
    }
}