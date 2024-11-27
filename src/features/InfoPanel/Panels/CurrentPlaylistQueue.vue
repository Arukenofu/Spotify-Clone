<script setup lang="ts">
import {computed} from 'vue';
import {storeToRefs} from 'pinia';
import ScrollableBlock from '@/UI/Blocks/ScrollableBlock.vue';
import MusicBlock from '@/UI/Elements/Track/TrackBlock.vue';
import PanelHeader from '@/widgets/LayoutInfoPanel/components/PanelHeader.vue';
import useMusicUtils from '@/features/MediaPlayer/composables/useMusicUtils';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';
import usePlaylistStore from '@/features/MediaPlayer/store/usePlaylistStore';
import useMusicStore from '@/features/MediaPlayer/store/useMusicStore';
import NoQueue from "@/features/InfoPanel/components/NoQueue.vue";

const store = useCurrentMusicStore();
const playlistStore = usePlaylistStore();
const musicStore = useMusicStore();
const { currentAudioData, currentAudioIndexInQueue } = storeToRefs(store);
const { toggleTrackPlaying, loadSongFromCurrentQueue } = useMusicUtils();

const isNoQueue = computed(() => {
  return !playlistStore.currentQueue.length || currentAudioIndexInQueue.value == null
})

const nextSongsInQueue = computed(() => {
  if (isNoQueue.value) {
    return [];
  }

  return playlistStore.currentQueue.slice(currentAudioIndexInQueue.value! + 1);
});

const headTextValue = computed(() => {
  let output = 'Далее';

  if (playlistStore.currentPlaylistInfo?.name) {
    output += ` из: ${playlistStore.currentPlaylistInfo?.name}`;
  } else {
    output += ':';
  }

  return output;
});
</script>

<template>
  <NoQueue v-if="isNoQueue" />

  <div v-else class="panel">
    <PanelHeader>
      <template #name>
        Очередь
      </template>
    </PanelHeader>

    <ScrollableBlock class="content">
      <div v-if="currentAudioData" class="now-playing section">
        <div class="head-text">
          Сейчас играет
        </div>
        <div class="currentMusic">
          <Transition
            :name="currentAudioIndexInQueue !== 0 ? 'v' : ''"
            mode="out-in"
          >
            <MusicBlock
              :key="currentAudioData.id"
              :music="currentAudioData"
              :state="musicStore.isPlaying"
              @on-image-block-click="toggleTrackPlaying"
            />
          </Transition>
        </div>
      </div>

      <div
        v-if="nextSongsInQueue.length"
        class="next-queue section"
      >
        <div class="head-text">
          {{ headTextValue }}
        </div>

        <div class="music-wrap">
          <MusicBlock
            v-for="(music, index) in nextSongsInQueue"
            :key="music.id"
            class="music"
            :music="music"
            :state="false"
            :style="`top: ${index * 64}px`"
            @on-image-block-click="loadSongFromCurrentQueue(music)"
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
    height: calc(100% - var(--info-panel-header-height));
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

      .music-wrap {
        position: relative;

        .music {
          top: 0;
          position: absolute;
          transition: top .5s ease;
        }
      }

      .currentMusic {
        position: relative;
      }
    }

    &:deep(.scrollable-content) {
      padding: 0 23px 0 8px;
    }
  }
}

.v-enter-active {
  transition: top .5s ease-out, opacity 1s;
  position: relative;
  z-index: 2;
  pointer-events: none;
}
.v-enter-from {
  top: 110px;
  opacity: .5;
}
.v-enter-to {
  top: 0;
  opacity: 1;
}
</style>
