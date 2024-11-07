<script setup lang="ts">
import CompactIcon from '@/UI/Icons/Shared/CompactIcon.vue';
import ListIcon from '@/UI/Icons/Shared/ListIcon.vue';
import GridIcon from '@/UI/Icons/Shared/GridIcon.vue';
import Range from '@/shared/components/Range.vue';
import BasicContextMenuView from "@/UI/ContextMenu/BasicContextMenuView.vue";
import BasicContextMenuTitle from "@/UI/ContextMenu/BasicContextMenuTitle.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import {gridColumnMaxWidth, gridColumnMinWidth, sorts} from "@/features/MedialibSidebar"
import type {FormatTypes} from "#imports";
import type {sortOption} from "@/features/MedialibSidebar/constants/sorts";
import CheckIcon from "@/UI/Icons/Shared/CheckIcon.vue";

defineProps<{
  componentName: FormatTypes;
  gridWidth: number;
  sortName: sortOption;
}>();

const emit = defineEmits<{
  setComponentName: [name: FormatTypes];
  setGridWidth: [width: number],
  setSortName: [newValue: sortOption]
}>();

function setComponentName(name: FormatTypes): void {
  emit('setComponentName', name);
}

function setGridWidth(width: number): void {
  emit('setGridWidth', width);
}

function setSortName(name: sortOption): void {
  emit('setSortName', name);
}
</script>

<template>
  <BasicContextMenuView class="menu">
    <BasicContextMenuTitle text="Сортировка" />
    <BasicContextMenuItem
      v-for="(sort, index) in sorts"
      :key="index"
      :text="sort"
      :underline="index === sorts.length - 1"
      :is-active="sortName === sort"
      :additional-s-v-g="sortName === sort && CheckIcon"
      @click="setSortName(sort)"
    />

    <BasicContextMenuTitle text="Формат Библеотеки" />
    <BasicContextMenuItem
      text="Компактный"
      :svg-icon="CompactIcon"
      :is-active="componentName === 'Compact'"
      :additional-s-v-g="componentName === 'Compact' && CheckIcon"
      @click="setComponentName('Compact')"
    />
    <BasicContextMenuItem
      text="Список"
      :svg-icon="ListIcon"
      :is-active="componentName === 'List'"
      :additional-s-v-g="componentName === 'List' && CheckIcon"
      @click="setComponentName('List')"
    />
    <BasicContextMenuItem
      text="Сетка"
      :svg-icon="GridIcon"
      :is-active="componentName === 'Grid'"
      :additional-s-v-g="componentName === 'Grid' && CheckIcon"
      @click="setComponentName('Grid')"
    />

    <Range
      v-if="componentName === 'Grid'"
      :current="gridWidth"
      :min="gridColumnMinWidth"
      :max="gridColumnMaxWidth"
      style="margin: 9px 12px 12px"
      @on-value-change="setGridWidth"
    />
  </BasicContextMenuView>
</template>

<style lang="scss" scoped>
.menu {
  width: 200px;
}
</style>
