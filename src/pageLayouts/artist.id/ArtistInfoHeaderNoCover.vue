<script setup lang="ts">
import type { HeaderProps } from '@/pageLayouts/artist.id/props/HeaderProps'
import { useI18n } from 'vue-i18n'
import EntityInfoHeader from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeader.vue'
import EntityInfoHeaderTitle from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderTitle.vue'

defineProps<HeaderProps>()

const { t } = useI18n()
</script>

<template>
  <EntityInfoHeader
    class="info-header"
    :images="images"
    :mask="mask"
    type="artist"
  >
    <EntityInfoHeaderTitle>{{ name }}</EntityInfoHeaderTitle>
    <span class="artist-listeners-quantity">
      {{ t('social.subscribers', listenersPerMonth) }}
    </span>
  </EntityInfoHeader>
</template>

<style scoped lang="scss">
.info-header {
  margin-top: -64px;

  .artist-name {
    font-size: 6rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: normal;
    overflow: hidden;
    text-align: left;
    width: 100%;
    word-break: break-word;
    user-select: none;
  }

  .artist-listeners-quantity {
    font-size: 1rem;
  }
}
</style>
