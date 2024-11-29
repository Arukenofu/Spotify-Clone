<script setup lang="ts">
import readableTime from "@/shared/utils/format/readableTime";
import EntityInfoHeader from "@/UI/Elements/EntityInfoHeader.vue";
import type {Playlist} from "@/services/types/Entities/Playlist";
import LazyImage from "@/UI/Elements/LazyImage.vue";
import {computed} from "vue";
import getDeclention from "@/shared/utils/getDeclention";

interface Props extends Playlist {
}

const {creators} = defineProps<Props>();

const creator = computed(() => {
  return creators[0];
});

</script>

<template>
  <EntityInfoHeader
    class="playlist_about"
    :image="image"
    :mask="color"
    type="Playlist"
  >
    <span class="type">Плейлист</span>

    <h1 class="name">{{name}}</h1>

    <div class="other-info">
      <div class="creator">
        <RouterLink
          :to="`/${creator.type.toLowerCase()}/${creator.id}`"
          class="link"
          draggable="false"
        >
          <LazyImage
            v-if="creator.avatar"
            :image="creator.avatar"
            class="avatar"
          />

          <span>
            {{creators[0].name}}
          </span>
        </RouterLink>
      </div>
      <span class="dot">•</span>
      <div class="quantity">
        {{ getDeclention(info.tracksAmount, 'трек', 'трека', 'треков') }}, примерно {{ readableTime(info.totalDuration) }}
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

    .link {
      display: flex;
      align-items: center;
      gap: 4px;
      user-select: none;

      &:hover {

        span {
          text-decoration: underline 1px;
        }
      }

      .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }

      span {
        font-weight: 700;
        font-size: .875rem;
        color: var(--white);
        line-height: 1;
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