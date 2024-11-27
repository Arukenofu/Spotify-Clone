<script setup lang="ts">
import CheckedRoundCircleIcon from "@/UI/Icons/Shared/CheckedRoundCircleIcon.vue";
import RoundPlusIcon from "@/UI/Icons/Shared/RoundPlusIcon.vue";
import EntityAvatar1x1 from "@/UI/Elements/EntityAvatar1x1.vue";
import ShareIcon from "@/UI/Icons/Shared/ShareIcon.vue";
import CommaSeparatedArtistsLink from "@/shared/components/CommaSeparatedArtistsLink.vue";
import type {SimpleArtist} from "@/services/types/Entities/Artist";
import {copyLinkToClipboard} from "@/shared/utils/copyLinkToClipboard";

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
    <div class="text">
      <RouterLink
        class="track-name"
        :to="`/album/${id}`"
      >
        {{name}}
      </RouterLink>

      <span class="artists">
        <CommaSeparatedArtistsLink
          class="artist"
          :artists="artists"
        />
      </span>
    </div>
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

  .text {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .track-name {
      font-size: 1.5rem;
      font-weight: 700;

      &:hover {
        text-decoration: underline;
      }
    }

    .artists {
      &:deep(.v-link) {
        color: var(--text-soft);
        font-size: 1rem;
        font-weight: 400;

        &:hover {
          color: var(--white);
        }
      }
    }
  }

  .track-controls {
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