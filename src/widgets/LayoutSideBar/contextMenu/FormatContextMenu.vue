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
    <BasicContextMenuTitle>
      Сортировка
    </BasicContextMenuTitle>
    <BasicContextMenuItem
      v-for="(sort, index) in sorts"
      :key="index"
      :underline="index === sorts.length - 1"
      :is-active="sortName === sort"
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
      :is-active="componentName === 'Compact'"
      @click="setComponentName('Compact')"
    >
      Компактный
      <template #icon>
        <CompactIcon />
      </template>
      <template v-if="componentName === 'Compact'" #additionalIcon>
        <CheckIcon />
      </template>
    </BasicContextMenuItem>

    <BasicContextMenuItem
      :is-active="componentName === 'List'"
      @click="setComponentName('List')"
    >
      Список
      <template #icon>
        <ListIcon />
      </template>
      <template v-if="componentName === 'List'" #additionalIcon>
        <CheckIcon />
      </template>
    </BasicContextMenuItem>

    <BasicContextMenuItem
      :is-active="componentName === 'Grid'"
      @click="setComponentName('Grid')"
    >
      Сетка
      <template #icon>
        <GridIcon />
      </template>
      <template v-if="componentName === 'Grid'" #additionalIcon>
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
