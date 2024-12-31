<script setup lang="ts">
import PanelHeader from "@/widgets/LayoutInfoPanel/components/PanelHeader.vue";
import QueueIcon from "@/UI/Icons/Shared/QueueIcon.vue";
import BubbleButton from "@/UI/Buttons/BubbleButton.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<template>
  <div class="no-queue">
    <PanelHeader>
      <template #name>
        {{t('info-panel.queue.queue')}}
      </template>
    </PanelHeader>

    <div class="content">
      <div class="message">
        <QueueIcon class="icon" />

        <h1>{{t('info-panel.queue.addTracks')}}</h1>

        <p>
          {{t('info-panel.queue.addTrackDescription')}}
        </p>

        <BubbleButton
          class="button"
          design="active"
          @click="$router.push('/search')"
        >
          {{t('info-panel.queue.searchTracks')}}
        </BubbleButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.no-queue {
  height: 100%;

  .content {
    height: calc(100% - var(--info-panel-header-height));
    padding: 0 var(--content-spacing);
    position: relative;

    .message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 90%;

      .icon {
        fill: var(--white);
        width: 64px;
        margin-bottom: 21px;
      }

      h1 {
        display: block;
        width: 100%;
        font-weight: 700;
        font-size: 2rem;
        text-wrap: balance;
        line-height: 1.375;
        margin-bottom: 12px;
      }

      p {
        color: var(--text-soft);
        line-height: 1.375;
        margin-bottom: 21px;
      }

      .button {
        font-size: 1rem;
        font-weight: 500;
        padding: 16px 36px;
        transform: translate3d(0px, 0px, 0px);

        &:hover {
          scale: 1.04;
        }

        &:active {
          scale: 1;
        }
      }
    }
  }
}
</style>