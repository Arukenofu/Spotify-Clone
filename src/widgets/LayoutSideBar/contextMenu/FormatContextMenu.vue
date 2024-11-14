<script setup lang="ts">
import CompactIcon from '@/UI/Icons/Shared/CompactIcon.vue';
import ListIcon from '@/UI/Icons/Shared/ListIcon.vue';
import GridIcon from '@/UI/Icons/Shared/GridIcon.vue';
import Range from '@/shared/components/Range.vue';
import BasicContextMenuView from "@/UI/ContextMenu/BasicContextMenuView.vue";
import BasicContextMenuTitle from "@/UI/ContextMenu/BasicContextMenuTitle.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import CheckIcon from "@/UI/Icons/Shared/CheckIcon.vue";
import {gridColumnMaxWidth, gridColumnMinWidth, sorts} from "@/features/MedialibSidebar"
import type {FormatTypes} from "#imports";
import type {sortOption} from "@/features/MedialibSidebar/constants/sorts";
import type {Component} from "vue";

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

interface FormatMap {
  id: FormatTypes,
  text: string,
  icon: Component
}

const formatMap: FormatMap[] = [
  {
    id: 'Compact',
    text: 'Компактный',
    icon: CompactIcon,
  },
  {
    id: 'List',
    text: 'Список',
    icon: ListIcon,
  },
  {
    id: 'Grid',
    text: 'Сетка',
    icon: GridIcon
  }
]
</script>

<template>
  <BasicContextMenuView class="menu">
    <BasicContextMenuTitle>
      Сортировка
    </BasicContextMenuTitle>
    <BasicContextMenuItem
      v-for="(sort, index) in sorts"
      :key="index"
      :underline="index === sorts.length - 1"
      :active="sortName === sort && 'active'"
      @click="setSortName(sort)"
    >
      {{sort}}
      <template v-if="sortName === sort" #additionalIcon>
        <CheckIcon />
      </template>
    </BasicContextMenuItem>

    <BasicContextMenuTitle>
      Формат библеотеки
    </BasicContextMenuTitle>
    <BasicContextMenuItem
      v-for="format in formatMap"
      :key="format.id"
      :active="componentName === format.id && 'active'"
      @click="setComponentName(format.id)"
    >
      {{format.text}}
      <template #icon>
        <Component :is="format.icon" />
      </template>
      <template v-if="componentName === format.id" #additionalIcon>
        <CheckIcon />
      </template>
    </BasicContextMenuItem>

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
