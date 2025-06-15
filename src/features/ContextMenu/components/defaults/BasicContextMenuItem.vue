<script setup lang="ts">
import type { BaseItemProps } from '@/features/ContextMenu/types/defaults/BaseItemProps'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { underline, active, as = 'button' } = defineProps<BaseItemProps>()

const computedClasses = computed(() => {
  return [underline && 'underline', active && active]
})
</script>

<template>
  <Component
    :is="as"
    :class="computedClasses"
    class="c-menu-item"
    v-bind="$attrs"
  >
    <span class="block">
      <div v-if="$slots.icon" class="icon">
        <slot name="icon" />
      </div>
      <span class="added-at">
        <slot />
      </span>
    </span>

    <span
      v-if="$slots.additionalIcon"
      class="additionalSvg"
    >
      <slot name="additionalIcon" />
    </span>
  </Component>
</template>

<style lang="scss" scoped>
.c-menu-item {
  width: 100%;
  background: none;
  border: none;
  height: 43.2px;
  padding: 12px;
  display: flex;
  align-items: center;
  user-select: none;
  border-radius: 2px;
  position: relative;
  gap: 12px;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }

  .icon {
    width: 16px;
    height: 16px;
    fill: var(--text-soft);
  }

  .block {
    display: flex;
    align-items: center;
    gap: 12px;

    .added-at {
      font-weight: 500;
      font-size: 0.875rem;
      white-space: nowrap;
      text-align: left;
    }
  }

  .additionalSvg {
    margin-left: auto;
    display: grid;
    place-items: center;
    width: 16px;
    height: 16px;
    fill: var(--text-soft);
  }
}

a:hover {
  text-decoration: underline;
}

.active {
  .icon, span, .additionalSvg {
    color: var(--main-color);
    fill: var(--main-color);
  }
}

.active-icon .icon, .active-additionalIcon .additionalSvg {
  fill: var(--main-color);
}

.underline::before {
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  content: '';
  width: 100%;
  pointer-events: none;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
