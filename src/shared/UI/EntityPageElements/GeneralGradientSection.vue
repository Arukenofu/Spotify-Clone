<script setup lang="ts">

interface Props {
  bgColor: string | null
}
const {bgColor = '#333333'} = defineProps<Props>()

</script>

<template>
  <div class="general">
    <div class="background" />

    <div class="controls">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.general {
  position: relative;

  .controls {
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    min-height: 56px;
    padding: var(--content-spacing);
    display: flex;
    align-items: center;
  }

  .background {
    top: 0;
    position: absolute;
    background-color: v-bind("bgColor || 'rgb(83, 83, 83)'");
    background-image: linear-gradient(rgba(0,0,0,.6) 0, var(--ui) 100%),var(--background-noise);
    height: 232px;
    width: 100%;
    z-index: -1;
  }
}
</style>