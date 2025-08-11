<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="flex header min-h-[45px] items-center">
      <div @click="$router.back()" class="flex items-center w-[50px] q-px-md q-py-sm">
        <q-icon name="arrow_back_ios" size="16px" />
      </div>
      <div class="flex-1 w-10 font-bold text-base text-center q-py-sm">{{ title ?? '' }}</div>
      <div class="center w-[50px] q-py-sm"><slot name="actions"></slot></div>
    </q-header>
    <q-page-container >
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style lang="scss" scoped>
.header {
  background: #181a20;
  background-size: 100% 100%;
}
</style>
