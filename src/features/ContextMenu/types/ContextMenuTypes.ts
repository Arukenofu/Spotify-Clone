import type {Component, ShallowRef} from 'vue'

export interface ContextMenuTypes {
    component: ShallowRef<Component>;
    props?: {

    },
    clickEvent?: Function
}