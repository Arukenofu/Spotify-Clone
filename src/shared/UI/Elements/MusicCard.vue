<script setup lang="ts">
import type { ItemTypes } from '@spotify/web-api-ts-sdk'
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { accentColorWorker } from '@/features/AccentColors'
import GreenPlayingButton from '@/shared/UI/Buttons/GreenPlayingButton.vue'
import EntityAvatar1x1 from '@/shared/UI/Elements/EntityAvatar1x1.vue'

const props = defineProps<Props>()

defineEmits<Emits>()

const { t } = useI18n()

interface Props {
  id: number | string
  type: ItemTypes
  name: string
  image: string | null
  maskLoaderImage?: string | null
  state?: boolean
}
interface Emits {
  onPlayClick: []
}

const maskColor = ref<string | null>(null)

onBeforeMount(async () => {
  const loaderImage = props.maskLoaderImage ?? props.image

  if (loaderImage) {
    maskColor.value = await accentColorWorker(loaderImage)
  }
})
</script>

<template>
  <div
    class="card v-music-card"
    @click="$router.push(`/${type}/${id}`)"
  >
    <EntityAvatar1x1
      class="image"
      :type="type"
      :image="image"
      :style="type === 'artist' && 'border-radius: 50%'"
      :loading-color="maskColor"
      loading="lazy"
    >
      <GreenPlayingButton
        class="playingState"
        :state="state ?? false"
        :playing-tooltip="t('music-actions.pauseMusic', [name])"
        :stopped-tooltip="t('music-actions.playPlaylist', [name])"
        @click.stop="$emit('onPlayClick')"
        @mousedown.prevent
      />
    </EntityAvatar1x1>

    <span v-if="name" class="b-600">
      {{ name }}
    </span>

    <div class="textInfo">
      <template v-if="type === 'artist'">
        {{ t('entities.artist') }}
      </template>
      <slot v-else />
    </div>

    <slot name="underlay" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: inline-flex;
  flex-direction: column;
  row-gap: 6px;
  border-radius: 6px;
  padding-block: 12px;
  padding-inline: 12px;
  cursor: pointer;
  transition: all ease 0.1s;
  user-select: none;
  position: relative;
  scroll-snap-align: start;

  &:hover {
    background-color: var(--ui-highlight);

    .image {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    }

    .playingState {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  }

  &:active {
    background-color: var(--black);
  }

  .image {
    width: 100%;
    aspect-ratio: 1/1;
    background-color: #333333;
    display: grid;
    place-items: center;
    border-radius: 6px;
    position: relative;
    margin-bottom: 3px;
    transition: background-color 0.2s ease-out;

    .noImage {
      width: 64px;
      height: 64px;
      fill: var(--white);
    }

    .playingState {
      position: absolute;
      opacity: 0;
      right: 8px;
      bottom: 8px;
      transform: translateY(8px);
      transition: all 0.2s ease-out;
    }
  }

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -moz-box-orient: vertical;
    overflow: hidden;
  }

  .textInfo {
    line-height: 1.1rem;
    max-height: 2.2rem;
    color: var(--text-soft) !important;
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -moz-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
