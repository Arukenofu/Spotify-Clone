<script setup lang="ts">
import EntityInfoHeader from "@/shared/UI/Elements/EntityInfoHeader.vue";
import EntityAvatar1x1 from "@/shared/UI/Elements/EntityAvatar1x1.vue";
import EntityInfoHeaderTitle from "@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderTitle.vue";
import EntityInfoHeaderDot from "@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue";
import {useI18n} from "vue-i18n";
import type {Album} from "@spotify/web-api-ts-sdk";

const {t} = useI18n();

interface Props {
  image: string | null;
  mask: string | null;
  name: string;
  creator: Album['artists'],
  tracksAmount: number;
}

defineProps<Props>();
</script>

<template>
  <EntityInfoHeader class="info" :image :mask type="album">
    <div class="type">{{t('entities.album')}}</div>
    <EntityInfoHeaderTitle>{{name}}</EntityInfoHeaderTitle>
    <div class="additional">
      <div v-if="creator.length === 1" class="single-artist">
        <EntityAvatar1x1 class="artist-img" type="artist" />
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

      <span>{{t('plurable-entities.track', tracksAmount).toLowerCase()}}</span>
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

      .artist-img {
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