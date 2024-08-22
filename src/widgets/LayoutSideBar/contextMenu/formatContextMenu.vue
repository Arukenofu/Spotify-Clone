<script setup lang="ts">
import {BasicContextMenuItem, BasicContextMenuTitle, BasicContextMenuView} from "@/features/ContextMenu";
import {gridColumnWidth, usePlaylistFormat} from "@/features/FormatSidebarPlaylist";

import CompactIcon from "@/widgets/LayoutSideBar/UI/Icons/Format/CompactIcon.vue";
import ListIcon from "@/widgets/LayoutSideBar/UI/Icons/Format/ListIcon.vue";
import GridIcon from "@/widgets/LayoutSideBar/UI/Icons/Format/GridIcon.vue";
import Range from "@/shared/components/Range.vue";

const {setComponent, getComponentName} = usePlaylistFormat();

const {
  getCurrentWidth,
  setCurrentWidth,
  gridColumnMaxWidth,
  gridColumnMinWidth
} = gridColumnWidth();
</script>

<template>
  <BasicContextMenuView>
    <BasicContextMenuTitle text="Сортировка" />
    <BasicContextMenuItem text="Недавно прослушано" />
    <BasicContextMenuItem text="Недавно добавленные" />
    <BasicContextMenuItem text="По алфавиту" />
    <BasicContextMenuItem
        text="По автору"
        :underline="true"
        :is-active="true"
    />

    <BasicContextMenuTitle text="Формат Библеотеки" />
    <BasicContextMenuItem
        text="Компактный"
        :svg-icon="CompactIcon"
        :is-active="getComponentName === 'Compact'"
        @click="setComponent('Compact')"
    />
    <BasicContextMenuItem
        text="Список"
        :svg-icon="ListIcon"
        :is-active="getComponentName === 'List'"
        @click="setComponent('List')"
    />
    <BasicContextMenuItem
        text="Сетка"
        :svg-icon="GridIcon"
        :is-active="getComponentName === 'Grid'"
        @click="setComponent('Grid')"
    />

    <Range
        v-if="getComponentName === 'Grid'"
        :current="getCurrentWidth"
        :min="gridColumnMinWidth"
        :max="gridColumnMaxWidth"
        @onValueChange="setCurrentWidth"
        style="margin: 9px 12px 12px"
    />
  </BasicContextMenuView>
</template>

<style scoped>

</style>