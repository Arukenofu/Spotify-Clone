<script setup lang="ts">
import EntityInfoHeader from "@/shared/UI/Elements/EntityInfoHeader.vue";
import LikedSongsImage from '@/assets/images/liked-songs.png';
import GeneralGradientSectionWithControls from "@/shared/UI/Blocks/Sugar/GeneralGradientSectionWithControls.vue";
import FormatLibraryButton from "@/shared/UI/Buttons/FormatLibraryButton.vue";
import {useQuery} from "@tanstack/vue-query";
import apiUserService from "@/services/api/user/apiUserService";
import HandleEntityLayoutStates from "@/shared/UI/Elements/HandleEntityLayoutStates.vue";
import PlaylistTable from "@/pageLayouts/playlist.id/PlaylistTable.vue";
import {useMusicCollectionFormat} from "@/features/MusicCollectionFormat";
import EntityInfoHeaderDot from "@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue";
import {useI18n} from "vue-i18n";
import PlayHeaderWithPlayingState from "@/shared/UI/Blocks/Sugar/PlayHeaderWithPlayingState.vue";
import {inject, ref} from "vue";

const {t} = useI18n();
const scrollY = inject('layoutScrollY', ref(0));

const maskColor = 'rgb(80, 56, 160)';

const {format, setFormat} = useMusicCollectionFormat();

const {data, isFetching, isError, suspense} = useQuery({
  queryKey: ['favoriteTracks'],
  queryFn: async () => apiUserService.getFavoriteTracks(),
  suspense: true
});
await suspense();
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="Playlist"
  />

  <div class="collection">
    <PlayHeaderWithPlayingState
      title="Любимые треки"
      :scroll-y="scrollY"
      :is-playing="false"
      :mask="maskColor"
    />

    <EntityInfoHeader
      :image="LikedSongsImage"
      :mask="maskColor"
      type="Playlist"
      class="header"
    >
      <span class="type">{{t('entities.playlist')}}</span>
      <h1 class="title">Любимые треки</h1>
      <div class="other-info">
        <RouterLink to="/user/1" class="user">
          Бауыржан Алкенов
        </RouterLink>

        <EntityInfoHeaderDot />

        <span class="tracks-amount">
          {{t('plurable-entities.track', data?.playlistQueue.length!).toLowerCase()}}
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

    <PlaylistTable
      :queue="data!.playlistQueue"
      :dossier="data!.playlistInfoDossier"
      hide-main-options
    />
  </div>
</template>

<style scoped lang="scss">
.header {
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