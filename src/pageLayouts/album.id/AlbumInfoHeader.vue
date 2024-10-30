<script setup lang="ts">
import EntityInfoHeader from "@/UI/Elements/EntityInfoHeader.vue";
import EntityAvatar1x1 from "@/UI/Elements/EntityAvatar1x1.vue";
import type {PlaylistInfoDossier} from "@/services/api/music/types/PlaylistInfo";
import getDeclention from "../../shared/utils/getDeclention";
import readableTime from "../../shared/utils/format/readableTime";

interface Props {
  image: string | null;
  mask: string | null;
  name: string;
  creator: PlaylistInfoDossier['creators'],
  tracksAmount: number;
  totalDuration: number;
}

defineProps<Props>();
</script>

<template>
  <EntityInfoHeader class="info" :image :mask type="Album">
    <div class="type">Альбом</div>
    <h1 class="name">{{name}}</h1>
    <div class="additional">
      <div v-if="creator.length === 1" class="single-artist">
        <EntityAvatar1x1 class="img" type="Artist" />
        <RouterLink :to="`/artist/${creator[0].id}`" class="name">
          {{creator[0].name}}
        </RouterLink>
      </div>
      <div v-else class="artists">
        <template
          v-for="(artist, index) in creator"
          :key="artist.id"
        >
          <RouterLink
            :to="`/artist/${artist.id}`"
            class="artist"
          >
            {{artist.name}}
          </RouterLink>

          <template v-if="index !== creator.length-1">&nbsp;•&nbsp;</template>
        </template>
      </div>

      <div class="dot">•</div>

      <span>{{getDeclention(tracksAmount, 'трек', 'трека', 'треков')}}</span>

      <div class="dot">•</div>

      <span>{{readableTime(totalDuration)}}</span>
    </div>
  </EntityInfoHeader>
</template>

<style scoped lang="scss">
.info {
  margin-top: -64px;
  container: playlistInfo / inline-size;
  user-select: none;

  &:deep(.img) {
    border-radius: 4px !important;
  }

  .type {
    font-weight: 500;
    font-size: .875rem;
  }

  .name {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left;
    user-select: none;
    font-weight: 800;
    font-family: var(--title-font);
    text-wrap: nowrap;
    margin-bottom: 8px;
    line-height: 1.2;
    width: min-content;
    font-size: 6rem;
  }

  .additional {
    display: flex;
    align-items: center;
    font-size: .875rem;
    font-weight: 700;

    & > span {
      color: var(--text-soft);
    }

    .dot {
      margin: 0 4px;
      color: var(--text-soft);
    }

    .single-artist {
      display: inline-flex;
      align-items: center;
      gap: 3px;

      .img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }

      .name {
        color: var(--white);
        font-weight: 700;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .artists {
      display: inline-flex;
      align-items: center;

      .artist {
        color: var(--white);
        font-weight: 700;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@container playlistInfo (max-width: 1000px) {
  .name {
    font-size: 3.5em !important;
  }
}

@container playlistInfo (max-width: 700px) {
  .name {
    font-size: 2em !important;
  }
}
</style>