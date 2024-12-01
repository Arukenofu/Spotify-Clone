<script setup lang="ts">
import routerPushPrevent from '@/shared/utils/routerPushPrevent';
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';
import EntityAvatar1x1 from '@/UI/Elements/EntityAvatar1x1.vue';
import type {Entities} from '@/services/types/Entities';

interface Props {
  id: number | string;
  type: Entities;
  name: string;
  image: string | null;
  color: string | null;
  state?: boolean;
}

defineProps<Props>();

type Emits = {
  onPlayClick: []
}

defineEmits<Emits>();
</script>

<template>
  <div
    class="card"
    @click="routerPushPrevent(`/${type}/${id}`)"
  >
    <EntityAvatar1x1
      class="image"
      :type="type"
      :image="image"
      :style="type === 'Artist' || type === 'User' && 'border-radius: 50%'"
      :loading-color="color"
      loading="lazy"
    >
      <GreenPlayingButton
        v-if="type !== 'User'"
        v-tooltip="`Слушать плейлист «${name}»`"
        class="playingState"
        :state="state ?? false"
        @click.stop="$emit('onPlayClick')"
        @mousedown.prevent
      />
    </EntityAvatar1x1>

    <span v-if="name" class="b-600">
      {{ name }}
    </span>

    <div class="textInfo">
      <slot />
    </div>

    <slot name="underlay" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: inline-flex;
  flex-direction: column;
  row-gap: 6px;
  border-radius: 6px;
  padding-block: 12px;
  padding-inline: 12px;
  cursor: pointer;
  transition: all ease 0.1s;
  user-select: none;
  position: relative;

  &:hover {
    background-color: var(--ui-highlight);

    .image {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    }

    button {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  }

  &:active {
    background-color: var(--black);
  }

  .image {
    width: 100%;
    aspect-ratio: 1/1;
    background-color: #333333;
    display: grid;
    place-items: center;
    border-radius: 6px;
    position: relative;
    margin-bottom: 3px;
    transition: background-color 0.2s ease-out;

    .noImage {
      width: 64px;
      height: 64px;
      fill: var(--white);
    }

    .playingState {
      opacity: 0;
      position: absolute;
      right: 8px;
      bottom: 8px;
      transition: all 0.2s ease-out;
      transform: translateY(8px);
    }
  }

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -moz-box-orient: vertical;
    overflow: hidden;
  }

  .textInfo {
    line-height: 1.1rem;
    max-height: 2.2rem;
    color: var(--text-soft);
    font-size: 0.875rem;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -moz-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
