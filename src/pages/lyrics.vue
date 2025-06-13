<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {currentPlaybackStore} from "@/features/MediaPlayer";
import api from "@/services/api";
import {computed, onMounted, ref, watch} from "vue";
import LoadingBlock from "@/shared/UI/Blocks/LoadingBlock.vue";
import {facColor} from "@/shared/utils/getMaskColor";
import {queryClient} from "@/app/lib/VueQuery";

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
  const url = currentPlayback.currentPlaybackInfo?.images[2].url!;

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

watch(() => currentPlayback.currentTrackId, update);
onMounted(update);

const lyricsStructure = computed(() => {
  return lyrics.value.trim().split(/\n{2,}/)
      .map(block => block.split('\n').map(line => line.trim()).filter(Boolean));
})
</script>

<template>
  <LoadingBlock v-if="isLoading" />

  <div v-else-if="!lyrics" class="noText">
    {{t('lyrics.noLyrics')}}
  </div>

  <div v-else class="container" :style="`--mask: ${maskColor};`">
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

  .text {
    width: min(100% - 2*64px,1024px);
    margin: 0 auto;
    font-size: 32px;
    white-space: pre-line;

    .parent {

      .child {
        line-height: 1.2;
        font-weight: 700;
        opacity: 0.7;
        cursor: pointer;
        transition: opacity .1s ease-out;

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
