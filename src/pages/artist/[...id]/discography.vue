<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, inject, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { usePlaybackStates } from '@/features/MediaPlayer'
import artistService from '@/services/api/artist/apiArtistService'
import useCachedRef from '@/shared/composables/useCachedRef'
import EntityInfoHeaderDot from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue'
import LazyImage from '@/shared/UI/Elements/LazyImage.vue'
import MusicCard from '@/shared/UI/Elements/MusicCard.vue'
import GridIcon from '@/shared/UI/Icons/GridIcon.vue'
import ListIcon from '@/shared/UI/Icons/ListIcon.vue'
import PlayingState from '@/shared/UI/Icons/PlayingState.vue'
import RoundPlusIcon from '@/shared/UI/Icons/RoundPlusIcon.vue'
import ThreeDots from '@/shared/UI/Icons/ThreeDots.vue'
import setTitle from '@/shared/utils/setTitle'

const { t } = useI18n()

const route = useRoute('/artist/[...id]/discography')
const layoutScrollY = inject('layoutScrollY', ref(0))

const { data: artistInfo, isFetched } = useQuery({
  queryKey: ['artistFullInfo', route.params.id],
  queryFn: async () => {
    const data = await artistService.getFullArtistInfoWithDiscography(Number(route.params.id))

    setTitle(t('route-titles.discography', [data.profile.artistName]))

    return data
  },
})

// TODO: add localization for current route

const states = reactive(usePlaybackStates())

const layoutHeadingStyle = computed(() => {
  if (layoutScrollY.value > 1) {
    return 'box-shadow: 0 6px 10px rgba(0,0,0,.6);'
  }

  return ''
})

const format = useCachedRef<'Список' | 'Сетка'>('discographyFormat', 'Список', {
  expectedValues: ['Список', 'Сетка'],
})
</script>

<template>
  <div v-if="isFetched && artistInfo" class="recommended-cards">
    <div class="heading" :style="layoutHeadingStyle">
      <RouterLink :to="`/artist/${artistInfo.id}`" draggable="false">
        {{ artistInfo.profile.artistName }}
      </RouterLink>

      <div class="formats">
        <button :class="format === 'Список' && 'active'" @click="format = 'Список'">
          <ListIcon class="icon" />
        </button>
        <button :class="format === 'Сетка' && 'active'" @click="format = 'Сетка'">
          <GridIcon class="icon" />
        </button>
      </div>
    </div>

    <div class="albums" :class="format === 'Сетка' && 'grid'">
      <template v-if="format === 'Список'">
        <div v-for="album in artistInfo.discography.albums" :key="album.id" class="album">
          <LazyImage class="image" :image="album.image" :color="album.color" />
          <div class="added-at">
            <RouterLink :to="`/album/${album.id}`" class="title">
              {{ album.name }}
            </RouterLink>
            <div class="additional">
              <span class="type">Альбом</span>
              <span class="dot">•</span>
              <span v-tooltip="'27 Декабря 2024'" class="year">
                2024
              </span>
              <EntityInfoHeaderDot />
              <span class="amount">
                {{ t('plurable-entities.track', album.info.tracksAmount).toLowerCase() }}
              </span>
            </div>

            <div class="controls">
              <button
                v-tooltip="states.isCurrentPlayback('album', '') ? t('music-actions.pauseMusic') : t('music-actions.playMusic')"
                class="playingState"
                @click="states.isCurrentPlayback('album', '')"
              >
                <PlayingState
                  class="icon"
                  :state="states.isCurrentPlayback('album', '')"
                />
              </button>
              <button v-tooltip="'Добавить в медиатеку'" class="addingState">
                <RoundPlusIcon class="icon" />
              </button>
              <button v-tooltip="`Открыть контекстное меню ${album.name}`" class="options">
                <ThreeDots class="icon" />
              </button>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <MusicCard
          v-for="album in artistInfo.discography.albums"
          :id="album.id"
          :key="album.id"
          :image="album.image"
          type="album"
          :name="album.name"
          :color="album.color"
          :state="isThisPlaylist(album.id, true)"
          @on-play-click="loadPlaylist(album.id)"
        >
          {{ album.info.uploadedDate }}
        </MusicCard>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.recommended-cards {
  height: auto;
  margin-bottom: 21px;

  .heading {
    top: 0;
    position: sticky;
    height: 104px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 0 var(--content-spacing) 12px;
    background-color: var(--ui);
    z-index: 2 !important;

    a {
      font-size: 1.5rem;
      font-weight: 700;
      text-wrap: balance;
      user-select: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .formats {
      display: flex;
      align-items: center;
      gap: 12px;

      button {
        display: grid;
        place-items: center;
        border: none;
        background-color: transparent;
        color: hsla(0,0%,100%,.7);
        padding: 8px;
        cursor: pointer;

        .icon {
          fill: currentColor;
          height: 16px;
          width: 16px;
        }
      }

      .active, button:hover {
        background-color: hsla(0,0%,100%,.1);
        border-radius: 50%;
        color: var(--white);
      }
    }
  }

  .albums {
    margin-inline: 12px;

    .album {
      padding: 32px;
      display: flex;

      .image {
        height: 136px;
        width: 136px;
        flex-shrink: 0;
        border-radius: 4px;
        box-shadow: 0 4px 60px rgba(0,0,0,.5);
      }

      .added-at {
        display: flex;
        flex-direction: column;
        margin-left: 24px;

        .title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 700;
          font-size: 2rem;
          text-wrap: balance;
          margin-bottom: 8px;

          &:hover {
            text-decoration: underline;
          }
        }

        .additional {
          font-size: .875rem;
          font-weight: 400;

          span {
            color: var(--text-soft);
          }
        }

        .controls {
          margin-top: auto;
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: start;
          height: 48px;

          .playingState {
            height: 32px;
            width: 32px;
            border: none;
            border-radius: 50%;
            display: grid;
            place-items: center;
            background-color: var(--white);
            cursor: pointer;

            &:hover {
              transform-origin: center;
              transform: scale(1.04);
            }

            .icon {
              width: 20px;
              height: 20px;
            }
          }

          .addingState, .options {
            height: 24px;
            width: 24px;
            border: none;
            background: none;
            cursor: pointer;

            &:hover {
              scale: 1.04;

              .icon {
                fill: var(--white);
              }
            }

            .icon {
              fill: var(--text-soft);
            }
          }
        }
      }
    }
  }

  .grid {
    display: grid;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    padding: 0 var(--content-spacing);
  }
}
</style>
