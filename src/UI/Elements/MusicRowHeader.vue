<script setup lang="ts">
import ClockIcon from "@/UI/Icons/Shared/ClockIcon.vue";
import {onMounted, onUnmounted, ref, useTemplateRef} from "vue";

interface Props {
  parentElement: HTMLElement;
  passingHeight?: number;
  var1?: any;
  var2?: any;
  isVar1?: boolean;
  isVar2?: boolean;
}

const {
  parentElement,
  passingHeight = 128
} = defineProps<Props>();

const isSticky = ref<boolean>(false);
const stickyTableHead = useTemplateRef<HTMLElement>('stickyTableHead');

function setIsSticky() {
  isSticky.value = !!(stickyTableHead.value && stickyTableHead.value.getBoundingClientRect().top <= passingHeight);
}

onMounted(() => {
  parentElement.addEventListener('scroll', setIsSticky);
});

onUnmounted(() => {
  parentElement.removeEventListener('scroll', setIsSticky);
})
</script>

<template>
  <div ref="stickyTableHead" class="v-music-row" :class="isSticky && 'stuck'">
    <div class="index">#</div>
    <div class="name">Название</div>
    <div v-if="isVar1" class="var1">{{var1}}</div>
    <div v-if="isVar2" class="var2">{{var2}}</div>
    <div class="time">
      <div v-tooltip="'Длительность'">
        <ClockIcon class="icon" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-music-row {
  position: sticky;
  width: 100%;
  top: 64px;
  height: 36px;
  padding: 0 calc(var(--content-spacing) + 16px);
  display: grid;
  grid-gap: 16px;
  grid-template-rows: auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1 !important;

  & > div {
    height: 100%;
    display: flex;
    align-items: center;
    color: var(--text-soft);
    font-size: 0.875rem;
    font-weight: 500;

    &:first-child {
      justify-self: end;
      font-size: 1rem;
    }

    & > div {
      margin-left: auto;
      margin-right: 32px;

      .icon {
        width: 16px;
        height: 16px;
        fill: var(--text-soft);
      }
    }
  }

  $classes: (
      'index' : 'index',
      'name' : 'main',
      'var1' : 'var1',
      'var2' : 'var2',
      'time' : 'time'
  );

  @each $class, $line in $classes {
    .#{$class} {
      grid-column: #{$line};
    }
  }
}

.stuck {
  background-color: var(--ui-highlight);
}
</style>