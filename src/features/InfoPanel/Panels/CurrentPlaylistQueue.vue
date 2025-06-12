<script setup lang="ts">
import {computed, reactive} from 'vue';
import ScrollableBlock from '@/shared/UI/Blocks/ScrollableBlock.vue';
import MusicBlock from '@/shared/UI/Elements/Track/TrackBlock.vue';
import PanelHeader from '@/widgets/LayoutInfoPanel/components/PanelHeader.vue';
import NoQueue from "@/features/InfoPanel/components/NoQueue.vue";
import {useI18n} from "vue-i18n";
import {currentPlaybackStore, useAudioStream} from "@/features/MediaPlayer";

const {t} = useI18n();

const stream = reactive(useAudioStream());
const currentPlayback = currentPlaybackStore();

const isNoQueue = computed(() => {
  return true;
})

const nextSongsInQueue = computed(() => {
  if (isNoQueue.value) {
    return [];
  }

  return [];
});

const headTextValue = computed(() => {
  let output = t('info-panel.queue.next');

  if (currentPlayback.currentPlaybackInfo?.name) {
    output += ` ${t('info-panel.queue.from')}: ${currentPlayback.currentPlaybackInfo.name}`;
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
        {{t('info-panel.queue.queue')}}
      </template>
    </PanelHeader>

    <ScrollableBlock class="content">
      <div v-if="currentPlayback.currentTrack" class="now-playing section">
        <div class="head-text">
          {{t('info-panel.queue.nowPlaying')}}
        </div>
        <div class="currentMusic">
          <Transition
            :name="currentPlayback.currentTrackIndex !== 0 ? 'v' : ''"
            mode="out-in"
          >
            <MusicBlock
              :key="currentPlayback.currentTrack.id"
              :playback="currentPlayback.currentPlaybackInfo!"
              :music="currentPlayback.currentTrack"
              :state="stream.isPlaying"
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
      padding: 0 8px;
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
