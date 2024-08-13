import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import type {ContextMenuTypes} from "@/features/ContextMenu";

const contextMenuStore = defineStore('contextMenuStore', () => {
    const core = ref<HTMLElement>();

    const isActive = ref<boolean>(false);

    const currentTree = ref<ContextMenuTypes[]>([]);

    function closeContextMenu() {
        isActive.value = false;
    }

    return {
        core,
        isActive,
        currentTree,
        closeContextMenu
    }
});

export default function() {
    const store = contextMenuStore();
    const {closeContextMenu} = store;

    return {
        ...storeToRefs(store),
        closeContextMenu
    }
}