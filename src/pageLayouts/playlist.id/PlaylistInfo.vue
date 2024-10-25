<script setup lang="ts">
import EntityAvatar1x1 from '@/UI/Elements/EntityAvatar1x1.vue';
import localizeEntities from "../../services/utils/localizeEntities";
import readableTime from "../../shared/utils/readableTime";
import type {PlaylistInfoDossier} from "@/services/api/music/types/PlaylistInfo";
import getCommaSeparatedString from "../../shared/utils/getCommaSeparatedString";

interface Props extends PlaylistInfoDossier {
}

defineProps<Props>();

</script>

<template>
  <div class="playlist_about">
    <div class="baseBackground" />
    <div class="background" />
    <div class="playlist_about_section">
      <EntityAvatar1x1
        as="button"
        class="picture"
        type="Artist"
        :image="imageUrl"
      />

      <div class="info">
        <span class="type">
          {{localizeEntities(type)}}
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
            <span>{{getCommaSeparatedString(creator as [], 'name')}}</span>
          </div>
          <span class="dot">•</span>
          <div class="quantity">
            {{tracksAmount}} треков, примерно {{readableTime(tracksDuration)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.playlist_about {
  height: min(30vh, var(--fluid-height));
  max-height: 300px;
  min-height: var(--min-fluid-height);
  padding-bottom: var(--content-spacing);
  container: playlistInfo / inline-size;

  .playlist_about_section {
    display: flex;
    align-items: flex-end;
    padding: 0 var(--content-spacing);
    height: 100%;

    .picture {
      --size: clamp(128px, 128px + (100vw - var(--sidebar-width) * 1px - var(--panel-width) * 1px - 600px) / 424 * 104, 232px);

      margin-right: var(--content-spacing);
      width: var(--size);
      height: var(--size);
      border: none;
      cursor: pointer;
      transition: transform .1s linear;

      &:hover {
        transform: scale(1.02);
      }
    }

    .info {
      z-index: 1;
      display: flex;
      flex-direction: column;
      font-size: 1rem;

      .type {
        font-size: .875em;
        font-weight: 500;
      }

      .name {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        user-select: none;
        font-family: var(--title-font);
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
  }

  .baseBackground {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: var(--bg-mask);
  }

  .background {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background: linear-gradient(transparent 0, rgba(0,0,0,.5) 100%),var(--background-noise);
  }
}

@container playlistInfo (max-width: 1000px) {
  .playlist_about_section .info .name {
    font-size: 3.5em !important;
  }
}

@container playlistInfo (max-width: 700px) {
  .playlist_about_section .info {
    .name {
      font-size: 2em !important;
    }
  }
}
</style>