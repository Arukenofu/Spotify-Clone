<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import ClockIcon from '@/UI/Icons/Shared/ClockIcon.vue';
import type { Ref } from 'vue';
import MusicTableRow from '@/UI/Elements/MusicTableRow.vue';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';

const stickyTableHead = useTemplateRef<HTMLElement>('stickyTableHead');
const layoutContent = inject<Ref<HTMLElement & {content: HTMLElement}>>('layoutContent');

const isSticky = ref<boolean>(false);
const layoutWidth = ref<number>(0);

function setIsSticky() {
  isSticky.value = !!(stickyTableHead.value && stickyTableHead.value.getBoundingClientRect().top <= 128);
}

const widthObserver = new ResizeObserver(([entry]) => {
  layoutWidth.value = entry.contentRect.width;
});

onMounted(() => {
  layoutContent!.value.content.addEventListener('scroll', setIsSticky);
  widthObserver.observe(layoutContent!.value.content);
});

onUnmounted(() => {
  layoutContent!.value.content.removeEventListener('scroll', setIsSticky);
  widthObserver.unobserve(layoutContent!.value.content);
});

const computeTableLines = computed(() => {
  const isDate = layoutWidth.value > 750;
  const isAlbum = layoutWidth.value > 550;

  return {
    isDate,
    isAlbum
  }
});

const computeGridLines = computed(() => {
  if (!computeTableLines.value.isAlbum) {
    return `grid-template-columns:
      [index] 16px
      [name] minmax(120px, 4fr)
      [time] minmax(120px, 1fr);`
  }

  if (!computeTableLines.value.isDate) {
    return `grid-template-columns:
      [index] 16px
      [name] minmax(120px, 4fr)
      [var2] minmax(120px, 2fr)
      [time] minmax(120px, 1fr);`
  }

  return `grid-template-columns:
      [index] 16px
      [name] minmax(120px, 6fr)
      [var2] minmax(120px, 4fr)
      [var3] minmax(120px, 3fr)
      [time] minmax(120px, 1fr);`
});

defineProps<{
  format: 'Компактный'| 'Список';
}>();

const currentMusicStore = useCurrentMusicStore();

</script>

<template>
  <div class="playlist_table">
    <div
      ref="stickyTableHead"
      :class="isSticky && 'stuck'"
      :style="computeGridLines"
      class="playlist_table_head"
    >
      <div class="index">#</div>
      <div class="name">Название</div>
      <div v-if="false" class="var1">Исполнитель</div>
      <div v-if="computeTableLines.isAlbum" class="var2">{{format === 'Список' ? 'Альбом' : 'Исполнитель'}}</div>
      <div v-if="computeTableLines.isDate" class="var3">Дата добавления</div>
      <div class="time">
        <div v-tooltip:center_top="'Длительность'">
          <ClockIcon class="icon" />
        </div>
      </div>
    </div>

    <div class="playlistTableBody">
      <MusicTableRow
        v-for="(a, index) in 12"
        :id="1"
        :key="a"
        :index="index + 1"
        :format="format"
        :name="'Название'"
        :artists="[{id: 1, name: 'Артист', url: '/artist'}]"
        :album="{id: 1, name: 'Альбом', to: '/playlist/'}"
        :duration="292"
        :uploaded-date="'12 часов назад'"
        :url="'/'"
        :is-added="false"
        :is-current="currentMusicStore.currentAudioId === a"
        v-bind="computeTableLines"
        :style="computeGridLines"
        class="row"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.playlist_table {
  width: 100%;
  height: 100%;
  position: relative;

  .playlist_table_head {
    position: sticky;
    width: 100%;
    top: 64px;
    height: 36px;
    padding: 0 calc(var(--content-spacing) + 16px);
    display: grid;
    grid-gap: 16px;
    grid-template-rows: auto;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1 !important;

    & > div {
      height: 100%;
      display: flex;
      align-items: center;
      color: var(--text-soft);
      font-size: 0.875rem;

      &:first-child {
        justify-self: end;
        font-size: 1rem;
        font-weight: 600;
      }

      & > div {
        margin-left: auto;
        margin-right: 32px;

        .icon {
          width: 16px;
          height: 16px;
          fill: var(--text-soft);
        }
      }
    }

    $classes: (
      'index' : 'index',
      'name' : 'name',
      'var1' : 'var1',
      'var2' : 'var2',
      'var3' : 'var3',
      'time' : 'time'
    );

    @each $class, $line in $classes {
      .#{$class} {
        grid-column: #{$line};
      }
    }
  }

  .playlistTableBody {
    margin-top: var(--content-spacing);
    padding: 0 calc(var(--content-spacing) + 16px);

    .row {
      margin: 0 calc(var(--content-spacing) * -1);
      padding: 0 var(--content-spacing);
    }
  }

  .stuck {
    background-color: var(--ui-highlight);
  }
}
</style>