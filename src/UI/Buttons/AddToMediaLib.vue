<script setup lang="ts">
import RoundPlusIcon from "@/UI/Icons/Shared/RoundPlusIcon.vue";
import CheckedRoundCircleIcon from "@/UI/Icons/Shared/CheckedRoundCircleIcon.vue";

interface Props {
  state: boolean;
}

defineProps<Props>();
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