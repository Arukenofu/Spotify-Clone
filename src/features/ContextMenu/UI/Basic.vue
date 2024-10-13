<script setup lang="ts">
import { type Component, computed } from 'vue';
import Index from '@/features/ContextMenu/core/index.vue';

defineOptions({
  inheritAttrs: false
});

interface Props {
  text: string;

  svgIcon?: Component;
  underline?: boolean;
  isActive?: boolean;
  additionalSVG?: Component | false;
  subTree?: Component;
}

const props = defineProps<Props>();

const computedClasses = computed(() => {
  return [props.underline && 'underline', props.isActive && 'active'];
});
</script>

<template>
  <button
    v-bind="$attrs"
    :class="computedClasses"
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

    <Index
      v-if="subTree"
      v-bind="subTree"
    />
  </button>
</template>

<style lang="scss" scoped>
button {
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
      font-weight: 600;
      font-size: 0.85rem;
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
