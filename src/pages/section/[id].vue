<script setup lang="ts">
import setTitle from '@/shared/utils/setTitle';
import {useI18n} from "vue-i18n";

const {t} = useI18n();

setTitle(t('route-titles.section'));
</script>

<template></template>

<style lang="scss" scoped></style>
