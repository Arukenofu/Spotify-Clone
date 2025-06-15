<script setup lang="ts">
import CheckedRoundCircleIcon from '@/shared/UI/Icons/CheckedRoundCircleIcon.vue'
import RoundPlusIcon from '@/shared/UI/Icons/RoundPlusIcon.vue'

interface Props {
  state: boolean
}

defineProps<Props>()
</script>

<template>
  <button class="v-add">
    <CheckedRoundCircleIcon v-if="state" class="added" />
    <RoundPlusIcon v-else class="add" />
  </button>
</template>

<style scoped lang="scss">
.v-add {
  border: none;
  background: none;
  aspect-ratio: 1/1;
  cursor: pointer;

  &:hover {
    scale: 1.04;

    .add {
      fill: var(--white);
    }
  }

  .add {
    fill: var(--text-soft);
  }

  .added {
    fill: var(--main-color);
  }
}
</style>
