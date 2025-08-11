<template>
  <div class="rounded-xl p-2 flex items-center justify-center bg-[#fcd33c12]" style="border: 1px solid #fcd33c">
    <div class="flex-1 w-10 text-center">
      <div class="font-bold">Retiro disponible</div>
      <div class="text-secondary">
        <span>M$</span>
        <span class="font-bold text-lg">{{ data?.yongj ?? '0.0' }}</span>
      </div>
    </div>
    <div class="h-8 w-[1px] bg-[#FCD33C]"></div>
    <div class="flex-1 w-10 text-center">
      <div class="font-bold">Recargar dinero</div>
      <div class="text-secondary">
        <span>M$</span>
        <span class="font-bold text-lg">{{ data?.balance ?? '0.0' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UInfo } from '../typings'

defineProps<{
  data: UInfo | undefined
}>()
</script>

<style lang="scss" scoped></style>
