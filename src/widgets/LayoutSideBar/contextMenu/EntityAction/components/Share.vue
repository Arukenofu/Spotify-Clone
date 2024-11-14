<script setup lang="ts">
import CopyLinkIcon from "@/UI/Icons/Shared/CopyLinkIcon.vue";
import CodeBlockIcon from "@/UI/Icons/Shared/CodeBlockIcon.vue";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";
import WithSubtree from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/WithSubtree.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import ShareIcon from "@/UI/Icons/Shared/ShareIcon.vue";
import {addToast} from "@/widgets/Toast";
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

    <template #context>
      <BasicContextMenuItem @click="addToast('Ссылка скопирована в буфер обмена')">
        Копировать ссылку URI
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