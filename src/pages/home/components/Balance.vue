<template>
  <div class="rounded-xl p-2 bg-[#FFBA31]" style="border: 1px solid #fcd33c">
    <!-- <div class="flex-1 text-center mt-1">
      <div class="font-bold text-black">Retiro disponible</div>
      <div class="font-bold text-[#13633C] mt-1">
        <span class="text-lg">M$</span>
        <span class="text-2xl">{{ data?.send_money ?? '0.0' }}</span>
      </div>
    </div>
    <div class="h-[1px] w-full bg-[#6E5113] my-2"></div>
    <div class="flex-1  text-center">
      <div class="font-bold text-black">Recargar dinero</div>
      <div class="font-bold text-[#13633C] mt-1">
        <span class="text-lg">M$</span>
        <span class="text-2xl">{{ data?.balance ?? '0.0' }}</span>
      </div>
    </div> -->
    <div class="flex items-center justify-between mt-1">
      <div class="font-bold text-black">Retiro disponible</div>
      <div class="font-bold text-[#13633C]">
        <span class="text-lg">M$</span>
        <!-- <span class="text-2xl">{{ data?.yongj ?? '0.0' }}</span> -->
        <span class="text-2xl">{{ data?.send_money ?? '0.0' }}</span>
      </div>
    </div>
    <div class="h-[1px] w-full bg-[#6E5113] my-2"></div>
    <div class="flex items-center justify-between  text-center">
      <div class="font-bold text-black">Recargar dinero</div>
      <div class="font-bold text-[#13633C]">
        <span class="text-lg">M$</span>
        <span class="text-2xl">{{ data?.balance ?? '0.0' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UInfo } from '../typings';

defineProps<{
  data: UInfo | undefined
}>()
</script>

<style lang="scss" scoped></style>
