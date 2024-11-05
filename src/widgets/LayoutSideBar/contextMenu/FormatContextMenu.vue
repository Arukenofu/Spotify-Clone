<script setup lang="ts">
import CompactIcon from '@/UI/Icons/Shared/CompactIcon.vue';
import ListIcon from '@/UI/Icons/Shared/ListIcon.vue';
import GridIcon from '@/UI/Icons/Shared/GridIcon.vue';
import Range from '@/shared/components/Range.vue';
import BasicContextMenuView from "@/UI/ContextMenu/BasicContextMenuView.vue";
import BasicContextMenuTitle from "@/UI/ContextMenu/BasicContextMenuTitle.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import {gridColumnMaxWidth, gridColumnMinWidth} from "@/features/MedialibSidebar"
import type {FormatTypes} from "@/features/MedialibSidebar/types/FormatTypes";

defineProps<{
  componentName: FormatTypes;
  gridWidth: number;
}>();

const emit = defineEmits<{
  setComponentName: [name: FormatTypes];
  setGridWidth: [width: number]
}>();

function setComponentName(name: FormatTypes): void {
  emit('setComponentName', name);
}

function setGridWidth(width: number): void {
  emit('setGridWidth', width);
}
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
      :is-active="componentName === 'Compact'"
      @click="setComponentName('Compact')"
    />
    <BasicContextMenuItem
      text="Список"
      :svg-icon="ListIcon"
      :is-active="componentName === 'List'"
      @click="setComponentName('List')"
    />
    <BasicContextMenuItem
      text="Сетка"
      :svg-icon="GridIcon"
      :is-active="componentName === 'Grid'"
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

<style lang="scss" scoped></style>
