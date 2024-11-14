<script setup lang="ts">
import {onUnmounted, ref, watch} from 'vue';

import SearchIcon from '@/UI/Icons/Shared/SearchIcon.vue';
import RoundButton from '@/UI/Buttons/RoundButton.vue';
import CloseIconRound from '@/UI/Icons/Shared/CloseIconRound.vue';

import useDebounce from "@/shared/composables/useDebounce";

const state = ref<boolean>(false);
const input = ref<HTMLInputElement>();

const model = defineModel<string>({
  required: true
});

const inputValue = ref<string>('');
const {debounce, clear} = useDebounce();

watch(inputValue, (value) => {
  if (!value) {
    clear();
    model.value = '';
    return;
  }

  debounce(() => {
    model.value = value;
  }, 500);
});

function handleToggle() {
  input.value?.focus();

  if (state.value) {
    return;
  }

  state.value = !state.value;
}

function handleClose() {
  state.value = false;
  model.value = '';
  inputValue.value = '';
}

onUnmounted(() => {
  model.value = '';
})
</script>

<template>
  <div class="search-section">
    <div
      v-if="state"
      class="overlay"
      @click="handleToggle()"
    >
      <CloseIconRound
        v-if="state && model.length"
        class="icon"
        @click="handleClose()"
      />
    </div>

    <RoundButton
      v-tooltip="'Искать в медиатеке'"
      class="searchButton"
      @click="handleToggle()"
    >
      <SearchIcon class="searchIcon" />
    </RoundButton>

    <input
      ref="input"
      v-model="inputValue"
      :class="state && 'active'"
      placeholder="Искать в медиатеке"
    >
  </div>
</template>

<style lang="scss" scoped>
.search-section {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-right: 15px;

  .overlay {
    position: absolute;
    inset: 0;
    z-index: 1 !important;
    cursor: text;

    .icon {
      position: absolute;
      right: 0;
      cursor: pointer;
    }
  }

  &:has(.active) {
    width: 188px;
    min-width: 188px;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition-duration: 0.3s;
    transition-property: opacity, width, padding, background-color;
    transition-timing-function: cubic-bezier(0.3, 0, 0.4, 1);
    border-radius: 4px;
    border: none;
    outline: none;
    color: var(--text-soft);
    font-size: 0.8rem;
    font-weight: 500;
    background-color: var(--ui);
    max-width: 0;
    padding: 0;
    opacity: 0;
  }

  .active {
    background-color: hsla(0, 0%, 100%, 0.1);
    padding: 4px 32px;
    opacity: 1;
    max-width: 188px !important;
  }

  .searchButton {
    &:hover .searchIcon {
      fill: var(--white);
    }

    &:active {
      background-color: var(--ui-highlight) !important;
    }

    .searchIcon {
      width: 16px;
      height: 16px;
      fill: var(--text-soft);
    }
  }

  .icon {
    fill: var(--text-soft);
    width: 32px;
    height: 32px;
    scale: 0.5;
  }
}
</style>
