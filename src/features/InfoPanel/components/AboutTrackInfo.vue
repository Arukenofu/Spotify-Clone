<script setup lang="ts">
import CheckedRoundCircleIcon from "@/UI/Icons/Shared/CheckedRoundCircleIcon.vue";
import RoundPlusIcon from "@/UI/Icons/Shared/RoundPlusIcon.vue";
import EntityAvatar1x1 from "@/UI/Elements/EntityAvatar1x1.vue";
import ShareIcon from "@/UI/Icons/Shared/ShareIcon.vue";
import CommaSeparatedArtistsLink from "@/shared/components/CommaSeparatedArtistsLink.vue";
import type {SimpleArtist} from "@/services/types/Entities/Artist";
import {copyLinkToClipboard} from "@/shared/utils/copyLinkToClipboard";
import MainTrackInfo from "@/UI/Elements/MainTrackInfo.vue";
import Marquee from "@/shared/components/Marquee.vue";

const {id} = defineProps<{
  id: string | number;
  name: string;
  avatar: string | null;
  loadingColor: string | null;
  artists: SimpleArtist[]
  isAddedToFavorites: boolean;
}>();

function copyLink() {
  copyLinkToClipboard(`${window.location.host}/track/${id}`);
}
</script>

<template>
  <EntityAvatar1x1
    class="avatar"
    type="Track"
    :image="avatar"
    :loading-color="loadingColor"
  />
  <div class="main-track-info">
    <MainTrackInfo class="track-info">
      <template #title>
        <Marquee v-slot="{startMarquee}">
          <RouterLink
            class="track-title"
            :to="`/track/${id}`"
            @mouseenter="startMarquee"
          >
            {{name}}
          </RouterLink>
        </Marquee>
      </template>
      <template #artists>
        <CommaSeparatedArtistsLink class="artist" :artists="artists" />
      </template>
    </MainTrackInfo>
    <div class="track-controls">
      <button
        v-tooltip="`Скопировать ссылку на трек`"
        class="copy button"
        @click="copyLink()"
      >
        <ShareIcon class="icon" />
      </button>

      <button
        v-tooltip="isAddedToFavorites ? 'Добавить в плейлист' : 'Добавить в любимые треки'"
        class="button"
      >
        <Component
          :is="isAddedToFavorites ? CheckedRoundCircleIcon : RoundPlusIcon"
          class="icon"
        />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 16px;
}

.main-track-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;

  .track-info {
    .track-title {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.2;

      &:hover {
        text-decoration: underline;
      }
    }

    .artist {
      font-size: 1rem;
    }
  }

  .track-controls {
    margin-left: 12px;
    width: 56px;
    display: flex;
    gap: 12px;

    .copy {
      width: 20px !important;
      height: 20px !important;

      .icon {
        fill: var(--text-soft) !important;
      }

      &:hover .icon {
        fill: var(--white) !important;
      }
    }

    .button {
      width: 22px;
      height: 22px;
      background: none;
      border: none;
      cursor: pointer;

      .icon {
        fill: var(--white);
      }
    }
  }
}
</style>