<script setup lang="ts">
import type { Image, Playlist } from '@spotify/web-api-ts-sdk'
import { useI18n } from 'vue-i18n'
import EntityInfoHeader from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeader.vue'
import EntityInfoHeaderDot from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue'
import EntityInfoHeaderTitle from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderTitle.vue'
import LazyImage from '@/shared/UI/Elements/LazyImage.vue'
import readableNumber from '@/shared/utils/format/readableNumber'

defineProps<{
  images: Image[]
  mask: string | null
  playlistName: string
  playlistDescription?: string
  creator: Playlist['owner']
  creatorImage: string | null
  creatorMask: string | null
  tracksAmount: number
  savingsAmount: number
}>()

const { t } = useI18n()
</script>

<template>
  <EntityInfoHeader class="playlist_about" :images="images" :mask="mask" type="playlist">
    <span class="type">{{ t('entities.playlist') }}</span>

    <EntityInfoHeaderTitle>
      {{ playlistName }}
    </EntityInfoHeaderTitle>

    <div v-if="playlistDescription" class="description">
      {{ playlistDescription }}
    </div>

    <div class="other-info">
      <div class="creator">
        <RouterLink
          :to="`/${creator.type}/${creator.id}`"
          class="link"
          draggable="false"
        >
          <LazyImage
            v-if="creatorImage"
            :image="creatorImage"
            class="avatar"
          />

          <span>
            {{ creator.display_name }}
          </span>
        </RouterLink>
      </div>

      <template v-if="savingsAmount">
        <EntityInfoHeaderDot />

        <div class="savings">
          {{ readableNumber(savingsAmount) }} {{ t('playlist.savings', savingsAmount) }}
        </div>
      </template>

      <EntityInfoHeaderDot />

      <div class="quantity">
        {{ t('plurable-entities.track', tracksAmount).toLowerCase() }}
      </div>
    </div>
  </EntityInfoHeader>
</template>

<style scoped lang="scss">
.playlist_about {
  user-select: none;

  .description {
    color: var(--text-soft);
    font-size: .875rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .type {
    font-size: .875rem;
    font-weight: 500;
  }

  .artists, .savings {
    color: var(--text-soft);
    font-size: .875em;
    font-weight: 500;
    line-height: normal;
    overflow: hidden;
    word-break: break-word;
    white-space: nowrap;
  }

  .other-info {
    display: flex;
    align-items: center;
    white-space: nowrap;

    .link {
      display: flex;
      align-items: center;
      gap: 4px;
      user-select: none;

      &:hover {

        span {
          text-decoration: underline 1px;
        }
      }

      .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }

      span {
        font-weight: 700;
        font-size: .875rem;
        color: var(--white);
        line-height: 1;
      }
    }

    span, .quantity {
      color: var(--text-soft);
      font-size: .875em;
      font-weight: 500;
    }

    & > span {
      margin: 0 4px;
    }
  }
}
</style>
