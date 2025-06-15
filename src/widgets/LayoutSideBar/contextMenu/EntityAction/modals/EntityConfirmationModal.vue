<script setup lang="ts">
import type { Entities } from '@/services/types/Entities'
import type { EntityActionContextMenuProps } from '@/widgets/LayoutSideBar/types/EntityActionContextMenuProps'
import { ref } from 'vue'
import { ConfirmationModal, Modal } from '@/features/Modal'
import localizeEntities from '@/services/utils/localizeEntities'

defineProps<EntityActionContextMenuProps>()

defineEmits<{
  close: []
  confirm: []
}>()

const model = ref(true)
</script>

<template>
  <Modal v-model="model" disable-teleport @close="$emit('close')">
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

      <template v-if="type === 'Playlist'" #body>
        Контент (<b>{{ name }}</b>) будет удалён из твоей медиатеки
      </template>

      <template v-else-if="type === 'Folder'" #body />

      <template v-else #body>
        Мы удалим
        {{ type === 'Collection' ? 'плейлист' : localizeEntities(type as Entities)!.toLowerCase() }}
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
