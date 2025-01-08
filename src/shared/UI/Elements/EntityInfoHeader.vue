<script setup lang="ts">
import EntityAvatar1x1 from "@/shared/UI/Elements/EntityAvatar1x1.vue";
import {Modal} from "@/features/Modal";
import {ref} from "vue";
import type {ItemTypes} from "@spotify/web-api-ts-sdk";

interface Props {
  image: string | null;
  mask?: string | null;
  type: ItemTypes | 'user';
}

const {mask, image} = defineProps<Props>();

const isModalOpened = ref<boolean>(false);

function toggleModal(): void {
  if (!image) {
    return;
  }

  isModalOpened.value = !isModalOpened.value;
}
</script>

<template>
  <div class="info-content">
    <div class="info">
      <div
        class="info-image"
        :class="image && 'hoverable'"
        @click="toggleModal()"
      >
        <EntityAvatar1x1
          class="img"
          :type="type"
          :image="image"
        />
      </div>
      <div class="text-info">
        <slot />
      </div>
    </div>

    <div class="bg" />
    <div class="bg-subbed" />

    <Modal v-model="isModalOpened">
      <Transition name="appear-animation" appear>
        <div class="modal-inner">
          <EntityAvatar1x1 class="image" :type="type" :image="image" />

          <button class="button" @click="toggleModal">
            Закрыть
          </button>
        </div>
      </Transition>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
@import "@/features/Modal/styles/appear-animation-styles";
.info-content {
  height: min(30vh, var(--fluid-height));
  max-height: 300px;
  min-height: var(--min-fluid-height);
  padding-bottom: var(--content-spacing);
  position: relative;

  .info {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding: 0 var(--content-spacing);

    .info-image {
      --size: clamp(128px, 128px + (100vw - var(--sidebar-width) * 1px - var(--panel-width) * 1px - 600px) / 424 * 104, 232px);
      margin-right: var(--content-spacing);
      width: var(--size);
      height: var(--size);
      z-index: 1 !important;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        box-shadow: 0 4px 60px rgba(0,0,0,.02);
        user-select: none;
      }
    }

    .hoverable {
      cursor: pointer;
      transition: scale .1s linear;

      &:hover {
        scale: 1.02;
      }
    }

    .text-info {
      container: EntityInfoHeader / inline-size;
      display: flex;
      flex: 1;
      flex-flow: column;
      justify-content: flex-end;
      z-index: 1 !important;
    }
  }

  .bg {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: v-bind("mask || 'rgb(83, 83, 83)'");
  }

  .bg-subbed {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background: linear-gradient(transparent 0, rgba(0,0,0,.5) 100%),var(--background-noise);
  }
}

.modal-inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;

  .image {
    aspect-ratio: 1/1;
    height: 640px;
    max-height: min(640px, 80vh - 24px - 48px);
    max-width: 640px;
  }

  .button {
    height: 48px;
    background: none;
    border: none;
    color: var(--white);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      transform: scale(1.04) translate3d(0px, 0px, 0px);
    }
  }
}
</style>