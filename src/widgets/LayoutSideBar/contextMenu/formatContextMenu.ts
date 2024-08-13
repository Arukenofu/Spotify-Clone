import {computed, shallowRef} from "vue";

import CompactIcon from "@/widgets/LayoutSideBar/UI/Icons/Format/CompactIcon.vue";
import ListIcon from "@/widgets/LayoutSideBar/UI/Icons/Format/ListIcon.vue";
import GridIcon from "@/widgets/LayoutSideBar/UI/Icons/Format/GridIcon.vue";
import ContextMenuRange from "@/widgets/LayoutSideBar/UI/ContextMenu/ContextMenuRange.vue";

import {usePlaylistFormat} from "@/features/FormatSidebarPlaylist";
import {BasicContextMenuItem, BasicContextMenuTitle} from "@/features/ContextMenu";

export default function () {
    const {setComponent, getComponentName} = usePlaylistFormat();

    return [
        {
            component: shallowRef(BasicContextMenuTitle),
            props: {
                text: 'Сортировка',
            }
        },
        {
            component: shallowRef(BasicContextMenuItem),
            props: {
                text: 'Недавно прослушано',
            }
        },
        {
            component: shallowRef(BasicContextMenuItem),
            props: {
                text: 'Недавно добавленные',
            }
        },
        {
            component: shallowRef(BasicContextMenuItem),
            props: {
                text: 'По алфавиту',
            }
        },
        {
            component: shallowRef(BasicContextMenuItem),
            props: {
                text: 'По автору',
                underline: true,
                isActive: true
            },
        },

        {
            component: shallowRef(BasicContextMenuTitle),
            props: {
                text: 'Формат Библеотеки',
            }
        },
        {
            component: shallowRef(BasicContextMenuItem),
            props: {
                text: 'Компактный',
                svgIcon: shallowRef(CompactIcon),
                isActive: computed(() => getComponentName.value === 'Compact')
            },
            clickEvent() {
                setComponent('Compact')
            }
        },
        {
            component: shallowRef(BasicContextMenuItem),
            props: {
                text: 'Список',
                svgIcon: shallowRef(ListIcon),
                isActive: computed(() => getComponentName.value === 'List')
            },
            clickEvent() {
                setComponent('List')
            }
        },
        {
            component: shallowRef(BasicContextMenuItem),
            props: {
                text: 'Сетка',
                svgIcon: shallowRef(GridIcon),
                isActive: computed(() => getComponentName.value === 'Grid')
            },
            clickEvent() {
                setComponent('Grid')
            }
        },
        {
            component: shallowRef(ContextMenuRange)
        }
    ]
}