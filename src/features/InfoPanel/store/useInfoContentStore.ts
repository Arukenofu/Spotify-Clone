import {computed, defineAsyncComponent, readonly, ref} from "vue";
import {defineStore, storeToRefs} from "pinia";
import LoadingComponent from "@/features/InfoPanel/components/LoadingComponent.vue";
import type {Component} from "vue";
import type {PanelsName} from "#imports";

const useInfoStore = defineStore('useInfoContentStore', () => {
    const currentPanelName = ref<string | null>(null);

    const currentPanelNamePrivate = readonly(currentPanelName);

    const currentPanelComponent = computed<Component | null>(() => {
        if (!currentPanelName.value) {
            return null;
        }

        return defineAsyncComponent({
            loader: () => import(`@/features/InfoPanel/Panels/${currentPanelName.value}.vue`),
            loadingComponent: LoadingComponent
        });
    })

    function setNewPanel(componentName: PanelsName | null, allowToggle: boolean = true) {
        if (allowToggle && componentName === currentPanelName.value) {
            currentPanelName.value = null; return;
        }

        currentPanelName.value = componentName;
    }

    return {
        currentPanelName: currentPanelNamePrivate,
        currentPanelComponent,
        setNewPanel,
    }
});

export default function () {
    const {setNewPanel} = useInfoStore();

    return {
        ...storeToRefs(useInfoStore()),
        setNewPanel
    }
}