<script setup lang="ts">
import {computed} from "vue";
import {storeToRefs} from "pinia";
import {useMusicStore, usePlaylistStore} from "@/features/MediaPlayer";
import ScrollableBlock from "@/UI/Blocks/ScrollableBlock.vue";
import PanelHeader from "@/widgets/LayoutInfoPanel/components/PanelHeader.vue";
import MusicBlock from "@/shared/components/Music/MusicBlock.vue";

const store = useMusicStore();
const {currentAudioData, currentAudioIndexInQueue} = storeToRefs(store);
const {currentQueue, currentPlaylist} = usePlaylistStore();

const nextSongsInQueue = computed(() => {
  if (!currentQueue.value.length) {
    return []
  }

  return currentQueue.value.slice(currentAudioIndexInQueue.value + 1);
})

</script>

<template>
  <div class="panel">

    <PanelHeader>
      <template #name>
        Очередь
      </template>
    </PanelHeader>

    <ScrollableBlock class="content">

      <div class="now-playing section">
        <div class="head-text">Сейчас играет</div>
        <MusicBlock :music="currentAudioData" />
      </div>

      <div class="next-queue section" v-if="nextSongsInQueue.length">
        <div class="head-text">Далее{{currentPlaylist?.name ? ` из: ${currentPlaylist?.name}` : ':'}}</div>

        <div class="music-wrap">
          <MusicBlock
              v-for="music in nextSongsInQueue"
              :key="music.id"
              :music="music"
          />
        </div>
      </div>

    </ScrollableBlock>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  height: 100%;

  .content {
    height: calc(100% - 64px);
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);

    .section {
      margin-top: 21px;

      .head-text {
        font-size: 1rem;
        font-weight: 700;
        padding: 0 8px;
        margin-bottom: 9px;
      }
    }

    &:deep(.scrollable-content) {
      padding: 0 23px 0 8px;
    }
  }
}

:deep(.icon) {
  width: 16px;
  height: 16px;
  fill: var(--text-soft);
}
</style>