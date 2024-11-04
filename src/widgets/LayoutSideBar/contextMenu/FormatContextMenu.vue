<script setup lang="ts">
import {
  gridColumnWidth,
  usePlaylistFormat
} from '@/features/FormatSidebarPlaylist';

import CompactIcon from '@/UI/Icons/Shared/CompactIcon.vue';
import ListIcon from '@/UI/Icons/Shared/ListIcon.vue';
import GridIcon from '@/UI/Icons/Shared/GridIcon.vue';
import Range from '@/shared/components/Range.vue';
import BasicContextMenuView from "@/UI/ContextMenu/BasicContextMenuView.vue";
import BasicContextMenuTitle from "@/UI/ContextMenu/BasicContextMenuTitle.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";

const { setComponent, getComponentName } = usePlaylistFormat();

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
      style="margin: 9px 12px 12px"
      @on-value-change="setCurrentWidth"
    />
  </BasicContextMenuView>
</template>

<style lang="scss" scoped></style>
