<script setup lang="ts">
import CopyLinkIcon from "@/UI/Icons/Shared/CopyLinkIcon.vue";
import CodeBlockIcon from "@/UI/Icons/Shared/CodeBlockIcon.vue";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";
import WithSubtree from "@/features/ContextMenu/components/helpers/WithSubtree.vue";
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import ShareIcon from "@/UI/Icons/Shared/ShareIcon.vue";
import type {Entities} from "@/services/types/Entities";
import {copyLinkToClipboard} from "@/shared/utils/copyLinkToClipboard";
import ctxT from "../../helpers/ctx-t";

defineProps<{
  entityId: string | number;
  type: Entities;
}>();

function localize(entity: Entities) {
  return ctxT(`shareEntities.${entity.toLowerCase()}`)
}

function copyLink(id: string | number, entity: Entities) {
  copyLinkToClipboard(`${window.location.host}/${entity.toLowerCase()}/${id}`);
}
</script>

<template>
  <WithSubtree>
    <BasicContextMenuItem>
      {{ctxT('share')}}
      <template #icon>
        <ShareIcon />
      </template>
      <template #additionalIcon>
        <TriangleIcon />
      </template>
    </BasicContextMenuItem>

    <template v-if="type !== 'User'" #context>
      <BasicContextMenuItem @click="copyLink(entityId, type)">
        {{ctxT('shareCopyMessage', localize(type))}}
        <template #icon>
          <CopyLinkIcon />
        </template>
      </BasicContextMenuItem>

      <BasicContextMenuItem>
        {{ctxT('shareWidget')}}
        <template #icon>
          <CodeBlockIcon />
        </template>
      </BasicContextMenuItem>
    </template>
  </WithSubtree>
</template>

<style scoped lang="scss">

</style>