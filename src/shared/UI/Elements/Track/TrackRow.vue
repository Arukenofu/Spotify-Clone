<script setup lang="ts">
import type { SimplifiedTrack, Track } from '@spotify/web-api-ts-sdk'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import EqualizerAnimated from '@/assets/images/equalizer-animated.gif'
import CommaSeparatedArtistsLink from '@/shared/components/Sugar/CommaSeparatedArtistsLink.vue'
import LazyImage from '@/shared/UI/Elements/LazyImage.vue'
import CheckedRoundCircleIcon from '@/shared/UI/Icons/CheckedRoundCircleIcon.vue'
import NoMusicOrPlaylistAvatar from '@/shared/UI/Icons/NoMusicOrPlaylistAvatar.vue'
import PlayingState from '@/shared/UI/Icons/PlayingState.vue'
import RoundPlusIcon from '@/shared/UI/Icons/RoundPlusIcon.vue'
import ThreeDots from '@/shared/UI/Icons/ThreeDots.vue'
import getActiveColor from '@/shared/utils/colors/getActiveColor'
import formatTimeMMSS from '@/shared/utils/format/formatTimeMMSS.ts'
import getCommaSeparatedString from '@/shared/utils/format/getCommaSeparatedString'
import getImageFromEntity from '@/shared/utils/image/getImageFromEntity'

interface Props {
  index?: number
  track: Track | SimplifiedTrack
  isCurrent: boolean
  isPlaying: boolean
  isAdded: boolean

  compact?: boolean
  showArtists?: boolean
  hideImage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showArtists: true,
})

const { t } = useI18n()

const image = computed(() =>
  'album' in props.track ? getImageFromEntity(props.track.album.images, 2) : null,
)
const showImage = computed(() => !(props.compact || props.hideImage))
const showEqualizer = computed(() => props.isPlaying && props.isCurrent)

const optionsContextMenu = computed(() => ({
  content:
      t('music-actions.moreOptionsFor', [`${getCommaSeparatedString(props.track.artists, 'name')} — ${props.track.name}`],
      ),
  style: {
    overflow: 'hidden',
    textAlign: 'right',
    direction: 'revert',
  },
}))
</script>

<template>
  <div v-memo="[track.id, isCurrent, isPlaying, isAdded, compact]" class="row" :class="{ 'row-compact': compact }">
    <div v-if="index" class="index">
      <span class="order hide-on-hover" :style="getActiveColor(isCurrent)">{{ index }}</span>
      <button class="toggle show-on-hover">
        <img v-if="showEqualizer" :src="EqualizerAnimated" alt="">
        <PlayingState v-else class="icon" />
      </button>
    </div>

    <div class="main">
      <div v-if="showImage" class="image-wrapper" :class="{ noindex: !index }">
        <LazyImage v-if="image" :image="image" class="image" />
        <div v-else class="icon image">
          <NoMusicOrPlaylistAvatar class="icon" />
        </div>
        <PlayingState v-if="!index" :state="isPlaying && isCurrent" class="state-icon" />
      </div>

      <div class="track-info">
        <Tippy :content="track.name">
          <RouterLink :to="`/track/${track.id}`" :style="getActiveColor(isCurrent)" class="musicName" @click.stop>
            {{ track.name }}
          </RouterLink>
        </Tippy>
        <span v-if="showArtists && !compact" class="artists" @click.stop>
          <CommaSeparatedArtistsLink class="artist" :artists="track.artists" />
        </span>
      </div>
    </div>

    <template v-for="n in 3" :key="n">
      <div v-if="$slots[`var${n}`]" :class="`var${n}`">
        <slot :name="`var${n}`" />
      </div>
    </template>

    <div class="time">
      <Tippy :content="isAdded ? t('contextmenu-items.addToPlaylist') : t('contextmenu-items.addToFavoriteTracks')">
        <button class="addState show-on-hover" @click.stop>
          <CheckedRoundCircleIcon v-if="isAdded" class="remove" />
          <RoundPlusIcon v-else class="add" />
        </button>
      </Tippy>
      <span>{{ formatTimeMMSS(track.duration_ms / 1000) }}</span>
      <Tippy :content="optionsContextMenu.content">
        <button class="contextMenu show-on-hover" @click.stop>
          <ThreeDots />
        </button>
      </Tippy>
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

    .main .track-info .artists {

      &:deep(.v-link), &:deep(.comma) {
        color: var(--white) !important;
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

    .toggle {
      display: none;
      place-items: center;
      position: relative;
      width: 16px;
      height: 16px;
      background: none;
      border: none;
      cursor: pointer;

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

      .musicName {
        color: var(--white);
        text-decoration: none;
        font-size: 1rem;
        text-underline-offset: 2px;
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

      .artists {
        color: var(--text-soft);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 16px;
        font-size: .95rem;

        :deep(.artist) {
          line-height: 0;

          &:hover {
            color: var(--white);
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
