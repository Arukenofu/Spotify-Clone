<script setup lang="ts">
import {computed, inject, type Ref} from 'vue';
import useMusicUtils from "@/features/MediaPlayer/composables/useMusicUtils";
import type {Playlist} from "@/services/types/Entities/Playlist";
import type {Track} from "@/services/types/Entities/Track";
import MusicRowHeader from "@/UI/Elements/MusicRowHeader.vue";
import MusicRow from "@/UI/Elements/Track/TrackRow.vue";
import CommaSeparatedArtistsLink from "@/shared/components/CommaSeparatedArtistsLink.vue";
import {useMusicCollectionFormat} from "@/features/MusicCollectionFormat";

interface Props {
  queue: Track[],
  dossier: Playlist,
}

const {dossier, queue} = defineProps<Props>();

const {format} = useMusicCollectionFormat();

const currentFormatClass = computed(() => {
  return format.value === 'Компактный' ? 'compact' : 'list';
});

const {
  isThisPlaylistAndMusic
} = useMusicUtils();

const layoutContent = inject<Ref<HTMLElement & {content: HTMLElement}>>('layoutContent');
</script>

<template>
  <div class="playlist-table" :class="`table-${currentFormatClass}`">
    <MusicRowHeader
      :parent-element="layoutContent!.content"
      class="row-header computedGrid"
    >
      <template #var1>
        <template v-if="format === 'Компактный'">
          Исполнитель
        </template>
        <template v-else>
          Альбом
        </template>
      </template>
      <template #var2>
        <template v-if="format === 'Компактный'">
          Альбом
        </template>
        <template v-else>
          Дата добавления
        </template>
      </template>
      <template v-if="format === 'Компактный'" #var3>
        Дата добавления
      </template>
    </MusicRowHeader>

    <div class="music-collection-wrapper">
      <MusicRow
        v-for="(music, index) of queue"
        :key="music.id"
        :index="index + 1"
        :is-current="isThisPlaylistAndMusic(music.id, dossier.id)"
        :is-playing="isThisPlaylistAndMusic(music.id, dossier.id, true)"
        :music-id="music.id"
        :music-name="music.name"
        :duration="music.duration"
        :artists="music.artists"
        :image="music.avatar"
        :color="music.color"
        :is-added="false"
        :show-artists="true"
        :compact="format === 'Компактный'"
        class="row computedGrid"
      >
        <template #var1>
          <CommaSeparatedArtistsLink
            v-if="format === 'Компактный'"
            :artists="music.artists"
            class="artists"
          />
          <RouterLink
            v-else
            :to="`/album/${music.album.id}`"
            class="link"
          >
            {{music.album.name}}
          </RouterLink>
        </template>
        <template #var2>
          <RouterLink
            v-if="format === 'Компактный'"
            :to="`/album/${music.album.id}`"
            class="link"
          >
            {{music.album.name}}
          </RouterLink>
          <span v-else class="text">
            {{music.uploadedDate}}
          </span>
        </template>
        <template v-if="format === 'Компактный'" #var3>
          <span class="text">
            {{music.uploadedDate}}
          </span>
        </template>
      </MusicRow>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-compact {
  container: playlist-table / inline-size;

  .computedGrid {
    grid-template-columns:
      [index] 16px
      [main] minmax(120px, 6fr)
      [var1] minmax(120px, 4fr)
      [var2] minmax(120px, 3fr)
      [var3] minmax(120px, 2fr)
      [time] minmax(120px, 1fr);
  }

  @container playlist-table (max-width: 1000px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 6fr)
        [var1] minmax(120px, 4fr)
        [var2] minmax(120px, 3fr)
        [var3] 0
        [time] minmax(120px, 1fr);


      &:deep(.var3) {
        display: none;
      }
    }
  }

  @container playlist-table (max-width: 750px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] minmax(120px, 2fr)
        [var2] 0
        [var3] 0
        [time] minmax(120px, 1fr);


      &:deep(.var2, .var3,) {
        display: none;
      }
    }
  }

  @container playlist-table (max-width: 550px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] 0
        [var2] 0
        [var3] 0
        [time] minmax(120px, 1fr);


      &:deep(.var1, .var2, .var3) {
        display: none;
      }
    }
  }
}

.table-list {
  container: playlist-table / inline-size;

  .computedGrid {
    grid-template-columns:
      [index] 16px
      [main] minmax(120px, 6fr)
      [var1] minmax(120px, 4fr)
      [var2] minmax(120px, 4fr)
      [time] minmax(120px, 1fr);
  }

  @container playlist-table (max-width: 760px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] minmax(120px, 2fr)
        [var2] 0
        [time] minmax(120px, 1fr) !important;

      &:deep(.var2) {
        display: none;
      }
    }
  }

  @container playlist-table (max-width: 550px) {
    .computedGrid {
      grid-template-columns:
        [index] 16px
        [main] minmax(120px, 4fr)
        [var1] 0
        [var2] 0
        [time] minmax(120px, 1fr) !important;

      &:deep(.var1, .var2) {
        display: none;
      }
    }
  }
}

.playlist-table {
  container: playlist-table / inline-size;

  .music-collection-wrapper {
    margin-top: var(--content-spacing);
    padding: 0 var(--content-spacing);

    .row {

      &:hover {
        .link, &:deep(.v-link) {
          color: var(--white);
        }
      }

      .link, &:deep(.v-link) {
        color: var(--text-soft);
        font-size: .875rem;
        font-weight: 500  ;

        &:hover {
          text-decoration: underline;
        }
      }

      .text {
        color: var(--text-soft);
        font-size: .875rem;
        font-weight: 500;
      }
    }
  }
}
</style>