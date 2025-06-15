<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import setTitle from '@/shared/utils/setTitle'

const { t } = useI18n()

setTitle(t('route-titles.section'))
</script>

<template></template>

<style lang="scss" scoped></style>
