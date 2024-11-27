<script setup lang="ts">
import {ConfirmationModal, Modal} from "@/features/Modal";
import {ref} from "vue";
import type {MedialibEntities} from "@/services/api/medialib/types/MediaLibTypes";
import localizeEntities from "@/services/utils/localizeEntities";

const model = ref(true);

defineEmits<{
  close: [];
  confirm: [];
}>();

defineProps<{
  type: MedialibEntities,
}>();
</script>

<template>
  <Modal v-model="model" @close="$emit('close')">
    <ConfirmationModal
      @on-confirm="$emit('confirm')"
      @on-cancel="$emit('close')"
    >
      <template #title>
        <template v-if="type === 'Folder'">
          Удалить эту папку вместе со всеми плейлистами?
        </template>
        <template v-else>
          Удалить из медиатеки?
        </template>
      </template>

      <template v-if="type !== 'Folder'" #body>
        Мы удалим
        {{type === 'Collection' ? 'плейлист' : localizeEntities(type)!.toLowerCase()}}
        <b>из твоей медиатеки</b>, но его все еще можно будет найти в Spotify.
      </template>
    </ConfirmationModal>
  </Modal>
</template>

<style scoped lang="scss">
b {
  color: var(--black);
  font-weight: 700;
}
</style>