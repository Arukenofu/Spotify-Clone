<script setup lang="ts">
import CloseIcon from "@/UI/Icons/Shared/CloseIcon.vue";
import RoundButton from "@/UI/Buttons/RoundButton.vue";
import ScrollableBlock from "@/UI/Blocks/ScrollableBlock.vue";

import useInfoContentStore from "@/features/InfoPanel/store/useInfoContentStore";

const {setNewPanel} = useInfoContentStore();
</script>

<template>
  <div class="panel">
    <div class="head">
      <span class="panel-name">
        Очередь
      </span>

      <div class="panel-options">
        <slot />

        <RoundButton v-tooltip.bottom="'Закрыть'" @click="setNewPanel(null)">
          <CloseIcon class="icon" />
        </RoundButton>
      </div>
    </div>

    <ScrollableBlock class="content">

      <div class="now-playing">

      </div>

    </ScrollableBlock>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  height: 100%;

  .head {
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;

    .panel-name {
      font-size: 1rem;
      font-weight: 800;
    }

    .panel-options {
      margin-left: auto;
    }
  }

  .content {
    height: calc(100% - 64px);

    &:deep(.scrollable-content) {
      padding: 0 8px;
    }
  }
}

:deep(.icon) {
  width: 16px;
  height: 16px;
  fill: var(--text-soft);
}
</style>