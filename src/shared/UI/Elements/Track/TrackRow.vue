<script setup lang="ts">
import getActiveColor from "@/shared/utils/getActiveColor";
import PlayingState from "@/shared/UI/Icons/PlayingState.vue";
import NoMusicOrPlaylistAvatar from "@/shared/UI/Icons/NoMusicOrPlaylistAvatar.vue";
import LazyImage from "@/shared/UI/Elements/LazyImage.vue";
import getCommaSeparatedString from "@/shared/utils/format/getCommaSeparatedString";
import formatTime from "@/shared/utils/format/formatTimeMMSS";
import ThreeDots from "@/shared/UI/Icons/ThreeDots.vue";
import RoundPlusIcon from "@/shared/UI/Icons/RoundPlusIcon.vue";
import CheckedRoundCircleIcon from "@/shared/UI/Icons/CheckedRoundCircleIcon.vue";
import type {SimpleArtist} from "@/services/types/Entities/Artist";
import {useI18n} from "vue-i18n";

interface Props {
  index?: number;
  isCurrent: boolean;
  isPlaying: boolean;
  isAdded: boolean;
  musicId: string | number;
  musicName: string;
  duration: number;
  artists: SimpleArtist[];
  showArtists?: boolean;
  image: string | null;
  color: string | null;
  compact?: boolean;
}

const {showArtists = true} = defineProps<Props>();

type Emits = {
  setPlay: [],
  addPlaylist: [],
  showContextMenu: [],
}

defineEmits<Emits>();

const {t} = useI18n();
</script>

<template>
  <div
    class="row"
    :class="compact && 'row-compact'"
    @click="$emit('setPlay')"
  >
    <div
      v-if="index"
      class="index"
    >
      <span
        class="order"
        :style="getActiveColor(isCurrent)"
      >
        {{index}}
      </span>
      <button class="toggle">
        <img v-if="isPlaying" src="/src/assets/images/equalizer-animated.gif" alt="" />
        <PlayingState v-else class="icon" />
      </button>
    </div>
    <div class="main">
      <div v-if="!compact" class="image-wrapper" :class="!index && 'noindex'">
        <PlayingState v-if="!index" :state="isPlaying && isCurrent" class="state-icon" />

        <LazyImage
          v-if="image !== null"
          :image="image"
          :color="color"
          class="image"
        />
        <div
          v-else
          class="icon image"
        >
          <NoMusicOrPlaylistAvatar class="icon" />
        </div>
      </div>
      <div class="text">
        <RouterLink
          v-tooltip="musicName"
          :to="`/track/${musicId}`"
          :style="getActiveColor(isCurrent)"
          class="musicName"
          @click.stop
        >
          {{musicName}}
        </RouterLink>
        <span
          v-if="showArtists && !compact"
          class="artists"
          @click.stop
        >
          <RouterLink
            v-for="artist in artists"
            :key="artist.id"
            :to="`/artist/${artist.id}`"
          >
            {{artist.name}}
          </RouterLink>
        </span>
      </div>
    </div>

    <div v-if="$slots.var1" class="var1">
      <slot name="var1" />
    </div>
    <div v-if="$slots.var2" class="var2">
      <slot name="var2" />
    </div>
    <div v-if="$slots.var3" class="var3">
      <slot name="var3" />
    </div>

    <div class="time">
      <button
        v-tooltip="isAdded ? t('contextmenu-items.addToPlaylist') : t('contextmenu-items.addToFavoriteTracks')"
        class="addState"
        @click.stop
      >
        <CheckedRoundCircleIcon v-if="isAdded" class="remove" />
        <RoundPlusIcon v-else class="add" />
      </button>
      <span>
        {{formatTime(duration)}}
      </span>

      <button
        v-tooltip="{
          content: t('music-actions.moreOptionsFor', [`${getCommaSeparatedString(artists, 'name')} — ${musicName}`]),
          style: {
            overflow: 'hidden',
            textAlign: 'right',
            direction: 'revert'
          }
        }"
        class="contextMenu"
        @click.stop
      >
        <ThreeDots />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row-compact {
  height: 32px !important;
}

.row {
  height: 56px;
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-template-rows: auto;
  grid-template-columns: auto;
  align-items: center;
  border-radius: 4px;
  user-select: none;
  padding: 0 16px;
  cursor: pointer;

  &:hover {
    background-color: hsla(0, 0%, 100%, .1);

    .index {
      .order {
        display: none;
      }

      .toggle {
        display: grid;
        place-items: center;

        .icon {
          display: block;
        }
      }
    }

    .main {
      .noindex {
        ::before {
          content: "";
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.26);
          border-radius: 4px;
        }

        .state-icon {
          opacity: 1;
        }
      }

      .text {
        .artists a {
          color: var(--white);
        }
      }
    }

    .time {
      button {
        display: block;
      }
    }
  }

  .index {
    grid-column: index;
    width: 16px;
    height: 100%;
    display: grid;
    justify-items: end;
    align-items: center;

    .order {
      color: var(--text-soft);
      margin: 0 auto;
    }

    &:has(.toggle img) {
      .order {
        display: none;
      }
      .toggle {
        display: block;
      }
    }

    .toggle {
      display: none;
      position: relative;
      width: 16px;
      height: 16px;
      background: none;
      border: none;

      .icon {
        display: none;
        width: 100%;
        height: 100%;
        fill: var(--white);
      }

      img {
        width: 16px;
        height: 16px;
      }
    }
  }

  .main {
    grid-column: main;
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;

    .noindex {
      position: relative;
      display: grid;
      place-items: center;

      .state-icon {
        opacity: 0;
        position: absolute;
        width: 20px;
        height: 20px;
        fill: var(--white);
        z-index: 1;
      }
    }

    .image-wrapper {
      position: relative;

      .image {
        height: 40px;
        aspect-ratio: 1/1;
        border-radius: 4px;
      }

      .icon {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        background-color: #333333;
        display: grid;
        place-items: center;

        .icon {
          fill: var(--text-soft);
          width: 50%;
          height: 50%;
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: 3px;
      justify-items: center;

      a {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: unset;
        word-break: break-all;
        font-weight: 400;

        &:hover {
          text-decoration: underline;
        }
      }

      .musicName {
        color: var(--white);
        text-decoration: none;
        font-size: 1rem;
      }

      .artists {
        display: flex;

        a {
          color: var(--text-soft);
          font-size: .875rem;
          font-weight: 400;

          &:hover {
            color: var(--white) !important;
          }

          &:not(:last-child)::after {
            content: ",\00a0";
          }
        }
      }
    }
  }

  .var1 {
    grid-column: var1;
  }
  .var2 {
    grid-column: var2;
  }

  .time {
    grid-column: time;
    position: relative;
    display: flex;
    align-items: center;

    span {
      font-size: .875rem;
      color: var(--text-soft);
      margin-left: auto;
      margin-right: 32px;
    }

    .addState {
      display: none;
      position: absolute;
      left: 16px;
      width: 16px;
      height: 16px;
      background: none;
      border: none;
      cursor: pointer;

      .add, .remove {
        width: 16px;
        height: 16px;
      }

      .remove {
        fill: var(--main-color);
      }
      .add {
        fill: var(--text-soft);

        &:hover {
          fill: var(--main-color);
          scale: 1.05;
        }
      }
    }

    .contextMenu {
      display: none;
      width: 16px;
      height: 16px;
      position: absolute;
      right: 0;
      background: none;
      border: none;
      cursor: pointer;

      svg {
        width: 16px;
        height: 16px;
        scale: 1.25;
        fill: var(--white);
      }
    }
  }
}
</style>