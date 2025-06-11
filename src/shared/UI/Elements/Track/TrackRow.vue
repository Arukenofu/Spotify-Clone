<script setup lang="ts">
import getActiveColor from "@/shared/utils/getActiveColor";
import PlayingState from "@/shared/UI/Icons/PlayingState.vue";
import NoMusicOrPlaylistAvatar from "@/shared/UI/Icons/NoMusicOrPlaylistAvatar.vue";
import LazyImage from "@/shared/UI/Elements/LazyImage.vue";
import formatTime from "@/shared/utils/format/formatTimeMMSS";
import ThreeDots from "@/shared/UI/Icons/ThreeDots.vue";
import RoundPlusIcon from "@/shared/UI/Icons/RoundPlusIcon.vue";
import CheckedRoundCircleIcon from "@/shared/UI/Icons/CheckedRoundCircleIcon.vue";
import {useI18n} from "vue-i18n";
import CommaSeparatedArtistsLink from "@/shared/components/Sugar/CommaSeparatedArtistsLink.vue";
import getCommaSeparatedString from "@/shared/utils/format/getCommaSeparatedString";
import type {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import {computed} from "vue";

interface Props {
  index?: number;
  track: Track | SimplifiedTrack;
  isCurrent: boolean;
  isPlaying: boolean;
  isAdded: boolean;

  compact?: boolean;
  showArtists?: boolean;
  hideImage?: boolean;
}

type Emits = {
  setPlay: [],
  addPlaylist: [],
  showContextMenu: [],
}

const props = withDefaults(defineProps<Props>(), {
  showArtists: true
});
defineEmits<Emits>();

const image = 'album' in props.track ? getImageFromEntity(props.track.album.images, 2) : null;

const optionsContextMenu = computed(() => ({
  content:
      t('music-actions.moreOptionsFor',
          [`${getCommaSeparatedString(props.track.artists, 'name')} — ${props.track.name}`]
      ),
  style: {
    overflow: 'hidden',
    textAlign: 'right',
    direction: 'revert'
  }
}));

const {t} = useI18n();
</script>

<template>
  <div
    class="row"
    :class="compact && 'row-compact'"
  >
    <div v-if="index" class="index">
      <span
        class="order hide-on-hover"
        :style="getActiveColor(isCurrent)"
      >
        {{index}}
      </span>
      <button class="toggle show-on-hover">
        <img v-if="isPlaying" src="/src/assets/images/equalizer-animated.gif" alt="" />
        <PlayingState v-else class="icon" />
      </button>
    </div>
    <div class="main">
      <div v-if="!(compact || hideImage)" class="image-wrapper" :class="!index && 'noindex'">
        <LazyImage v-if="image !== null" :image="image" class="image" />

        <div v-else class="icon image">
          <NoMusicOrPlaylistAvatar class="icon" />
        </div>

        <PlayingState v-if="!index" :state="isPlaying && isCurrent" class="state-icon" />
      </div>
      <div class="track-info">
        <RouterLink
          v-tooltip="track.name"
          :to="`/track/${track.id}`"
          :style="getActiveColor(isCurrent)"
          class="musicName"
          @click.stop
        >
          {{track.name}}
        </RouterLink>
        <span
          v-if="showArtists && !compact"
          class="artists"
          @click.stop
        >
          <CommaSeparatedArtistsLink class="artist" :artists="track.artists" />
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
        class="addState show-on-hover"
        @click.stop
      >
        <CheckedRoundCircleIcon v-if="isAdded" class="remove" />
        <RoundPlusIcon v-else class="add" />
      </button>
      <span>
        {{formatTime(track.duration_ms / 1000)}}
      </span>

      <button
        v-tooltip="optionsContextMenu"
        class="contextMenu show-on-hover"
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

    .hide-on-hover {
      display: none;
    }

    .show-on-hover {
      display: initial;
      visibility: initial;
      opacity: 1 !important;
    }

    .toggle {
      display: grid !important;
    }

    .noindex {
      ::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        z-index: 1;
      }

      .state-icon {
        opacity: 1;
        z-index: 1 !important;
      }
    }

    .artists:deep(a) {
      color: var(--white) !important;
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

    .toggle {
      display: none;
      place-items: center;
      position: relative;
      width: 16px;
      height: 16px;
      background: none;
      border: none;

      .icon {
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
        background-color: transparent;
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

    .track-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      justify-items: center;

      a {
        line-height: 1.2;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: unset;
        word-break: break-all;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          text-decoration: underline;
        }
      }

      .musicName {
        color: var(--white);
        text-decoration: none;
        font-size: 1rem;
        text-underline-offset: 2px;
      }

      .artists {
        color: var(--text-soft);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.375;

        :deep(.artist) {
          line-height: 1.5;

          &:hover {
            color: var(--white);
            text-decoration: underline;
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
    justify-content: flex-end;

    span {
      font-size: .875rem;
      font-weight: 500;
      color: var(--text-soft);
      width: 5ch;
      margin-right: 12px;
      text-align: right;
    }

    .addState {
      opacity: 0;
      margin-right: 12px;
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
      opacity: 0;
      width: 16px;
      height: 16px;
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