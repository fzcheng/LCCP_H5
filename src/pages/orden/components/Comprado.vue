<template>
  <div v-for="item in list" :key="item.id" class="p-3 rounded-lg mt-4" style="border: 1px solid #fcd33c">
    <div class="flex items-center justify-between">
      <div class="font-bold text-base">{{ item.goods_name }}</div>
      <div class="text-lg font-bold text-primary">M$ {{ item.goods_price }}</div>
    </div>
    <div class="flex items-center q-mr-xs">
      <div class="flex-1 w-10 flex items-center no-wrap">
        <q-img
          :src="item.goods_pic"
          :ratio="1"
          spinner-color="primary"
          spinner-size="20px"
          width="65px"
          height="65px"
          class="mr-2"
          style="border-radius: 6px"
        />
        <div class="flex-1 w-5 text-[13px]">
          <div>Ingreso diario: M${{ item.day_income }}</div>
          <div>Ingreso total: M${{ item.total_income }}</div>
          <div>Días de inversión: {{ item.effective_time }} días</div>
        </div>
      </div>
    </div>
    <div class="flex items-end justify-end text-[#FA0401] text-xs">
      <div>Restante: {{ item.surplus_time }}</div>
    </div>
  </div>
  <div v-if="!list.length" class="h-20 center text-gray-400">Aún no hay datos</div>
</template>

<script setup lang="ts">
import type { UavInfoItem } from '../typings'

defineProps<{
  list: UavInfoItem[]
}>()
</script>

<style lang="scss" scoped></style>
