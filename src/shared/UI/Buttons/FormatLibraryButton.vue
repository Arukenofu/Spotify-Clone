<script setup lang="ts">
import {type Component, computed} from 'vue';
import CompactIcon from '@/shared/UI/Icons/CompactIcon.vue';
import ListIcon from '@/shared/UI/Icons/ListIcon.vue';
import CheckIcon from '@/shared/UI/Icons/CheckIcon.vue';
import {BasicContextMenuItem, BasicContextMenuTitle, BasicContextMenuView, ContextMenu} from "@/features/ContextMenu";
import type {Formats} from "@/features/MusicCollectionFormat";
import {useI18n} from "vue-i18n";

const {format} = defineProps<{
  format: Formats
}>();

const emit = defineEmits<{
  setFormat: [newValue: Formats]
}>();

const {t} = useI18n();

interface FormatsData {
  id: Formats,
  svgIcon: Component
}

const formats: FormatsData[] = [
  {
    svgIcon: CompactIcon,
    id: 'Compact',
  },
  {
    svgIcon: ListIcon,
    id: 'List',
  }
]

const currentIcon = computed(() => {
  if (format === 'List') {
    return ListIcon;
  }
  if (format === 'Compact') {
    return CompactIcon;
  }

  return null;
})

function setFormat(newValue: Formats) {
  emit('setFormat', newValue);
}
</script>

<template>
  <ContextMenu
    class="container"
    trigger="click"
    placement="bottom-end"
  >
    <button v-disable-child class="setFormat">
      <span>{{ t(`format-library.formats.${format.toLowerCase()}`) }}</span>
      <Component :is="currentIcon" class="icon" />
    </button>

    <template #menu>
      <BasicContextMenuView class="contextMenu">
        <BasicContextMenuTitle>
          {{t('format-library.componentNaming')}}
        </BasicContextMenuTitle>
        <BasicContextMenuItem
          v-for="{id, svgIcon} in formats"
          :key="id"
          :active="format === id && 'active'"
          @click="setFormat(id)"
        >
          {{ t(`format-library.formats.${id.toLowerCase()}`) }}
          <template #icon>
            <Component :is="svgIcon" />
          </template>
          <template v-if="format === id" #additionalIcon>
            <CheckIcon />
          </template>
        </BasicContextMenuItem>
      </BasicContextMenuView>
    </template>
  </ContextMenu>
</template>

<style scoped lang="scss">
.container {
  margin-left: auto;

  .setFormat {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    cursor: pointer;
    margin-right: calc(var(--content-spacing) * 2);

    span {
      color: var(--text-soft);
      font-weight: 600;
    }

    .icon {
      fill: var(--text-soft);
      width: 16px;
      height: 16px;
    }
  }
}

.contextMenu {
  width: 180px;
  max-height: calc(100dvh - 24px);

  ul {
    padding: 4px;
    list-style: none;
  }
}
</style>