<script setup lang="ts">
import TrackBlock from "@/shared/UI/Elements/Track/TrackBlock.vue";
import useInfoContentStore from "@/features/InfoPanel/store/useInfoContentStore";
import type {Track} from "@/services/types/Entities/Track";
import {useI18n} from "vue-i18n";

const {setNewPanel} = useInfoContentStore();

const {t} = useI18n();

defineProps<{
  nextSong: Track
}>();
</script>

<template>
  <div class="next-in-queue">
    <div class="title">
      <div class="text">{{t('info-panel.currentTrackInfo.nextInQueue')}}</div>
      <button class="show-queue" @click="setNewPanel('CurrentPlaylistQueue')">
        {{t('info-panel.currentTrackInfo.openQueue')}}
      </button>
    </div>
    <div class="next-track">
      <TrackBlock
        :music="nextSong"
        :state="false"
        class="track"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.next-in-queue {
  padding: 16px;
  border-radius: 8px;
  background-color: var(--ui-highlight);
  margin-bottom: 16px;

  .title {
    height: 25px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 9px;

    .text {
      flex: 1 1 0;
      font-weight: 700;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .show-queue {
      flex-shrink: 0;
      color: var(--text-soft);
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 700;
      margin-left: 10px;

      &:hover {
        scale: 1.04;
        color: var(--white);
        text-decoration: underline;
      }
    }
  }

  .track {

    &:hover {
      background-color: #3F3F3F !important;
    }
  }
}
</style>