<script setup lang="ts">
import {ref} from "vue";

import SearchIcon from "@/widgets/LayoutSideBar/UI/Icons/SearchIcon.vue";
import RoundButton from "@/UI/Buttons/RoundButton.vue";
import CloseIcon from "@/UI/Icons/Shared/CloseIcon.vue";

const state = ref<boolean>(false);
const input = ref<HTMLInputElement>();

const model = defineModel<string>({
  required: true
});

function handleToggle() {
  state.value = !state.value;

  if (state.value) {
    input.value?.focus();
  }
}

function handleClose() {
  state.value = false;
  model.value = '';
}

function onClickOutside() {
  if (model.value.length && !state.value) {
    return;
  }

  state.value = false;
}

</script>

<template>
  <div class="search-section">
    <RoundButton
        class="searchButton"
        v-tooltip="'Искать в медиатеке'"
        @click="handleToggle()"
        v-click-outside="onClickOutside"
    >
      <SearchIcon class="searchIcon" />
    </RoundButton>

    <input
        ref="input"
        v-model="model"
        :class="state && 'active'"
        placeholder="Искать в медиатеке"
    />

    <CloseIcon
        @click="handleClose()"
        v-if="state && model.length"
        class="icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-section {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &:has(.active) {
    width: 188px;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition-duration: .3s;
    transition-property: opacity, width, padding, background-color;
    transition-timing-function: cubic-bezier(.3,0,.4,1);
    border-radius: 4px;
    border: none;
    outline: none;
    color: var(--text-soft);
    font-size: 0.8rem;
    background-color: var(--ui);
    max-width: 0;
    padding: 0;
    opacity: 0;
  }

  .active {
    background-color: hsla(0,0%,100%,.1);
    max-width: 188px !important;
    padding: 4px 32px;
    opacity: 1;
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
    scale: .5;
  }
}
</style>