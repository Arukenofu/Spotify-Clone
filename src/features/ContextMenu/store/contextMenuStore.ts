import {defineStore, storeToRefs} from "pinia";
import {type Component, ref} from "vue";

const contextMenuStore = defineStore('contextMenuStore', () => {
    const core = ref<HTMLElement>();

    const isActive = ref<boolean>(false);

    const currentComponent = ref<Component>();

    function closeContextMenu() {
        isActive.value = false;
    }

    function setContextMenuComponent(value: Component) {
        currentComponent.value = value
    }

    return {
        core,
        isActive,
        currentComponent,
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