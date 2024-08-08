<script setup lang="ts">
import {computed} from "vue";
import contextMenuStore from "@/features/ContextMenu/store/contextMenuStore";

const {
  core,
  currentTree,
  isActive,
  options,
  coordinates,
  closeContextMenu
} = contextMenuStore();

const computeStyle = computed(() => {
  return {
    width: options.value.style === 'default' ? '350px' : '175px',
    top: coordinates.value.top + 'px',
    left: coordinates.value.left + 'px',
  }
});

</script>

<template>
  <div
      ref="core"
      v-if="isActive"
      v-click-outside="closeContextMenu"
      class="context-menu"
      :style="[computeStyle]"
  >
    <ul>
      <li v-for="(el, index) in currentTree" :key="index">
        <Component v-if="el.component" :is="el.component" />

        <button v-else @click="el.onClick" :class="el.isLast && 'last'">
          <span class="block">
            <Component class="icon" :is="el.svgIcon" />
            <span class="text">
              {{el.text}}
            </span>
          </span>

          <span class="additionalSvg" v-if="el.additionalSvg">
            <Component class="icon" :is="el.additionalSvg" />
          </span>

          <Index v-if="el.subTree" :tree="el.subTree" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50%, -50%;
  z-index: 999;
  background-color: #282828;
  box-shadow: 0 16px 24px rgba(0,0,0,.3),0 6px 8px rgba(0,0,0,.2);
  border-radius: 6px;
  max-height: calc(100dvh - 24px);
  overflow-y: auto;

  ul {
    padding: 4px;
    list-style: none;

    li {

      button {
        width: 100%;
        background: none;
        border: none;
        height: 40px;
        padding: 12px;
        display: flex;
        align-items: center;
        user-select: none;
        border-radius: 2px;
        position: relative;

        &:hover {
          background-color: hsla(0,0%,100%,.1);
        }

        .icon {
          width: 16px;
          height: 16px;
          fill: var(--text-soft);
        }

        .block {
          display: flex;
          align-items: center;
          gap: 12px;

          .text {
            font-weight: 600;
            font-size: .85rem;
          }
        }

        .additionalSvg {
          margin-left: auto;
          display: grid;
          place-items: center;
        }
      }

      .last::before {
        border-bottom: 1px solid hsla(0,0%,100%,.1);
        content: "";
        left: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>