<script setup lang="ts">
import StickyHeader from '@/UI/Blocks/StickyHeader.vue';
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';
import { computed } from 'vue';

interface Props {
  title: string;
  scrollY: number;
  isPlaying: boolean;
  mask: string;
  passingHeight?: number;
}

const {
  scrollY,
  passingHeight = 160,
} = defineProps<Props>();

const isHeightPassed = computed(() => {
  return scrollY > passingHeight;
});

type Emits = {
  playClick: []
}
defineEmits<Emits>();
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
        <GreenPlayingButton class="button" :state="isPlaying" @click="$emit('playClick')" />
        <div class="title">{{title}}</div>
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
    background-color: v-bind(mask);
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