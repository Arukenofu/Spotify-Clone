<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<template>
  <div class="checkbox">
    <input
      v-model="model"
      type="checkbox"
    >
    <span class="indicator">
      <span class="thumb" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  width: 30px;
  height: 16px;

  &:focus {
    .indicator.thumb::after {
      border-color: var(--white);
    }
  }

  .indicator {
    display: block;
    height: 100%;
    width: 30px;
    border-radius: 14px;

    &:focus::after {
      border-color: var(--white);
    }

    .thumb {
      position: absolute;
      height: 12px;
      width: 12px;
      background-color: var(--ui);
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      transition: left .2s;
    }

    &::after {
      display: block;
      position: absolute;
      pointer-events: none;
      transition: border-color 200ms ease-in;
      box-sizing: border-box;
      inline-size: calc(100% + 12px);
      block-size: calc(100% + 12px);
      top: -6px;
      left: -6px;
      background: transparent;
      border-radius: 14px;
      border: 3px solid transparent;
      content: '';
    }
  }

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

  input:not(:checked) + .indicator {
    background-color: #727272;

    .thumb {
      left: 2px;
    }
  }

  input:checked ~ .indicator {
    background-color: var(--main-color);

    .thumb {
      left: 16px;
    }
  }
}
</style>
