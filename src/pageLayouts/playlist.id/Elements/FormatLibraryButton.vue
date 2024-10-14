<script setup lang="ts">
import { type Component, computed } from 'vue';
import {
  BasicContextMenuItem,
  BasicContextMenuTitle,
  BasicContextMenuView,
} from '@/features/ContextMenu';
import CompactIcon from '@/UI/Icons/Shared/CompactIcon.vue';
import ListIcon from '@/UI/Icons/Shared/ListIcon.vue';
import CheckIcon from '@/UI/Icons/Shared/CheckIcon.vue';
import { useContextMenu } from '@/features/CreateContextMenu';

type Format = 'Компактный'| 'Список';

const {format} = defineProps<{
  format: Format
}>();

const emit = defineEmits<{
  setFormat: [newValue: Format]
}>()

interface Formats {
  text: Format,
  svgIcon: Component
}

const formats: Formats[] = [
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

function setFormat(newValue: Format) {
  emit('setFormat', newValue);
}

const {isActive, coordinates, showContextMenu, hideContextMenu, getWidth} = useContextMenu({
  design: 'minimal',
  align: 'end',
  padY: 25
});

</script>

<template>
  <button v-disable-child class="setFormat" @click="showContextMenu">
    <span>{{format}}</span>
    <Component :is="currentIcon" class="icon" />
  </button>

  <Teleport to="body">
    <BasicContextMenuView v-if="isActive" v-click-outside="hideContextMenu" class="contextMenu">
      <BasicContextMenuTitle text="Формат библеотеки" />
      <BasicContextMenuItem
        v-for="{text, svgIcon} in formats"
        :key="text"
        :text="text"
        :svg-icon="svgIcon"
        :is-active="format === text"
        :additional-s-v-g="format === text && CheckIcon"
        @click="setFormat(text)"
      />
    </BasicContextMenuView>
  </Teleport>
</template>

<style scoped lang="scss">
.setFormat {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
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

.contextMenu {
  position: fixed;
  translate:
    -50%,
    -50%;
  z-index: 999;
  top: calc(v-bind('coordinates.top') * 1px);
  left: calc(v-bind('coordinates.left') * 1px);
  width: calc(v-bind('getWidth()') * 1px);
  background-color: #282828;
  box-shadow:
    0 16px 24px rgba(0, 0, 0, 0.3),
    0 6px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  max-height: calc(100dvh - 24px);
  overflow-y: auto;

  ul {
    padding: 4px;
    list-style: none;
  }
}
</style>