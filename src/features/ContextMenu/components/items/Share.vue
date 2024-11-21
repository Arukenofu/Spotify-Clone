<script setup lang="ts">
import CopyLinkIcon from "@/UI/Icons/Shared/CopyLinkIcon.vue";
import CodeBlockIcon from "@/UI/Icons/Shared/CodeBlockIcon.vue";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";
import WithSubtree from "@/features/ContextMenu/components/helpers/WithSubtree.vue";
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import ShareIcon from "@/UI/Icons/Shared/ShareIcon.vue";
import {addToast} from "@/widgets/Toast";
import type {Entities} from "@/services/types/Entities";

type Type = Exclude<Entities, 'Track'>

defineProps<{
  entityId: string | number;
  type: Type;
}>();

function localize(entity: Type) {
  if (entity === 'Playlist') {
    return 'плейлист'
  }
  if (entity === 'Artist') {
    return 'исполнителя'
  }
  if (entity === 'Album') {
    return 'альбом'
  }
}

function copyLink(id: string | number, entity: Type) {
  navigator.clipboard
      .writeText(`${window.location.host}/${entity.toLowerCase()}/${id}`)
      .then(() => {
        addToast('Ссылка скопирована в буфер обмена');
      })
      .catch(() => {
        addToast('Не удалось скопировать ссылку');
      });
}
</script>

<template>
  <WithSubtree>
    <BasicContextMenuItem>
      Поделиться
      <template #icon>
        <ShareIcon />
      </template>
      <template #additionalIcon>
        <TriangleIcon />
      </template>
    </BasicContextMenuItem>

    <template v-if="type !== 'User'" #context>
      <BasicContextMenuItem @click="copyLink(entityId, type)">
        Копировать ссылку на {{localize(type)}}
        <template #icon>
          <CopyLinkIcon />
        </template>
      </BasicContextMenuItem>

      <BasicContextMenuItem>
        Копировать код виджета
        <template #icon>
          <CodeBlockIcon />
        </template>
      </BasicContextMenuItem>
    </template>
  </WithSubtree>
</template>

<style scoped lang="scss">

</style>