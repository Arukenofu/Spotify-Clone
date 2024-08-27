import {defineStore, storeToRefs} from "pinia";
import {type Component, computed, ref, type ShallowRef} from "vue";

const contextMenuStore = defineStore('contextMenuStore', () => {
    const core = ref<HTMLElement>();

    const isActive = ref<boolean>(false);

    const currentComponent = ref<ShallowRef<Component>>();

    function closeContextMenu() {
        isActive.value = false;
    }

    const getCurrentComponent = computed(() => {
        return currentComponent.value;
    })

    function setContextMenuComponent(value: ShallowRef<Component>) {
        currentComponent.value = value;
    }

    return {
        core,
        isActive,
        getCurrentComponent,
        setContextMenuComponent,
        closeContextMenu
    }
});

export default function() {
    const store = contextMenuStore();
    const {closeContextMenu, setContextMenuComponent} = store;

    return {
        ...storeToRefs(store),
        closeContextMenu,
        setContextMenuComponent
    }
}