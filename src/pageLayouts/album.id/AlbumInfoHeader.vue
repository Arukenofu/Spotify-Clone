<script setup lang="ts">
import EntityInfoHeader from "@/UI/Elements/EntityInfoHeader.vue";
import EntityAvatar1x1 from "@/UI/Elements/EntityAvatar1x1.vue";
import getDeclention from "../../shared/utils/getDeclention";
import readableTime from "../../shared/utils/format/readableTime";
import type {Playlist} from "@/services/types/Entities/Playlist";
import EntityInfoHeaderTitle from "@/UI/Elements/EntityInfoHeader/EntityInfoHeaderTitle.vue";
import EntityInfoHeaderDot from "@/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue";

interface Props {
  image: string | null;
  mask: string | null;
  name: string;
  creator: Playlist['creators'],
  tracksAmount: number;
  totalDuration: number;
}

defineProps<Props>();
</script>

<template>
  <EntityInfoHeader class="info" :image :mask type="Album">
    <div class="type">Альбом</div>
    <EntityInfoHeaderTitle>{{name}}</EntityInfoHeaderTitle>
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

      <EntityInfoHeaderDot />

      <span>{{getDeclention(tracksAmount, 'трек', 'трека', 'треков')}}</span>

      <EntityInfoHeaderDot />

      <span>{{readableTime(totalDuration)}}</span>
    </div>
  </EntityInfoHeader>
</template>

<style scoped lang="scss">
.info {
  margin-top: -64px;
  user-select: none;

  &:deep(.img) {
    border-radius: 4px !important;
  }

  .type {
    font-weight: 500;
    font-size: .875rem;
  }

  .additional {
    display: flex;
    align-items: center;
    font-size: .875rem;
    font-weight: 500;

    & > span {
      color: var(--text-soft);
    }

    .dot {
      margin: 0 4px;
      color: var(--text-soft);
      font-weight: 500;
    }

    span {
      font-weight: 500;
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
</style>