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
  <PlayHeader :mask :passing-height :scroll-y>
    <GreenPlayingButton class="button" :state="isPlaying" @click="$emit('playClick')" />
    <div class="title">{{title}}</div>
  </PlayHeader>
</template>

<style scoped lang="scss">
.button {
  box-shadow: none;
}

.title {
  margin-left: 9px;
  font-size: 1.4rem;
  font-weight: 900;
}
</style>