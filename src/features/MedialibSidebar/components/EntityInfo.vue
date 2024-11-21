<script setup lang="ts">
import localizeEntities from "@/services/utils/localizeEntities";
import getDeclention from "@/shared/utils/getDeclention";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar/types/MediaLibEntityProps";

const props = defineProps<MediaLibEntityProps>();
</script>

<template>
  <span>
    <template v-if="props.type === 'Playlist' || props.type === 'Album'">
      {{ localizeEntities(props.type) }} • {{ props.owner!.name }}
    </template>
    <template v-if="props.type === 'Artist'">
      Исполнитель
    </template>
    <template v-if="props.type === 'Collection'">
      Плейлист • {{ getDeclention(props.itemsCount!, 'трек', 'трека', 'треков') }}
    </template>
    <template v-if="props.type === 'Folder'">
      {{ getDeclention(props.itemsCount!, 'плейлист', 'плейлиста', 'плейлистов') }}
    </template>
  </span>
</template>

<style scoped lang="scss">

</style>