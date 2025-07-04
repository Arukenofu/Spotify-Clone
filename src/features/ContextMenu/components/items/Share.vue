<script setup lang="ts">
import type { Entities } from '@/services/types/Entities'
import BasicContextMenuItem from '@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue'
import WithSubtree from '@/features/ContextMenu/components/helpers/WithSubtree.vue'
import CodeBlockIcon from '@/shared/UI/Icons/CodeBlockIcon.vue'
import CopyLinkIcon from '@/shared/UI/Icons/CopyLinkIcon.vue'
import ShareIcon from '@/shared/UI/Icons/ShareIcon.vue'
import TriangleIcon from '@/shared/UI/Icons/TriangleIcon.vue'
import { copyLinkToClipboard } from '@/shared/utils/copyLinkToClipboard'
import ctxT from '../../helpers/ctx-t'

defineProps<{
  entityId: string | number
  type: Entities
}>()

function localize(entity: Entities) {
  return ctxT(`shareEntities.${entity.toLowerCase()}`)
}

function copyLink(id: string | number, entity: Entities) {
  copyLinkToClipboard(`${window.location.host}/${entity.toLowerCase()}/${id}`)
}
</script>

<template>
  <WithSubtree>
    <BasicContextMenuItem>
      {{ ctxT('share') }}
      <template #icon>
        <ShareIcon />
      </template>
      <template #additionalIcon>
        <TriangleIcon />
      </template>
    </BasicContextMenuItem>

    <template v-if="type !== 'User'" #context>
      <BasicContextMenuItem @click="copyLink(entityId, type)">
        {{ ctxT('shareCopyMessage', localize(type)) }}
        <template #icon>
          <CopyLinkIcon />
        </template>
      </BasicContextMenuItem>

      <BasicContextMenuItem>
        {{ ctxT('shareWidget') }}
        <template #icon>
          <CodeBlockIcon />
        </template>
      </BasicContextMenuItem>
    </template>
  </WithSubtree>
</template>

<style scoped lang="scss">

</style>
