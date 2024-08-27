<script setup lang="ts">
import {useRoute} from "vue-router";
import setTitle from "@/shared/utils/setTitle";

const route = useRoute();

// Temporarily using id parameter
setTitle(`${route.params.id} | Spotify`)
</script>

<template>

</template>

<style scoped>

</style>