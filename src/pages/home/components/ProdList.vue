<template>
  <div>
    <img src="~/assets/images/home/list_text.png" alt="list_text" class="block" style="width: 154px; height: 15.75px" />
    <div v-for="(item,index) in data" :key="item.id" class="p-3 rounded-lg mt-3 relative" 
    :class="[item.balance_goods_status == 1 ? 'box-active' : 'box',item.balance_goods_status == 0 ? 'gray' : '']" 
    :style="item.balance_goods_status == 1 ? '':'border: 1px solid #fcd33c'">
      <div class="flex items-center justify-between">
        <div class="font-bold text-base">{{ item.goods_name }}</div>
        <div class="text-lg font-bold text-primary">M$ {{ item.goods_price }}</div>
      </div>
      <div class="flex items-center q-mr-xs mt-1">
        <div class="flex-1 w-10 flex items-center no-wrap">
          <q-img
            :src="item.goods_pic"
            :ratio="1"
            spinner-color="primary"
            spinner-size="20px"
            width="75px"
            height="75px"
            class="mr-2"
            style="border-radius: 6px"
          />
          <div class="flex-1 w-5 text-[13px]">
            <div class="text-center">Recibir salario todos los días</div>
            <div class="flex items-center justify-center text-bold gap-1">        
              <q-img
                src="~/assets/images/home/m.png"
                width="14px"
                height="14px"
                fit="contain"
                no-spinner
                no-transition
                alt=""
              />
              M${{ item.day_income ?? '0'}}
            </div>
            <div class="text-center">Todos los días a las</div>
            <div class="flex items-center justify-center text-bold gap-1">        
              <q-img
                src="~/assets/images/home/t.png"
                width="14px"
                height="14px"
                fit="contain"
                no-spinner
                no-transition
                alt=""
              />
              12:30
            </div>
            <!-- <div>Ganancia diaria: M${{ item.day_send_money ?? '0' }}</div>
            <div>Desbloqueo diario: M${{ item.day_income ?? '0'}}</div>
            <div>Total comisión: {{ getRebate(item)}}%</div> -->
          </div>
        </div>
        <q-btn
          color="primary"
          @click="$router.push({ path: '/detalledebienes', query: { id: item.id } })"
          no-caps
          size="sm"
          padding="xs sm"
          label="Invertir"
          text-color="black"
          unelevated
          style="border-radius: 6px"
          :disable="item.balance_goods_status == 0 ? true : false"
        />
      </div>
      <div v-if="item.balance_goods_status == 1" class="active-box">
        Activo
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GInfoItem } from '../typings'
//balance_goods_status": 1//余额商品状态 1生效 0比当前等级低 2比当前等级高
const props = defineProps<{
  data: GInfoItem[]
}>()

const getRebate = (item: GInfoItem) => {
  // return parseInt(item.site_y_rebate)  + parseInt(item.site_e_rebate) + parseInt(item.site_s_rebate)
  return parseInt(item.recharge_y_rebate)  + parseInt(item.recharge_e_rebate) + parseInt(item.recharge_s_rebate)
}

const getBalanceState = (i: number) => {
  let grayState = false
  props.data.forEach((item,index) => {
    if(item.balance_goods_status == 1){
      if(i !== index && i == 0)
        grayState =  true
      return;
    }
  })
  return grayState
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
