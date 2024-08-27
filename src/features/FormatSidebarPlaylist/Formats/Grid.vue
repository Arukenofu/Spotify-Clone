<script setup lang="ts">
import type {FormatProps} from "@/features/FormatSidebarPlaylist/types/FormatProps";
import NoMusicOrPlaylistAvatar from "@/UI/Icons/Shared/NoMusicOrPlaylistAvatar.vue";
import GreenPlayingButton from "@/UI/Buttons/GreenPlayingButton.vue";

interface GridFormatProps extends FormatProps {
  minimized: boolean
}

defineProps<GridFormatProps>();

</script>

<template>
  <RouterLink
      :to="`/playlist/${to}`"
      class="block"
      :class="!minimized && 'unminimized'"
  >
    <div class="picture">
      <div class="image" v-if="image" />
      <NoMusicOrPlaylistAvatar class="icon" v-else />

      <GreenPlayingButton
          v-if="!minimized && type !== 'Папка'"
          :state="false"
          class="stateButton"
          v-tooltip="`Слушать плейлист «${name}»`"
      />
    </div>

    <div class="text" v-if="!minimized">
      <span class="name">{{name}}</span>
      <span class="info">{{type}} • {{owner}}</span>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.unminimized {
  padding: 12px !important;
  position: relative;

  .picture {
    box-shadow: 0 8px 24px rgba(0,0,0,.5);
    position: relative;

    .stateButton {
      opacity: 0;
      transition: all 200ms ease;
      position: absolute;
      right: 8px;
      bottom: 8px;
      transform: translateY(8px);
    }
  }

  &:after {
    content: "";
    position: absolute;
    border-radius: 6px;
    inset: 12px;
    transition: all 300ms ease;
  }

  &:hover {
    background-color: transparent !important;

    .picture .stateButton {
      opacity: 1;
      transform: translateY(0);
    }

    &:after {
      inset: 0;
      background-color: var(--ui-highlight);
    }
  }
}

.block {
  display: grid;
  gap: 8px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  padding: 4px;
  transition: all 0.2s;

  .picture {
    border-radius: calc(4px);
    width: 100%;
    aspect-ratio: 1/1;
    display: grid;
    place-items: center;
    background-color: #333333;
    z-index: 1;

    .image {
      width: 100%;
      aspect-ratio: 1/1;
    }

    .icon {
      height: 50%;
      width: 50%;
      fill: var(--text-soft);
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
    flex-basis: 100%;
    z-index: 1;

    span {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
    }

    .name {
      font-size: 1rem;
      font-weight: 600;
    }

    .info {
      font-size: .875rem;
      color: var(--text-soft);
    }
  }
}
</style>