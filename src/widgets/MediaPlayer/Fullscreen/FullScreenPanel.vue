<script setup lang="ts">
import type { SimplifiedArtist } from '@spotify/web-api-ts-sdk'
import type { VideoSearchResult } from 'yt-search'
import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'
import ScrollableBlock from '@/shared/UI/Blocks/ScrollableBlock.vue'
import getCommaSeparatedString from '@/shared/utils/format/getCommaSeparatedString.ts'

const props = defineProps<{
  trackName: string
  artists: SimplifiedArtist[]
}>()

defineEmits<{
  close: []
  itemClick: [id: string]
}>()

const { data } = useQuery({
  queryKey: ['videosearch', `${props.trackName}:${props.artists[0].name}`],
  queryFn: async () => {
    const name = encodeURIComponent(props.trackName)
    const artist = encodeURIComponent(getCommaSeparatedString(props.artists, 'name'))

    return api<VideoSearchResult[]>(`/api/searchvideo?name=${name}&artist=${artist}`)
  },
})
</script>

<template>
  <div v-if="data" class="panel">
    <ScrollableBlock class="scroll">
      <div
        v-for="(video) of data"
        :key="video.videoId"
        class="video"
        @click="$emit('itemClick', video.videoId); $emit('close')"
      >
        <div class="image">
          <img class="img" :src="video.image" alt="">
          <span class="time">{{ video.duration.timestamp }}</span>
        </div>
        <div class="text">
          <p class="title">
            {{ video.title }}
          </p>
          <span class="author">{{ video.author.name }}</span>
        </div>
      </div>
    </ScrollableBlock>
  </div>
</template>

<style scoped lang="scss">
.panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 450px;
  height: 100vh;
  max-height: 100vh;
  background-color: #0c0c0c;
  overflow: hidden;
  padding: 4px 0 0;

  .scroll {
    overflow-y: scroll;
    padding-right: 24px;
    padding-left: 12px;

    .video {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px;
      padding: 4px 4px;
      margin-bottom: 6px;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background-color: #212121;
      }

      .image {
        height: 90px;
        position: relative;

        .img {
          height: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          border-radius: 4px;
        }

        .time {
          position: absolute;
          bottom: 4px;
          right: 4px;
          font-size: .75rem;
          background-color: rgba(12, 12, 12, 0.7);
          padding: 3px 5px;
          border-radius: 3px;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 6px 0;

        .title {
          font-size: 1rem;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-align: left;
          user-select: none;
          line-height: 1;
        }

        .author {
          color: var(--text-soft);
          font-size: .875rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-align: left;
          user-select: none;
          margin-bottom: 8px;
          line-height: 1.1;
        }
      }
    }
  }
}
</style>
