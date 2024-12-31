<script setup lang="ts">
import PanelHeader from '@/widgets/LayoutInfoPanel/components/PanelHeader.vue';
import ScrollableBlock from '@/UI/Blocks/ScrollableBlock.vue';
import PCDeviceIcon from '@/UI/Icons/Shared/PCDeviceIcon.vue';
import WifiIcon from '@/UI/Icons/Shared/WifiIcon.vue';
import PcAndDynamic from '@/UI/Icons/Shared/PcAndDynamic.vue';
import DownloadIcon from '@/widgets/LayoutHeader/UI/DownloadIcon.vue';
import {useI18n} from "vue-i18n";
import type InfoPanel from "@/app/lib/i18n/locales/en/info-panel";

const {t, tm} = useI18n();

type ConnectionPossibilities = typeof InfoPanel['connectToDevice']['connectionPossibilities'];

const connectionComponents = [
    WifiIcon,
    PcAndDynamic,
    DownloadIcon,
];
</script>

<template>
  <div class="panel">
    <PanelHeader>
      <template #name>
        {{t('info-panel.connectToDevice.title')}}
      </template>
    </PanelHeader>

    <ScrollableBlock
      class="block"
      content-padding="0 16px"
    >
      <div class="currentDeviceWidget">
        <div class="line1">
          <PCDeviceIcon class="icon" />
          <div>{{t('info-panel.connectToDevice.currentDevice')}}</div>
        </div>
        <div
          v-tooltip="t('info-panel.connectToDevice.currentDevice')"
          class="line2"
        >
          {{ t('info-panel.connectToDevice.currentDevice') }}
        </div>
      </div>

      <div class="devices-section">
        <h2>{{ t('info-panel.connectToDevice.devicesNotFound') }}</h2>

        <div
          v-for="(connection, index) in tm('info-panel.connectToDevice.connectionPossibilities') as ConnectionPossibilities"
          :key="index"
          class="possible-connections"
        >
          <div class="connection">
            <div class="icon">
              <Component :is="connectionComponents[index]" />
            </div>
            <div class="text">
              <div
                v-tooltip="connection.title"
                class="title"
              >
                {{connection.title}}
              </div>
              <div class="description">{{connection.description}}</div>
            </div>
          </div>
        </div>
      </div>
    </ScrollableBlock>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  height: 100%;
  width: 100%;

  .block {
    height: calc(100% - var(--info-panel-header-height));
    width: 100%;
    border-bottom-right-radius: 8px;

    .currentDeviceWidget {
      background: transparent
        radial-gradient(
          82.95% 283.44% at 50% -160.29%,
          rgba(30, 215, 96, 0.3) 0,
          #181818 100%
        );
      border-radius: 8px;
      padding: 16px 42px 16px 16px;

      .line1 {
        display: flex;
        margin-bottom: 8px;

        .icon {
          width: 24px;
          height: 24px;
          fill: var(--main-color);
        }

        & > div {
          font-size: 1.5rem;
          font-weight: 700;
          margin-left: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -moz-box-orient: vertical;
          overflow: hidden;
        }
      }

      .line2 {
        font-size: 1rem;
        margin-bottom: 11px;
        width: min-content;
        white-space: nowrap;
      }
    }

    .devices-section {
      padding: 0 9px 0 12px;

      h2 {
        font-size: 1rem;
        font-weight: 600;
        margin: 27px 0;
      }

      .possible-connections {
        width: 100%;

        .connection {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          align-items: center;
          padding: 8px 0;

          .icon {
            display: flex;
            align-items: center;

            svg {
              width: 24px;
              height: 24px;
              fill: var(--text-soft);
            }
          }

          .text {

            .title {
              font-size: .95rem;
              margin-bottom: 5px;
              width: min-content;
              white-space: nowrap;

            }

            .description {
              font-size: .9rem;
              line-height: 1.35;
              color: var(--text-soft);
            }
          }
        }
      }
    }
  }
}
</style>
