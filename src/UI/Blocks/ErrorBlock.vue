<script setup lang="ts">
import DangerIcon from "@/UI/Icons/Shared/DangerIcon.vue";

interface Props {
  isIcon?: boolean;
  size?: 'regular' | 'small';
}

withDefaults(defineProps<Props>(), {
  isIcon: true,
  size: 'regular'
});
</script>

<template>
  <div class="v-error" :class="size">
    <DangerIcon v-if="isIcon" class="icon" />
    <h1 class="title">
      <slot name="title" />
    </h1>
    <p class="body">
      <slot name="body" />
    </p>
    <div class="controls">
      <slot name="controls" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;

  .icon {
    fill: var(--white);
    width: 64px;
    height: 64px;
  }

  .title {
    font-weight: 700;
    text-wrap: balance;
  }

  .body {
    font-weight: 500;
  }
}

.regular {
  .title {
    font-size: 1.5rem;
  }
  .body {
    font-size: 1rem;
  }
}

.small {
  .title {
    font-size: 1rem;
  }
  .body {
    font-size: .875rem;
  }
}
</style>