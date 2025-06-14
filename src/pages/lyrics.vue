<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {currentPlaybackStore} from "@/features/MediaPlayer";
import api from "@/services/api";
import {computed, onMounted, ref, watch} from "vue";
import LoadingBlock from "@/shared/UI/Blocks/LoadingBlock.vue";
import {facColor} from "@/shared/utils/getMaskColor";
import {queryClient} from "@/app/lib/VueQuery";
import {getImageUrlSafe} from "@/shared/utils/getImageUrlSafe";

const {t} = useI18n();

const currentPlayback = currentPlaybackStore();

const lyrics = ref<string>('');
const isLoading = ref(false);
const maskColor = ref('');

function getLyrics() {
  const name = currentPlayback.currentTrack?.name;
  const artist = currentPlayback.currentPlaybackInfo?.name;

  if (!name || !artist) return '';

  const cached = queryClient.getQueryData<{lyrics: string}>(['lyrics', currentPlayback.currentTrackId])?.lyrics;
  if (cached) return cached;

  return api(`/api/lyrics?name=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}`);
}

async function getMaskColor() {
  if (!currentPlayback.currentPlaybackInfo) return;

  const url = getImageUrlSafe(currentPlayback.currentPlaybackInfo!.images);

  if (!url) return '';

  const cached = queryClient.getQueryData<{maskColor: string}>(['lyrics', currentPlayback.currentTrackId])?.maskColor;
  if (cached) return cached;

  const color = await facColor(url, {
    algorithm: 'dominant'
  });

  return color.hex;
}

async function update() {
  isLoading.value = true;

  const [rLyrics, rMaskColor] = await Promise.all([
    getLyrics(),
    getMaskColor()
  ]);

  lyrics.value = rLyrics;
  maskColor.value = rMaskColor;

  rLyrics && queryClient.setQueryData(['lyrics', currentPlayback.currentTrackId], {
    lyrics: rLyrics,
    maskColor: rMaskColor
  });

  isLoading.value = false;
}

function getInvertedColor(hex: string) {
  const color = hex.replace('#', '');
  const r = 255 - parseInt(color.substring(0, 2), 16);
  const g = 255 - parseInt(color.substring(2, 4), 16);
  const b = 255 - parseInt(color.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

watch(() => currentPlayback.currentTrackId, update);
onMounted(update);

const lyricsStructure = computed(() => {
  return lyrics.value.trim().split(/\n{2,}/)
      .map(block => block.split('\n').map(line => line.trim()).filter(Boolean));
})
</script>

<template>
  <LoadingBlock v-if="isLoading" />

  <div v-else-if="!lyrics" class="noText container">
    {{t('lyrics.noLyrics')}}
  </div>

  <div v-else class="container" :style="`--mask: ${maskColor}; --text: ${getInvertedColor(maskColor)}`">
    <div class="text">
      <div v-for="(parent, parentIndex) in lyricsStructure" :key="parentIndex" class="parent">
        <p v-for="(text, textIndex) in parent" :key="textIndex" class="child">
          {{text}}
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
        opacity: 0.8;
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
