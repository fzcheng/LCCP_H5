<template>
  <div class="rounded-xl p-2 flex items-center justify-center bg-[#fcd33c12]" style="border: 1px solid #fcd33c">
    <div class="flex-1 w-10 text-center">
      <div class="font-bold">TotalCommission</div>
      <div class="text-secondary">
        <span>M$</span>
        <span class="font-bold text-lg">{{ totalCommission }}</span>
      </div>
    </div>
    <div class="h-8 w-[1px] bg-[#FCD33C]"></div>
    <div class="flex-1 w-10 text-center">
      <div class="font-bold">Total de personas</div>
      <div class="text-secondary">
        <span class="font-bold text-lg">{{ totalPeople }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    totalCommission: number
    totalPeople: number
  }>()

</script>

<style lang="scss" scoped></style>
