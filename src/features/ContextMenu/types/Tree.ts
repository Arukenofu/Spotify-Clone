import type {Component} from "vue";

export type Tree = {
    component?: Component;

    text?: string,
    svgIcon?: Component,
    additionalSvg?: Component,
    onClick?: () => any,
    isLast?: boolean,
    subTree?: Tree[],
}