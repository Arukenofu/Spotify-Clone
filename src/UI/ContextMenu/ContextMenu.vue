<script setup lang="ts">
import {Tippy} from "vue-tippy";
import type {ComponentPropsType} from "@/shared/utils/componentPropsType";

/* @vue-ignore */
interface Props extends ComponentPropsType<typeof Tippy> {
}
defineProps<Props>()
</script>

<template>
  <Tippy
    theme="context"
    :interactive="true"
    trigger="contextmenu"
    v-bind="$props"
    @contextmenu.prevent
  >
    <template #default>
      <slot name="default" />
    </template>

    <template #content>
      <slot name="menu" />
    </template>
  </Tippy>
</template>

<style scoped lang="scss">

</style>