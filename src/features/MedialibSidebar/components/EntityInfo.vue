<script setup lang="ts">
import localizeEntities from "@/services/utils/localizeEntities";
import getDeclention from "@/shared/utils/getDeclention";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar/types/MediaLibEntityProps";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const props = defineProps<MediaLibEntityProps>();
</script>

<template>
  <span>
    <template v-if="props.type === 'Playlist' || props.type === 'Album'">
      {{ localizeEntities(props.type) }} • {{ props.owner!.name }}
    </template>
    <template v-else-if="props.type === 'Artist'">
      {{t('entities.artist')}}
    </template>
    <template v-else-if="props.type === 'Collection'">
      {{t('entities.playlist')}} • {{ getDeclention(props.itemsCount!, 'трек', 'трека', 'треков') }}
    </template>
    <template v-else-if="props.type === 'Folder'">
      {{ getDeclention(props.itemsCount!, 'плейлист', 'плейлиста', 'плейлистов') }}
    </template>
  </span>
</template>

<style scoped lang="scss">

</style>