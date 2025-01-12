<script setup lang="ts">
import GreenPlayingButton from "@/shared/UI/Buttons/GreenPlayingButton.vue";
import type {Entities} from "@/services/types/Entities";
import EntityAvatar1x1 from "@/shared/UI/Elements/EntityAvatar1x1.vue";
import CommaSeparatedArtistsLink from "@/shared/components/Sugar/CommaSeparatedArtistsLink.vue";
import localizeEntities from "../../../services/utils/localizeEntities";

interface Props {
  id: string | number;
  name: string;
  image: string | null;
  type: Entities;
  artists?: {id: string; name: string}[];
  isCurrent?: boolean;
  isPlaying?: boolean;
}

const {
  isCurrent = false,
  isPlaying = false
} = defineProps<Props>();

type Emits = {
  onButtonClick: [];
}
defineEmits<Emits>();
</script>

<template>
  <RouterLink :to="`/${type}/${id}`.toLowerCase()" class="card">
    <div class="image-outer">
      <EntityAvatar1x1
        class="image"
        :class="(type === 'Artist' || type === 'User') && 'round'"
        :image="image"
        :type="type"
      />
    </div>
    <div class="card-title">
      {{ name }}
    </div>
    <div class="info">
      <div class="type">
        {{ localizeEntities(type) }}
      </div>
      <div v-if="artists" class="name">
        <div class="dot">•</div>

        <CommaSeparatedArtistsLink class="link" :artists="artists" />
      </div>
    </div>

    <GreenPlayingButton
      v-if="type !== 'User'"
      class="playingState"
      :state="isCurrent && isPlaying"
      @click.prevent="$emit('onButtonClick')"
    />
  </RouterLink>
</template>

<style scoped lang="scss">
.card {
  display: block;
  height: 100%;
  background-color: #181818;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border-radius: 8px;
  padding: 20px;
  position: relative;

  &:hover {
    text-decoration: none;
  }

  .image-outer {
    width: 96px;
    height: 96px;
    margin-bottom: 18px;
    border-radius: 4px;
  }

  .round {
    border-radius: 50% !important;
  }

  .card-title {
    font-size: 2rem;
    font-weight: 900;
    line-height: 1.15;

    &:hover {
      text-decoration: underline;
    }
  }

  .info {
    margin-top: 6px;
    display: flex;
    font-size: 0.85rem;

    .type {
      font-weight: 500;
      color: var(--text-soft);
    }

    .name {
      .dot {
        margin: 0 4px;
        display: inline;
      }
    }
  }

  .playingState {
    position: absolute;
    right: 24px;
    bottom: 24px;
    transform: translateY(8px);
    opacity: 0;
  }

  &:hover {
    background-color: #282828;

    .playingState {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>