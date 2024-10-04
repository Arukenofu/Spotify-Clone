<script setup lang="ts">
import { ref, useTemplateRef, watchEffect } from 'vue';
import getElementPositionAxes from '@/app/directives/Tooltip/helpers/getElementPositionAxes';
import type { TooltipProps } from '@/app/directives/Tooltip/types/TooltipProps';
import type { BindingObject } from '@/app/directives/Tooltip/types/BindingTypes';

const tooltip = useTemplateRef<HTMLElement>('tooltip');

const {
  isShown,
  parent,
  placement,
  distance = 10,
  showDelay = 1000,
  allowInnerHTML = false
} = defineProps<TooltipProps & BindingObject>();

watchEffect(() => {
  if (!parent || !tooltip.value) {
    return;
  }

  const axes = getElementPositionAxes(
    parent,
    tooltip.value!,
    placement,
    distance
  );

  document.documentElement.style.setProperty('--v-tooltip-x', axes[0] + 'px');
  document.documentElement.style.setProperty('--v-tooltip-y', axes[1] + 'px');
});

const isShowDelayTimePassed = ref<boolean>(false);
let timeoutId: ReturnType<typeof setTimeout>;

watchEffect(() => {
  if (isShown) {
    timeoutId = setTimeout(() => {
      isShowDelayTimePassed.value = true;
    }, showDelay);
  } else {
    clearTimeout(timeoutId);
    isShowDelayTimePassed.value = false;
  }
});
</script>

<template>
  <div
    class="v-tooltip"
    :class="isShowDelayTimePassed && 'show'"
    :style="style"
    ref="tooltip"
    v-if="isShown"
  >
    <div class="innerHTMLContent" v-if="allowInnerHTML" v-html="content" />
    <template v-else>
      {{ content }}
    </template>
  </div>
</template>

<style lang="scss">
.v-tooltip {
  left: var(--v-tooltip-x);
  top: var(--v-tooltip-y);
}
</style>
