import {defineStore, storeToRefs} from "pinia";
import {ref, shallowRef} from "vue";
import type {Tree} from "@/features/ContextMenu";
import SearchIcon from "@/widgets/LayoutSideBar/UI/Icons/SearchIcon.vue";

const contextMenuStore = defineStore('contextMenuStore', () => {
    const core = ref<HTMLElement>();

    const isActive = ref<boolean>(false);

    const coordinates = ref({
        top: 0,
        left: 0,
    });

    const options = ref<Options>({
        style: 'default',
        stickOn: 'mousePosition'
    });

    const currentTree = ref<Tree[] | null>([
        {
            svgIcon: shallowRef(SearchIcon),
            text: 'Привет',
        },
        {
            svgIcon: shallowRef(SearchIcon),
            text: 'Приветa',
        },
    ]);

    function closeContextMenu() {
        isActive.value = false;
    }

    return {
        core,
        isActive,
        currentTree,
        options,
        coordinates,
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