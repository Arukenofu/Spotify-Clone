<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageFooter from '@/app/components/PageFooter.vue'
import SpotifyView from '@/app/components/SpotifyView.vue'
import { router } from '@/app/router'
import { getCurrentUserProfile } from '@/services/sdk/entities/user.ts'
import useResponsive from '@/shared/composables/useResponsive'
import ScrollableBlock from '@/shared/UI/Blocks/ScrollableBlock.vue'
import { LayoutHeader } from '@/widgets/LayoutHeader'
import { LayoutInfoContent } from '@/widgets/LayoutInfoPanel'
import { LayoutMobileRouter } from '@/widgets/LayoutRouterMobile'
import { LayoutSideBar } from '@/widgets/LayoutSideBar'
import { MediaPlayer } from '@/widgets/MediaPlayer'
import { Toast } from '@/widgets/Toast'

const layout = ref()
const layoutScrollY = ref<number>(0)

provide('layoutScrollY', layoutScrollY)
provide('layoutContent', layout)

router.afterEach(() => {
  layout.value?.content.scrollTo({
    top: 0,
  })
  layoutScrollY.value = 0
})

const route = useRoute()
const { isMobile } = useResponsive()

onMounted(() => {
  function setStyleVar(property: string, value: string) {
    document.documentElement.style.setProperty(property, value)
  }

  if (isMobile) {
    setStyleVar('--content-height', 'calc(100dvh - var(--mobile-router-height))')
    setStyleVar('--layout-gap', '0px')
  }
  else {
    setStyleVar('--content-height', 'calc(100dvh - var(--player-height) - 72px)')
    setStyleVar('--layout-gap', '8px')
  }
})

await Promise.all([
  getCurrentUserProfile(),
])
</script>

<template>
  <div class="root">
    <template v-if="!isMobile">
      <LayoutHeader />

      <div class="main">
        <LayoutSideBar />

        <ScrollableBlock
          is="main"
          ref="layout"
          v-model="layoutScrollY"
          scrollbar-width="12px"
          :allow-style-shadow="false"
        >
          <SpotifyView />

          <PageFooter v-if="route.path !== '/lyrics'" />
        </ScrollableBlock>

        <LayoutInfoContent />
      </div>
    </template>

    <template v-else>
      <div class="main">
        <ScrollableBlock
          is="main"
          ref="layout"
          v-model="layoutScrollY"
          scrollbar-width="5px"
          :allow-style-shadow="false"
        >
          <SpotifyView />
        </ScrollableBlock>
      </div>
    </template>

    <Toast />
  </div>

  <MediaPlayer />
  <LayoutMobileRouter v-if="isMobile" />
</template>

<style lang="scss" scoped>
.root {
  width: 100dvw;
  display: grid;
  padding: var(--layout-gap);
  background-color: var(--black);
  position: relative;

  .main {
    height: var(--content-height);
    min-height: 400px;
    display: flex;

    main {
      position: relative;
      background-color: var(--ui);
      flex: 1;
      border-radius: var(--border-radius);
      container-type: inline-size;
      container-name: content;
      transform: translate(0);

      @media screen and (max-width: 768px) {
        & {
          border-radius: 0 !important;
        }
      }
    }

    .content {
      margin: 0 auto;
      position: relative;
      min-height: 100%;
      z-index: 1 !important;
    }
  }
}
</style>
