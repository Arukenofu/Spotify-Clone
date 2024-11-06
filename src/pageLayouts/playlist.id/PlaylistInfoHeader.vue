<script setup lang="ts">
import readableTime from "../../shared/utils/format/readableTime";
import getCommaSeparatedString from "../../shared/utils/format/getCommaSeparatedString";
import type {PlaylistInfoDossier} from "@/services/api/music/types/PlaylistInfo";
import EntityInfoHeader from "@/UI/Elements/EntityInfoHeader.vue";

interface Props extends PlaylistInfoDossier {
}

defineProps<Props>();

</script>

<template>
  <EntityInfoHeader
    class="playlist_about"
    :image="image ?? null"
    :mask="color ?? null"
    type="Playlist"
  >
    <span class="type">
      Плейлист
    </span>

    <h1 class="name">{{name}}</h1>

    <div class="artists">
      {{description}}
    </div>

    <div class="other-info">
      <div class="logo">
        <figure title="Spotify">
          <div><img aria-hidden="false" draggable="false" loading="eager" src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5" alt="Spotify"></div>
        </figure>
        <span>{{ getCommaSeparatedString(creators as [], 'name') }}</span>
      </div>
      <span class="dot">•</span>
      <div class="quantity">
        {{ info.tracksAmount }} треков, примерно {{ readableTime(info.totalDuration) }}
      </div>
    </div>
  </EntityInfoHeader>
</template>

<style scoped lang="scss">
.playlist_about {
  container: playlistInfo / inline-size;
  user-select: none;

  .type {
    font-size: .875em;
    font-weight: 500;
  }

  .name {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    user-select: none;
    font-size: 6em;
    font-weight: 900;
    white-space: nowrap;
    -webkit-box-orient: vertical;
    line-height: normal;
    overflow: hidden;
    text-align: left;
    width: 100%;
    word-break: break-word;
  }

  .artists {
    color: var(--text-soft);
    font-size: .875em;
    font-weight: 500;
    line-height: normal;
    overflow: hidden;
    text-align: left;
    width: 100%;
    word-break: break-word;
    white-space: nowrap;
  }

  .other-info {
    margin-top: 8px;
    height: 24px;
    display: flex;
    align-items: center;
    white-space: nowrap;

    .logo {
      color: hsla(0,0%,100%,.7);
      white-space: nowrap;
      display: flex;
      grid-auto-flow: column;
      grid-gap: 4px;
      align-items: center;

      figure, img {
        width: 20px;
        height: 20px;
      }

      img {
        border-radius: 50%;
        object-fit: cover;
        object-position: center center;
      }

      span {
        font-size: .875em;
        font-weight: 700;
      }
    }

    span, .quantity {
      color: var(--text-soft);
      font-size: .875em;
      font-weight: 500;
    }

    & > span {
      margin: 0 4px;
    }
  }
}

@container playlistInfo (max-width: 1000px) {
  .info .name {
    font-size: 3.5em !important;
  }
}

@container playlistInfo (max-width: 700px) {
  .info {
    .name {
      font-size: 2em !important;
    }
  }
}
</style>