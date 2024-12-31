<script setup lang="ts">
import type {MediaLibEntityProps} from "@/features/MedialibSidebar/types/MediaLibEntityProps";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const props = defineProps<MediaLibEntityProps>();
</script>

<template>
  <span>
    <template v-if="props.type === 'Playlist' || props.type === 'Album'">
      {{ t(`entities.${props.type.toLowerCase()}`) }} • {{ props.owner!.name }}
    </template>
    <template v-else-if="props.type === 'Artist'">
      {{t('entities.artist')}}
    </template>
    <template v-else-if="props.type === 'Collection'">
      {{t('entities.playlist')}} • {{ t('plurable-entities.track', props.itemsCount!).toLowerCase() }}
    </template>
    <template v-else-if="props.type === 'Folder'">
      {{ t('plurable-entities.playlist', 1) }}
    </template>
  </span>
</template>

<style scoped lang="scss">

</style>