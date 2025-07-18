<script setup lang="ts">
import type { FormatTypes } from '#imports'
import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import { BasicContextMenuItem, BasicContextMenuTitle, BasicContextMenuView } from '@/features/ContextMenu'
import { maxGridWidth, minGridWidth, type SortOption, sorts } from '@/features/MedialibSidebar'
import Range from '@/shared/components/Range.vue'
import CheckIcon from '@/shared/UI/Icons/CheckIcon.vue'
import CompactIcon from '@/shared/UI/Icons/CompactIcon.vue'
import GridIcon from '@/shared/UI/Icons/GridIcon.vue'
import ListIcon from '@/shared/UI/Icons/ListIcon.vue'

defineProps<{
  componentName: FormatTypes
  gridWidth: number
  sortName: SortOption
}>()

const emit = defineEmits<{
  setComponentName: [name: FormatTypes]
  setGridWidth: [width: number]
  setSortName: [newValue: SortOption]
}>()

const { t } = useI18n()

function setComponentName(name: FormatTypes): void {
  emit('setComponentName', name)
}

function setGridWidth(width: number): void {
  emit('setGridWidth', width)
}

function setSortName(name: SortOption): void {
  emit('setSortName', name)
}

interface FormatMap {
  id: FormatTypes
  icon: Component
}

const formatMap: FormatMap[] = [
  {
    id: 'Compact',
    icon: CompactIcon,
  },
  {
    id: 'List',
    icon: ListIcon,
  },
  {
    id: 'Grid',
    icon: GridIcon,
  },
]
</script>

<template>
  <BasicContextMenuView class="menu">
    <BasicContextMenuTitle>
      {{ t('medialib.librarySort') }}
    </BasicContextMenuTitle>
    <BasicContextMenuItem
      v-for="(sort, index) in sorts"
      :key="index"
      :underline="index === sorts.length - 1"
      :active="sortName === sort && 'active'"
      @click="setSortName(sort)"
    >
      {{ t(`medialib.sorts.${sort.toLowerCase()}`) }}
      <template v-if="sortName === sort" #additionalIcon>
        <CheckIcon />
      </template>
    </BasicContextMenuItem>

    <BasicContextMenuTitle>
      {{ t('medialib.libraryFormat') }}
    </BasicContextMenuTitle>
    <BasicContextMenuItem
      v-for="format in formatMap"
      :key="format.id"
      :active="componentName === format.id && 'active'"
      @click="setComponentName(format.id)"
    >
      {{ t(`medialib.formats.${format.id.toLowerCase()}`) }}
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
      :min="minGridWidth"
      :max="maxGridWidth"
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
