<script setup lang="ts">
import {type Component, computed} from 'vue';
import CompactIcon from '@/UI/Icons/Shared/CompactIcon.vue';
import ListIcon from '@/UI/Icons/Shared/ListIcon.vue';
import CheckIcon from '@/UI/Icons/Shared/CheckIcon.vue';
import {BasicContextMenuItem, BasicContextMenuTitle, BasicContextMenuView, ContextMenu} from "@/features/ContextMenu";
import type {Formats} from "@/features/MusicCollectionFormat";

const {format} = defineProps<{
  format: Formats
}>();

const emit = defineEmits<{
  setFormat: [newValue: Formats]
}>()

interface FormatsData {
  text: Formats,
  svgIcon: Component
}

const formats: FormatsData[] = [
  {
    svgIcon: CompactIcon,
    text: 'Компактный',
  },
  {
    svgIcon: ListIcon,
    text: 'Список',
  }
]

const currentIcon = computed(() => {
  if (format === 'Список') {
    return ListIcon;
  }
  if (format === 'Компактный') {
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
      <span>{{format}}</span>
      <Component :is="currentIcon" class="icon" />
    </button>

    <template #menu>
      <BasicContextMenuView class="contextMenu">
        <BasicContextMenuTitle>
          Формат библеотеки
        </BasicContextMenuTitle>
        <BasicContextMenuItem
          v-for="{text, svgIcon} in formats"
          :key="text"
          :active="format === text && 'active'"
          @click="setFormat(text)"
        >
          {{text}}
          <template #icon>
            <Component :is="svgIcon" />
          </template>
          <template v-if="format === text" #additionalIcon>
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