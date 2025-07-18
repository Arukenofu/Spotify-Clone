<script setup lang="ts">
import type { Artist } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/vue-query'
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { getMaskColor } from '@/features/AccentColors'
import { setCurrentPlayback, useAudioStream, usePlaybackStates } from '@/features/MediaPlayer'
import { sdk } from '@/services/sdk'
import AddToMediaLib from '@/shared/UI/Buttons/AddToMediaLib.vue'
import EntityAvatar1x1 from '@/shared/UI/Elements/EntityAvatar1x1.vue'
import EntityInfoHeader from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeader.vue'
import EntityInfoHeaderDot from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue'
import HandleEntityLayoutStates from '@/shared/UI/Elements/HandleEntityLayoutStates.vue'
import ArtistFullWidthBlock from '@/shared/UI/EntityPageElements/ArtistFullWidthBlock.vue'
import GeneralGradientSectionWithControls
  from '@/shared/UI/EntityPageElements/Sugar/GeneralGradientSectionWithControls.vue'
import PlayHeaderWithPlayingState from '@/shared/UI/EntityPageElements/Sugar/PlayHeaderWithPlayingState.vue'
import getCommaSeparatedString from '@/shared/utils/format/getCommaSeparatedString'
import getImageFromEntity from '@/shared/utils/image/getImageFromEntity'
import setTitle from '@/shared/utils/setTitle'
import formatTimeMMSS from '../../shared/utils/format/formatTimeMMSS'

const { t } = useI18n()

const route = useRoute('/track/[id]')

const trackId = computed(() => {
  return route.params.id
})

const stream = reactive(useAudioStream())

async function fetchTrackData() {
  const data = await sdk.tracks.get(trackId.value)

  const str = getCommaSeparatedString(data.artists, 'id')
    .replace(/\s+/g, '')
    .replace(/\s+/g, '%20')
  const artists = await sdk.makeRequest<{ artists: Artist[] }>('GET', `artists?ids=${str}`)

  return {
    ...data,
    artists: artists.artists,
  }
}

const { data: trackInfo, isFetching, isError } = useQuery({
  queryKey: ['track', trackId],
  queryFn: async () => {
    const data = await fetchTrackData()
    const maskColor = await getMaskColor(data.album)

    setTitle(`${data.name} - song by ${getCommaSeparatedString(data.artists, 'name')} | Spotify`)

    return { ...data, maskColor }
  },
})

const { isCurrentTrack } = usePlaybackStates()
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isFetching"
    :is-error="isError"
    entity="track"
  >
    <div v-if="trackInfo" class="recommended-cards">
      <PlayHeaderWithPlayingState
        :title="trackInfo.name"
        :mask="trackInfo.maskColor"
        :is-playing="stream.isPlaying && isCurrentTrack(trackInfo.id)"
        @play-click="setCurrentPlayback('album', trackInfo.album.id, trackInfo.id)"
      />
      <EntityInfoHeader
        :images="trackInfo.album.images"
        :mask="trackInfo.maskColor"
        type="track"
        class="info"
      >
        <span class="type">{{ t('entities.track') }}</span>
        <h1 class="name">
          {{ trackInfo.name }}
        </h1>
        <div class="additional">
          <div v-if="trackInfo.artists.length === 1" class="single-artist">
            <EntityAvatar1x1 :image="getImageFromEntity(trackInfo.artists[0].images, 2)" class="img" type="artist" />
            <RouterLink :to="`/artist/${trackInfo.artists[0].id}`" class="artist-name">
              {{ trackInfo.artists[0].name }}
            </RouterLink>
          </div>
          <div v-else class="artists">
            <template
              v-for="(artist, index) in trackInfo.artists"
              :key="artist.id"
            >
              <RouterLink
                :to="`/artist/${artist.id}`"
                class="artist"
              >
                {{ artist.name }}
              </RouterLink>

              <template v-if="index !== trackInfo.artists.length - 1">
                &nbsp;•&nbsp;
              </template>
            </template>
          </div>

          <EntityInfoHeaderDot />

          <RouterLink class="album-link" :to="`/album/${trackInfo.album.id}`">
            {{ trackInfo.album.name }}
          </RouterLink>

          <EntityInfoHeaderDot />

          <span>{{ formatTimeMMSS(trackInfo.duration_ms / 1000) }}</span>
        </div>
      </EntityInfoHeader>

      <GeneralGradientSectionWithControls
        :is-playing="stream.isPlaying && isCurrentTrack(trackInfo.id)"
        :bg-color="trackInfo.maskColor"
        :tooltip-str="t('music-actions.moreOptionsFor', [trackInfo.name])"
        @play-click="setCurrentPlayback('album', trackInfo.album.id, trackInfo.id)"
      >
        <template #main-options>
          <AddToMediaLib
            class="add"
            :state="false"
          />
        </template>
      </GeneralGradientSectionWithControls>

      <div class="artists-container">
        <ArtistFullWidthBlock
          v-for="artist in trackInfo.artists"
          :id="artist.id"
          :key="artist.id"
          :image="getImageFromEntity(artist.images, 2)"
          :name="artist.name"
        />
      </div>
    </div>
  </HandleEntityLayoutStates>
</template>

<style scoped lang="scss">
.recommended-cards {

  .info {
    container: trackInfo / inline-size;

    .type {
      font-weight: 500;
      font-size: .875rem;
      user-select: none;
    }

    @container trackInfo (max-width: 1000px) {
      .name {
        font-size: 3.5em !important;
      }
    }

    @container trackInfo (max-width: 700px) {
      .name {
        font-size: 2em !important;
      }
    }

    .name {
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
      font-size: 6rem;
    }

    .additional {
      display: flex;
      align-items: center;
      font-size: .875rem;
      font-weight: 400;

      & > span {
        font-weight: inherit;
        color: var(--text-soft);
      }

      .album-link {
        font-weight: inherit;
      }

      .dot {
        margin: 0 4px;
        color: var(--text-soft);
      }

      .single-artist {
        display: inline-flex;
        align-items: center;
        gap: 3px;

        .img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .artist-name {
          color: var(--white);
          font-weight: 700;
          line-height: 1.375;

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

  .add {
    height: 32px;
    width: 32px;
    margin-right: var(--content-spacing);
  }

  .artists-container, .section {
    padding: 0 var(--content-spacing);
    margin-bottom: 40px;
  }

  .section {
    .wrapper {
      container: wrapper / inline-size;

      @container wrapper (max-width: 620px) {
        .row {
          grid-template-columns: [index] 16px [main] minmax(120px, 4fr) [var1] 0 [var2] 0 [time] minmax(120px, 1fr) !important;
        }

        .var1 {
          display: none;
        }
      }

      .row {
        grid-template-columns: [index] 16px [main] minmax(120px, 4fr) [var1] minmax(120px, 2fr) [var2] 0 [time] minmax(120px, 1fr);
      }

      .var1 {
        font-size: .875rem;
      }
    }
  }
}
</style>
