<script setup lang="ts">
import {computed, ref} from "vue";
import {useRoute} from 'vue-router';
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import PlayHeaderWithPlayingState from "@/shared/UI/EntityPageElements/Sugar/PlayHeaderWithPlayingState.vue";
import ArtistInfoHeaderNoCover from "@/pageLayouts/artist.id/ArtistInfoHeaderNoCover.vue";
import GeneralGradientSectionWithControls
  from "@/shared/UI/EntityPageElements/Sugar/GeneralGradientSectionWithControls.vue";
import MusicRow from "@/shared/UI/Elements/Track/TrackRow.vue";
import setTitle from '@/shared/utils/setTitle';
import TracksSection from "@/shared/UI/Blocks/TracksSection.vue";
import HandleEntityLayoutStates from "@/shared/UI/Elements/HandleEntityLayoutStates.vue";
import SubscribeButton from "@/shared/UI/Buttons/SubscribeButton.vue";
import {useI18n} from "vue-i18n";
import {sdk} from "@/services/sdk";
import {getMaskColor} from "@/shared/utils/colors/getMaskColor";
import getCountryCodeA2 from "@/app/lib/i18n/utils/getCountryCodeA2";
import type {FollowedArtists, SimplifiedAlbum} from "@spotify/web-api-ts-sdk";

const {t} = useI18n();

const route = useRoute('/artist/[id]');
const queryClient = useQueryClient();

const {data: artistInfo, isFetching, isError} = useQuery({
  queryKey: ['artist', route.params.id],
  queryFn: async () => {
    const data = await sdk.artists.get(route.params.id);
    if (!data) throw new Error("Error fetching artist");

    const maskColor = await getMaskColor(data);
    const isSubscribed = await sdk.currentUser.followsArtistsOrUsers([route.params.id], 'artist');
    // @ts-ignore
    const topItems = await sdk.artists.topTracks(route.params.id, getCountryCodeA2());
    const discography = await sdk.artists.albums(route.params.id);

    setTitle(`${data.name} | Spotify`);
    
    return {
      ...data,
      topItems,
      discography,
      maskColor,
      isSubscribed: isSubscribed.length ? isSubscribed[0] : false
    };
  },
  staleTime: Infinity
});

const {mutate: toggleSubscription} = useMutation({
  mutationFn: async () => {
    if (!artistInfo.value) return;

    const action = artistInfo.value.isSubscribed ? 'unfollowArtistsOrUsers' : 'followArtistsOrUsers';

    await sdk.currentUser[action]([route.params.id], 'artist').catch(() => {
      throw new Error("Error toggling artist subscription");
    });

    const isSubscribed = !artistInfo.value.isSubscribed

    queryClient.setQueryData(['artist', route.params.id], () => ({
      ...artistInfo.value,
      isSubscribed: isSubscribed
    }));

    queryClient.setQueryData(['currentUserFollowedArtists'], (oldData: FollowedArtists) => {
      const { artists } = oldData;
      const updatedItems = artists.items.some(item => item.id === route.params.id)
          ? artists.items.filter(item => item.id !== route.params.id)
          : [...artists.items, { ...artistInfo.value }];

      return {
        ...oldData,
        artists: {
          ...artists,
          items: updatedItems
        }
      };
    });
  }
});

const isTopTracksExpanded = ref(false);

const isTopTracksHaveEnoughItems = computed(() => {
  if (!artistInfo.value) return false;

  return artistInfo.value.topItems.tracks.length > 5;
});

const topTracks = computed(() => {
  if (!artistInfo.value) return [];

  if (isTopTracksExpanded.value) {
    return artistInfo.value.topItems.tracks;
  } else {
    return artistInfo.value.topItems.tracks.slice(0, 5);
  }
});

const discography = computed(() => {
  if (!artistInfo.value) return null;

  const items = artistInfo.value.discography.items;

  const output: Record<string, SimplifiedAlbum[]> = {};

  for (let i = 0; i < items.length; i++) {
    if (!(items[i].album_type in output)) {
      output[items[i].album_type] = [];
    }

    output[items[i].album_type].push(items[i]);
  }

  return output;
});
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="artist"
  >
    <div v-if="artistInfo" class="recommended-cards">
      <PlayHeaderWithPlayingState
        :title="artistInfo.name"
        :mask="artistInfo.maskColor"
        :is-playing="false"
      />

      <ArtistInfoHeaderNoCover
        :name="artistInfo.name"
        :mask="artistInfo.maskColor"
        :listeners-per-month="artistInfo.followers.total"
        :images="artistInfo.images"
      />

      <GeneralGradientSectionWithControls
        class="controls"
        :is-playing="false"
        :tooltip-str="{
          content: t('music-actions.moreOptionsFor', [artistInfo.name]),
          distance: 24,
          style: {
            fontSize: '.9rem',
            padding: '6px 8px'
          }
        }"
        :bg-color="artistInfo.maskColor"
      >
        <template #main-options>
          <SubscribeButton
            :is-subscribed="artistInfo.isSubscribed"
            class="subscribe"
            @click="toggleSubscription()"
          />
        </template>
      </GeneralGradientSectionWithControls>

      <TracksSection
        v-model:is-expanded="isTopTracksExpanded"
        class="popular-tracks"
        :naming="t('artist.topTracks')"
        :show-expanded="isTopTracksHaveEnoughItems"
      >
        <div class="popular-tracks-wrapper">
          <MusicRow
            v-for="(track, index) of topTracks"
            :key="track.id"
            :index="index + 1"
            :track="track"
            :is-current="false"
            :is-playing="false"
            :is-added="false"
            :show-artists="false"
            class="row"
          />
        </div>
      </TracksSection>
    </div>
  </HandleEntityLayoutStates>
</template>

<style lang="scss" scoped>
.recommended-cards {
  height: auto;
  position: relative;
  margin-bottom: 21px;

  .controls {
    padding: 6px 0;

    .subscribe {
      margin-right: var(--content-spacing);
    }
  }

  .popular-tracks {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--content-spacing);
    display: grid;
    grid-template-columns: 1fr;

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      width: 100%;
      margin-bottom: 16px;
    }

    .popular-tracks-wrapper {
      container: wrapper / inline-size;

      .row {
        grid-template-columns:
            [index] 16px
            [main] minmax(120px, 4fr)
            [var1] 0
            [var2] 0
            [time] minmax(120px, 1fr);
      }
    }
  }

  .albums, .recommended {
    padding: 0 var(--content-spacing);
  }

  .about-artist {
    margin-top: 21px;
    padding: 0 var(--content-spacing);
    width: 100%;
    max-width: 880px;

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .card { 
      background-color: #282828;
      padding: 40px;
      border-radius: 8px;
      transition: scale .25s linear;

      &:hover {
        scale: 1.01;
      }

      .image {
        width: 204px;
        height: 204px;
        border-radius: 50%;
        margin-bottom: 24px;
      }

      .listeners {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 8px;
        display: block;
      }

      .description {
        max-width: 673px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-top: 8px;
        overflow: hidden;
        font-weight: 400;
        line-height: 1.5;
      }
    } 
  } 
}

</style>
