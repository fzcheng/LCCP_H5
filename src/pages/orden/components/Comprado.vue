<template>
  <div v-for="item in list" :key="item.id" class="p-3 rounded-lg mt-4 relative"
      :class="[item.balance_goods_status == 1 ? 'box-active' : 'box',item.balance_goods_status == 0 ? 'gray' : '']" 
      :style="item.balance_goods_status == 1 ? '':'border: 1px solid #fcd33c'">
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
          <!-- <div>Ingreso diario: M${{ item.day_income }}</div>
          <div>Ingreso total: M${{ item.total_income }}</div>
          <div>Días de inversión: {{ item.effective_time }} días</div> -->
          <div>Ganancia diaria: M${{ item.day_send_money ?? '0' }}</div>
          <div>Desbloqueo diario: M${{ item.day_income ?? '0'}}</div>
          <div>Total comisión: {{ getRebate(item)}}%</div>
        </div>
      </div>
    </div>
    <!-- <div class="flex items-end justify-end text-[#FA0401] text-xs">
      <div>Restante: {{ item.surplus_time }}</div>
    </div> -->
    <div v-if="item.balance_goods_status == 1" class="active-box">
      Activo
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
.box{
  background: #507D46;
}
.box-active{
    background-image: url(src/assets/images/home/a.png);
    background-size: 100% 100%;
  }
.active-box {
  background-image: url(src/assets/images/home/active.png);
  background-size: 100% 100%;
  width: 70px;
  padding-left: 10px;
  position: absolute;
  right: -3px;
  top: -10px;
  font-size: 12px;
  font-weight: bold;
}
.gray{
  filter:grayscale(100%);
}
</style>
