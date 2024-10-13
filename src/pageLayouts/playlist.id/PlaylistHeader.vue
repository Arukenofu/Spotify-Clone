<script setup lang="ts">
import StickyHeader from '@/UI/Blocks/StickyHeader.vue';
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';
import { computed, inject, ref } from 'vue';

const scrollY = inject('layoutScrollY', ref(0));

const passingHeight = 240;
const isHeightPassed = computed(() => {
  return scrollY.value > passingHeight;
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
        <GreenPlayingButton class="button" :state="false" />
        <div class="title">Микс дня #4</div>
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
    background-color: var(--bg-mask);
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