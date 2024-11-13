<script setup lang="ts">
import Loading from "@/shared/components/Loading.vue";
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <template #default>
          <div class="content">
            <Component :is="Component" />
          </div>
        </template>

        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<style scoped lang="scss">

</style>