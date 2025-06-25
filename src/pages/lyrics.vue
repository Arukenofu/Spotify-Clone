<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getAccentColor } from '@/features/AccentColors'
import { currentPlaybackStore } from '@/features/MediaPlayer'
import api from '@/services/api'
import LoadingBlock from '@/shared/UI/Blocks/LoadingBlock.vue'
import { getImageUrlSafe } from '@/shared/utils/image/getImageUrlSafe'

const { t } = useI18n()
const currentPlayback = currentPlaybackStore()

const trackId = computed(() => currentPlayback.currentTrackId)
const trackInfo = computed(() => ({
  id: currentPlayback.currentTrack?.id,
  name: currentPlayback.currentTrack?.name,
  artist: currentPlayback.currentPlaybackInfo?.name,
  images: currentPlayback.currentPlaybackInfo?.images,
}))

function getLyrics(name: string | undefined, artist: string | undefined) {
  if (!name || !artist)
    return ''
  return api(`/api/lyrics?name=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}`)
}

function getMaskColor(images: any[] | undefined) {
  if (!images)
    return ''
  const url = getImageUrlSafe(images)
  if (!url)
    return ''

  return getAccentColor(url)
}

const { data: lyricsData, isLoading, refetch } = useQuery({
  queryKey: ['lyrics', trackId],
  queryFn: async () => {
    const { name, artist, images } = trackInfo.value
    const [lyrics, maskColor] = await Promise.all([
      getLyrics(name, artist),
      getMaskColor(images),
    ])

    return { lyrics, maskColor }
  },
  enabled: false,
})

watch(() => trackInfo.value.id, () => {
  refetch()
}, { immediate: true })

function getInvertedColor(rgb: string) {
  const match = rgb.match(/\d+/g)
  if (!match || match.length < 3) {
    throw new Error(`Некорректный формат RGB: ${rgb}`)
  }

  const [r, g, b] = match.map(Number)
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b

  return brightness > 127.5 ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
}

const lyricsStructure = computed(() => {
  return lyricsData.value?.lyrics.trim().split(/\n{2,}/).map((block: string) => block.split('\n').map((line: string) => line.trim()).filter(Boolean)) ?? []
})
</script>

<template>
  <LoadingBlock v-if="isLoading" />

  <div v-else-if="!lyricsData?.lyrics" class="noText container">
    {{ t('lyrics.noLyrics') }}
  </div>

  <div v-else class="container" :style="`--mask: ${lyricsData.maskColor}; --text: ${getInvertedColor(lyricsData.maskColor!)}`">
    <div class="text">
      <div v-for="(parent, parentIndex) in lyricsStructure" :key="parentIndex" class="parent">
        <p v-for="(text, textIndex) in parent" :key="textIndex" class="child">
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 62px;
  padding-bottom: 62px;
  background-color: var(--mask);
  container: lyrics / inline-size;

  .text {
    width: min(100% - 2*64px,1024px);
    margin: 0 auto;
    font-size: 2rem;
    white-space: pre-line;

    .parent {

      .child {
        color: var(--text);
        line-height: 1.2;
        font-weight: 700;
        opacity: 0.7;
        cursor: pointer;
        transition: all .1s ease-out;

        &:hover {
          opacity: 1;
          text-decoration: underline;
        }

        &:not(&:last-child) {
          margin-bottom: .4em;
        }
      }

      &:not(&:last-child) {
        margin-bottom: 1em;
      }
    }
  }
}

@container lyrics (max-width: 800px) {
  .container .text {
    font-size: 3rem !important;
  }
}

.noText {
  width: 100%;
  height: var(--content-height);
  background-color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 5rem;
  font-weight: 900;
  padding: 0 52px;
}
</style>
