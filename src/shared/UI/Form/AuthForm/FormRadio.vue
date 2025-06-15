<script setup lang="ts">
defineProps<{
  index: any
  text: any
  name: any
}>()

const model = defineModel<string | null>()
</script>

<template>
  <div
    class="radio"
    @click="model = index"
  >
    <input
      :id="index"
      v-bind="$attrs"
      type="radio"
      :name="name"
    >
    <label :for="index">
      <span class="indicator" />

      <span class="added-at">
        {{ text }}
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.radio {
  display: flex;
  align-items: center;
  position: relative;

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

  input:checked + label .indicator {
    background-color: var(--main-color);
    border: none;
    position: relative;

    &::after {
      border-radius: 50%;
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 8px;
      width: 8px;
      background-color: var(--ui);
    }
  }

  label {
    display: flex;
    align-items: center;

    .indicator {
      outline: none;
      width: 16px;
      height: 16px;
      background-color: inherit;
      border: 1px solid #727272;
      border-radius: 50%;
    }

    .added-at {
      padding-left: 9px;
      padding-right: 24px;
      font-size: 0.95em;
    }
  }

  &:hover {
    label .indicator {
      border: 1px solid var(--main-color);
    }
  }
}
</style>
