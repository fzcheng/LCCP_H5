<template>
  <div v-for="item in list" :key="item.id" class="p-3 rounded-lg mt-4 bg-[#669D5A] gray" style="border: 1px solid #bdbdbd">
    <div class="flex items-center justify-between">
      <div class="font-bold text-base">{{ item.goods_name }}</div>
      <div class="text-lg font-bold text-grey-5">M$ {{ item.goods_price }}</div>
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
          style="filter: grayscale(100%);border-radius: 6px;"
        />
        <div class="flex-1 w-5 text-[13px]">
          <!-- <div>Ingreso diario: M${{ item.day_income }}</div>
          <div>Ingreso total: M${{ item.total_income }}</div>
          <div>Días de inversión: {{ item.effective_time }} días</div> -->
          <div>Ganancia diaria: M${{ item.day_send_money ?? '0' }}</div>
          <div>Desbloqueo diario: M${{ item.day_income ?? '0'}}</div>
          <div>Total comisión: {{ getRebate(item)}}%</div>
        </div>
      </div>
    </div>
    <div class="flex items-end justify-end text-[#FA0401] text-xs">
      <div>Ha expirado</div>
    </div>
  </div>
  <div v-if="!list.length" class="h-20 center text-gray-400">Aún no hay datos</div>

</template>

<script setup lang="ts">
import type { UavInfoItem } from '../typings'

defineProps<{
  list: UavInfoItem[]
}>()
const getRebate = (item: UavInfoItem) => {
  // return parseInt(item.site_y_rebate)  + parseInt(item.site_e_rebate) + parseInt(item.site_s_rebate)
  return parseInt(item.recharge_y_rebate)  + parseInt(item.recharge_e_rebate) + parseInt(item.recharge_s_rebate)
}
</script>

<style lang="scss" scoped>
.gray{
  filter:grayscale(100%);
}
</style>
