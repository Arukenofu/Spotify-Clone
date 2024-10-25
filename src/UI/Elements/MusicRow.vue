<script setup lang="ts">
import getActiveColor from "@/shared/utils/getActiveColor";
import PlayingState from "@/UI/Icons/Shared/PlayingState.vue";
import NoMusicOrPlaylistAvatar from "@/UI/Icons/Shared/NoMusicOrPlaylistAvatar.vue";
import LazyImage from "@/UI/Elements/LazyImage.vue";
import getCommaSeparatedString from "@/shared/utils/getCommaSeparatedString";
import formatTime from "@/shared/utils/formatTimeMMSS";
import ThreeDots from "@/UI/Icons/Shared/ThreeDots.vue";
import RoundPlusIcon from "@/UI/Icons/Shared/RoundPlusIcon.vue";
import CheckedRoundCircleIcon from "@/UI/Icons/Shared/CheckedRoundCircleIcon.vue";
import type {SimpleArtist} from "@/services/types/Artist";
import {computed} from "vue";

interface Props {
  index: number;
  isCurrent: boolean;
  isPlaying: boolean;
  isAdded: boolean;
  musicId: number;
  musicName: string;
  duration: number;
  artists: SimpleArtist[];
  image: string | null;
  color?: string | null;

  first?: string;
  main: string;
  var1?: string,
  var2?: string,
  time: string,
}

const {first = '16px', main, var1 = '0', var2 = '0', time} = defineProps<Props>();

const computeGridStyle = computed(() => {
  return `grid-template-columns:
      [index] ${first}
      [main] ${main}
      [var1] ${var1}
      [var2] ${var2}
      [time] ${time};
  `
});

type Emits = {
  setPlay: [],
  addPlaylist: [],
  showContextMenu: [],
}

defineEmits<Emits>();
</script>

<template>
  <div class="row" :style="computeGridStyle" @click="$emit('setPlay')">
    <div class="index">
      <span class="order" :style="getActiveColor(isCurrent)">{{index}}</span>
      <button class="toggle">
        <img v-if="isPlaying" src="/equalizer-animated.gif" alt="" />
        <PlayingState v-else class="icon" />
      </button>
    </div>
    <div class="main">
      <LazyImage v-if="image" :image="image" :color="color" class="image" />
      <div v-else class="picture">
        <NoMusicOrPlaylistAvatar class="icon" />
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
      </div>
    </div>

    <div class="var1">
      <slot name="var1" />
    </div>
    <div class="var2">
      <slot name="var2" />
    </div>

    <div class="time">
      <button
        v-tooltip="isAdded ? 'Добавить в любимые треки' : 'Добавить в плейлист'"
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
          content: `Открыть контекстное меню: ${getCommaSeparatedString(artists, 'name')} — ${musicName}`,
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

  &:hover {
    background-color: hsla(0, 0%, 100%, .1);

    .index {
      .order {
        display: none;
      }

      .toggle {
        display: block;

        .icon {
          display: block;
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
      text-align: right;
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
      left: 3px;
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

    .image {
      height: 40px;
      aspect-ratio: 1/1;
      border-radius: 4px;
    }

    .picture {
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

    .text {
      display: flex;
      flex-direction: column;
      gap: 5px;
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