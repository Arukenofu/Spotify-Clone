<script setup lang="ts">
import StickyHeader from "@/UI/Blocks/StickyHeader.vue";
import {computed} from "vue";

interface Props {
  scrollY: number;
  mask: string | null;
  passingHeight?: number;
}

const {
  scrollY,
  passingHeight = 160,
  mask = 'rgb(83, 83, 83)'
} = defineProps<Props>();

const isHeightPassed = computed(() => {
  return scrollY > passingHeight;
});
</script>

<template>
  <Transition name="header">
    <StickyHeader v-show="isHeightPassed" class="header">
      <template #filter>
        <div class="background">
          <div class="background_inner" />
        </div>
      </template>

      <template #default>
        <slot />
      </template>
    </StickyHeader>
  </Transition>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  padding: 0 var(--content-spacing);
  background-color: #212121;

  .background {
    background-color: v-bind("mask || 'rgb(83, 83, 83)'");
    height: 100%;
    width: 100%;

    .background_inner {
      height: 100%;
      background-color: rgba(0,0,0,.6);
    }
  }

  button {
    box-shadow: none;
  }

  .title {
    margin-left: 9px;
    font-size: 1.4rem;
    font-weight: 900;
  }
}

.header-enter-active,
.header-leave-active {
  transition: opacity .4s ease-out;
}

.header-enter-from,
.header-leave-to {
  opacity: 0;
}
</style>