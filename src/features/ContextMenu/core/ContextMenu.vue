<script setup lang="ts">
import type { ComponentPropsType } from '@/shared/utils/typescript/componentPropsType'
import { Tippy } from 'vue-tippy'

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
