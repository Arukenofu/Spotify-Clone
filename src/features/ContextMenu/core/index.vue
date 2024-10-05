<script setup lang="ts">
import contextMenuStore from '@/features/ContextMenu/store/contextMenuStore';

const { core, getCurrentComponent, isActive, closeContextMenu } =
  contextMenuStore();
</script>

<template>
  <div
    v-if="isActive"
    ref="core"
    v-click-outside="closeContextMenu"
    class="context-menu"
  >
    <ul>
      <Component :is="getCurrentComponent" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  top: 50%;
  left: 50%;
  translate:
    -50%,
    -50%;
  z-index: 999;
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
