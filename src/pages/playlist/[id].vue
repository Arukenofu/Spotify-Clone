<script setup lang="ts">
import { useRoute } from 'vue-router';
import setTitle from '@/shared/utils/setTitle';
import EntityAvatar1x1 from '@/UI/Elements/EntityAvatar1x1.vue';
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';
import { computed, inject, ref } from 'vue';
import StickyHeader from '@/UI/Blocks/StickyHeader.vue';

const route = useRoute('/playlist/[id]');

setTitle(`${route.params.id} | Spotify Playlist`);

const scrollY = inject('layoutScrollY', ref(0));

const passingHeight = 240;
const isHeightPassed = computed(() => {
  return scrollY.value > passingHeight;
});
</script>

<template>
  <Transition name="header">
    <StickyHeader v-show="isHeightPassed" class="header">
      <template #filter>
        <div class="background_inner" />
      </template>

      <template #default>
        <GreenPlayingButton :state="false" />
        <div class="title">Микс дня #4</div>
      </template>
    </StickyHeader>
  </Transition>

  <div class="playlist">
    <div class="playlist_about">
      <div class="baseBackground" />
      <div class="background" />
      <div class="playlist_about_section">
        <EntityAvatar1x1
          class="picture"
          type="Artist"
          :image="''"
        />

        <div class="info">
          <span class="type">
            Исполнитель
          </span>

          <h1 class="name">Микс дня #4</h1>

          <div class="artists">
            Sadraddin, Ирина Кайратовна, Hiro и не только
          </div>

          <div class="other-info">
            <div class="logo">
              <figure title="Spotify" style="width: 24px; height: 24px;">
                <div class="" style="width: 24px; height: 24px; inset-inline-start: 0"><img aria-hidden="false" draggable="false" loading="eager" src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5" alt="Spotify"></div>
              </figure>
              <span>Spotify</span>
            </div>
            <span class="dot">•</span>
            <div class="quantity">
              50 треков, примерно 2 ч. 30 мин.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="playlist_general">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  padding: 0 var(--content-spacing);
  background-color: #212121;

  .background_inner {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
  }

  .title {
    margin-left: 9px;
    font-size: 1.4rem;
    font-weight: 900;
  }
}

.header-enter-active,
.header-leave-active {
  transition: opacity .4s ease-out;
}

.header-enter-from,
.header-leave-to {
  opacity: 0;
}


.playlist {
  margin-top: -64px;
  container: playlist / inline-size;
  height: 200vh;

  .playlist_about {
    height: calc(30vh + 128px);
    min-height: 320px;
    max-height: calc(528px);
    padding-bottom: var(--content-spacing);
    position: relative;

    .playlist_about_section {
      display: flex;
      align-items: flex-end;
      padding: 0 var(--content-spacing);
      height: 100%;

      .picture {
        margin-right: var(--content-spacing);
        height: 220px;
      }

      .info {
        z-index: 1;
        display: flex;
        flex-direction: column;

        .type {
          font-size: .875rem;
          font-weight: 500;
        }

        .name {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          user-select: none;
          font-size: 6rem;
          font-weight: 900;
          text-wrap: balance;
          white-space: nowrap;
          -webkit-box-orient: vertical;
          line-height: normal;
          overflow: hidden;
          text-align: left;
          width: 100%;
          word-break: break-word;
          margin-bottom: 12px;
        }

        .artists {
          color: var(--text-soft);
          font-size: .875rem;
          line-height: normal;
          overflow: hidden;
          text-align: left;
          width: 100%;
          word-break: break-word;
        }

        .other-info {
          margin-top: 8px;
          height: 24px;
          display: flex;
          align-items: center;

          .logo {
            color: hsla(0,0%,100%,.7);
            white-space: nowrap;
            display: flex;
            grid-auto-flow: column;
            grid-gap: 4px;
            align-items: center;

            img {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              object-fit: cover;
              object-position: center center;
            }

            span {
              font-size: .875rem;
              font-weight: 700;
            }
          }

          span, .quantity {
            color: var(--text-soft);
            font-size: .875rem;
          }

          & > span {
            margin: 0 4px;
          }
        }
      }
    }

    .baseBackground {
      display: block;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      background-color: rgb(64, 56, 56);
    }

    .background {
      display: block;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      background: linear-gradient(transparent 0, rgba(0,0,0,.5) 100%),var(--background-noise);
    }
  }
}
</style>
