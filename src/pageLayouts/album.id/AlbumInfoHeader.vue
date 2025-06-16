<script setup lang="ts">
import type { Album, Image } from '@spotify/web-api-ts-sdk'
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import getUserLanguage from '@/app/lib/i18n/utils/getUserLanguage'
import AlbumInfoHeaderArtist from '@/pageLayouts/album.id/AlbumInfoHeaderArtist.vue'
import EntityInfoHeader from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeader.vue'
import EntityInfoHeaderDot from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue'
import EntityInfoHeaderTitle from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderTitle.vue'

defineProps<{
  images: Image[]
  mask: string | null
  name: string
  creator: Album['artists']
  tracksAmount: number
  releaseDate: string
}>()

const { t } = useI18n()

function getYear(dateString: string) {
  return dateString.split('-')[0]
}

function formatDate(dateString: string) {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleDateString(getUserLanguage(), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <EntityInfoHeader class="info" :images="images" :mask="mask" type="album">
    <div class="type">
      {{ t('entities.album') }}
    </div>
    <EntityInfoHeaderTitle>{{ name }}</EntityInfoHeaderTitle>

    <div class="additional">
      <AlbumInfoHeaderArtist :creator="creator" />

      <EntityInfoHeaderDot />

      <Tippy :content="formatDate(releaseDate)" class="releaseDate">
        {{ getYear(releaseDate) }}
      </Tippy>

      <EntityInfoHeaderDot />

      <span>{{ t('plurable-entities.track', tracksAmount).toLowerCase() }}</span>
    </div>
  </EntityInfoHeader>
</template>

<style scoped lang="scss">
.info {
  margin-top: -64px;
  user-select: none;

  &:deep(.img) {
    border-radius: 4px !important;
  }

  .type {
    font-weight: 500;
    font-size: .875rem;
  }

  .additional {
    display: flex;
    align-items: center;
    font-size: .875rem;
    font-weight: 500;

    & > span {
      color: var(--text-soft);
    }

    .dot {
      margin: 0 4px;
      color: var(--text-soft);
      font-weight: 500;
    }

    span {
      font-weight: 500;
    }
  }
}
</style>
