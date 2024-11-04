<script setup lang="ts">
import { type Component, computed } from 'vue';

defineOptions({
  inheritAttrs: false
});

interface Props {
  text: string;

  as?: Component | string;
  svgIcon?: Component;
  underline?: boolean;
  isActive?: boolean;
  additionalSVG?: Component | false;
  subTree?: Component;
}

const {underline, isActive, as = 'button'} = defineProps<Props>();

const computedClasses = computed(() => {
  return [underline && 'underline', isActive && 'active'];
});
</script>

<template>
  <Component
    :is="as"
    :class="computedClasses"
    class="c-menu-item"
    v-bind="$attrs"
  >
    <span class="block">
      <Component
        :is="svgIcon"
        class="icon"
      />
      <span class="text">
        {{ text }}
      </span>
    </span>

    <span
      v-if="additionalSVG"
      class="additionalSvg"
    >
      <Component
        :is="additionalSVG"
        class="icon"
      />
    </span>
  </Component>
</template>

<style lang="scss" scoped>
.c-menu-item {
  width: 100%;
  background: none;
  border: none;
  height: 40px;
  padding: 12px;
  display: flex;
  align-items: center;
  user-select: none;
  border-radius: 2px;
  position: relative;

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

    .text {
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
  }
}

.active {
  .icon,
  span {
    color: var(--main-color);
    fill: var(--main-color);
  }
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
