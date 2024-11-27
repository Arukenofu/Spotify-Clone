<script setup lang="ts">
import TrackBlock from "@/UI/Elements/Track/TrackBlock.vue";
import useInfoContentStore from "@/features/InfoPanel/store/useInfoContentStore";
import type {Track} from "@/services/types/Entities/Track";

const {setNewPanel} = useInfoContentStore();

defineProps<{
  nextSong: Track
}>();
</script>

<template>
  <div class="next-in-queue">
    <div class="title">
      <div class="text">Далее в очереди</div>
      <button class="show-queue" @click="setNewPanel('CurrentPlaylistQueue')">
        Показать очередь
      </button>
    </div>
    <div class="next-track">
      <TrackBlock
        :music="nextSong"
        :state="false"
        class="track"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.next-in-queue {
  padding: 16px;
  border-radius: 8px;
  background-color: var(--ui-highlight);

  .title {
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 9px;

    .text {
      font-weight: 700;
    }

    .show-queue {
      color: var(--text-soft);
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 700;

      &:hover {
        scale: 1.04;
        color: var(--white);
        text-decoration: underline;
      }
    }
  }

  .track {

    &:hover {
      background-color: hsla(0, 0, 100%, .14) !important;
    }
  }
}
</style>