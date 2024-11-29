<script setup lang="ts">
import EntityInfoHeader from "@/UI/Elements/EntityInfoHeader.vue";
import LikedSongsImage from '@/assets/images/liked-songs.png';
import getDeclention from "../shared/utils/getDeclention";
import GeneralGradientSectionWithControls from "@/UI/Blocks/GeneralGradientSectionWithControls.vue";
import useCachedRef from "@/shared/composables/useCachedRef";
import FormatLibraryButton from "@/UI/Buttons/FormatLibraryButton.vue";
import {useQuery} from "@tanstack/vue-query";
import apiUserService from "@/services/api/user/apiUserService";
import Table from "@/pageLayouts/collection/Table.vue";
import HandleEntityLayoutStates from "@/UI/Elements/HandleEntityLayoutStates.vue";

const maskColor = 'rgb(80, 56, 160)';

type Format = 'Компактный' | 'Список';

const format = useCachedRef<Format>('playlistFormat', 'Список', {
  expectedTypes: ['string'],
  expectedValues: ['Компактный', 'Список']
});

const {data, isFetching, isError, suspense} = useQuery({
  queryKey: ['favoriteTracks'],
  queryFn: async () => apiUserService.getFavoriteTracks(),
  suspense: true
});
await suspense();

function setFormat(newValue: Format) {
  format.value = newValue;
}
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="плейлист"
  />

  <EntityInfoHeader
    :image="LikedSongsImage"
    :mask="maskColor"
    type="Playlist"
    class="header"
  >
    <span class="type">Плейлист</span>
    <h1 class="title">Любимые треки</h1>
    <div class="other-info">
      <RouterLink to="/user/1" class="user">
        Бауыржан Алкенов
      </RouterLink>

      <div class="dot">
        •
      </div>

      <span class="tracks-amount">
        {{getDeclention(1, 'трек', 'трека', 'треков')}}
      </span>
    </div>
  </EntityInfoHeader>

  <GeneralGradientSectionWithControls
    :is-playing="false"
    :bg-color="maskColor"
    tooltip-str=""
    turnoff-options
  >
    <template #additional-options>
      <FormatLibraryButton :format @set-format="setFormat" />
    </template>
  </GeneralGradientSectionWithControls>

  <Table :format="format" :queue="data!.playlistQueue" />
</template>

<style scoped lang="scss">
.header {
  margin-top: -64px;
  container: collection-info / inline-size;

  .type {
    font-size: .875rem;
    font-weight: 500;
  }

  .title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left;
    user-select: none;
    font-weight: 800;
    text-wrap: nowrap;
    margin-bottom: 8px;
    line-height: 1.2;
    width: min-content;
    font-size: 6rem;
  }


  @container collection-info (max-width: 1000px) {
    .title {
      font-size: 3.5em !important;
    }
  }

  @container collection-info (max-width: 700px) {
    .title {
      font-size: 2em !important;
    }
  }

  .other-info {
    display: flex;
    align-items: center;
    font-size: .875rem;

    .user {
      font-weight: 700;

      &:hover {
        text-decoration: underline;
      }
    }

    .dot {
      color: var(--text-soft);
      font-weight: 500;
      margin: 0 4px;
    }

    .tracks-amount {
      color: var(--text-soft);
      font-weight: 500;
    }
  }
}

</style>