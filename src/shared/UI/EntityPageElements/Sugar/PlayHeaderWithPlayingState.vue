<script setup lang="ts">
import GreenPlayingButton from '@/shared/UI/Buttons/GreenPlayingButton.vue';
import PlayHeader from "@/shared/UI/Blocks/PlayHeader.vue";

interface Props {
  title: string;
  scrollY: number;
  isPlaying: boolean;
  mask: string | null;
  passingHeight?: number;
}

const {
  mask = '#333333'
} = defineProps<Props>();

type Emits = {
  playClick: []
}
defineEmits<Emits>();
</script>

<template>
  <PlayHeader class="play-header" :mask :passing-height :scroll-y>
    <div class="content">
      <GreenPlayingButton class="button" :state="isPlaying" @click="$emit('playClick')" />
      <div class="title">{{title}}</div>
    </div>
  </PlayHeader>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: var(--content-max-width);
  padding: 0 var(--content-spacing);
  margin: 0 auto;

  .button {
    box-shadow: none;
  }

  .title {
    margin-left: 9px;
    font-size: 1.4rem;
    font-weight: 900;
  }
}

.play-header {
  padding: 0;
}
</style>