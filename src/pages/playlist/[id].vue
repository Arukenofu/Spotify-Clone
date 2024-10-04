<script setup lang="ts">
import { useRoute } from 'vue-router';
import setTitle from '@/shared/utils/setTitle';

const route = useRoute('/playlist/[id]');

// Temporarily using id parameter
setTitle(`${route.params.id} | Spotify Playlist`);
</script>

<template></template>

<style lang="scss" scoped></style>
