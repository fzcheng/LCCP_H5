<template>
  <q-page class="q-pa-md">
    <div class="flex items-center justify-center">
      <div class="center mr-1">
        <img src="~/assets/images/orden/title.png" alt="title" style="width: 22px; height: 22px" />
      </div>
      <div class="font-bold text-xl text-[#370000]">{{ t('Orden') }}</div>
    </div>

    <div
      class="box rounded-lg p-3 q-mt-md text-[#370000]"
    >
      <div class="">
        <div>{{ t('orden3') }}</div>
        <div class="text-[#FF9600] font-bold">
          <span>{{ t('symbol') }}</span>
          <span class="text-lg">{{ ingresosLiquidar }}</span>
        </div>
      </div>
      <div class="flex justify-between gap-2 mt-2">
        <div class="bg-[#F9EAC9] rounded-lg p-2 text-center flex-1">
          <div>{{ t('orden1') }}</div>
          <div class="text-[#FF9600] font-bold">
            <span>{{ t('symbol') }}</span>
            <span class="text-lg">{{ total }}</span>
          </div>
        </div>
        <div class="bg-[#F9EAC9] rounded-lg p-2 text-center flex-1">
          <div>{{ t('orden2') }}</div>
          <div class="text-[#FF9600] font-bold">
            <span class="text-lg">{{ cantidadProducto }}</span>
          </div>
        </div>
      </div>

    </div>

    <q-tabs v-model="tab" class="text-grey-5 q-mt-sm" active-color="red" indicator-color="red" align="justify">
      <q-tab name="comprado" no-caps :ripple="false" style="font-size: 16px" :label="t('orden4')" />
      <q-tab name="ya" :ripple="false" no-caps :label="t('orden5')" />
    </q-tabs>
    <q-separator style="margin-top: -1px" color="grey-5" />

    <q-tab-panels v-model="tab" animated style="background-color: #ffffff7a;">
      <q-tab-panel name="comprado" class="q-pa-none">
        <Comprado :list="list" />
      </q-tab-panel>

      <q-tab-panel name="ya" class="q-pa-none">
        <YaVencido :list="list" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import Comprado from './components/Comprado.vue'
import YaVencido from './components/YaVencido.vue'
import { goodsOrderApi } from 'src/api/order'
import { UavInfoItem } from './typings'
import { generateAsyncUpdate } from 'src/utils/async'
import { useI18n } from 'vue-i18n'

const {t} = useI18n()
const tab = ref('comprado')

const total = ref<number>(0)
const cantidadProducto = ref<number>(0)
const ingresosLiquidar = ref<number>(0)
const list = ref<UavInfoItem[]>([])
// const list = ref<UavInfoItem[]>([
//   {
//     id: 1,
//     orderid: 'ORD-20231027001',
//     uid: 10001,
//     gid: 501,
//     addtime: 1698364800,
//     expiration_time: 1730000000,
//     status: 1,
//     goods_name: 'High-Performance Drone X1',
//     goods_price: '5000.00',
//     goods_pic: '/src/assets/images/home/product1.png',
//     hourly_income: '10.50',
//     day_income: '252.00',
//     effective_time: 30,
//     total_income: 7560,
//     ljwjssy: 1200.50,
//     surplus_time: '15 Days',
//     goods_info: 'Advanced aerial photography drone',
//     cid: 1
//   },
//   {
//     id: 2,
//     orderid: 'ORD-20231027002',
//     uid: 10001,
//     gid: 502,
//     addtime: 1698451200,
//     expiration_time: 1731000000,
//     status: 1,
//     goods_name: 'Agricultural Drone Agri-200',
//     goods_price: '12000.00',
//     goods_pic: '/src/assets/images/home/product2.png',
//     hourly_income: '25.00',
//     day_income: '600.00',
//     effective_time: 60,
//     total_income: 36000,
//     ljwjssy: 5000.00,
//     surplus_time: '45 Days',
//     goods_info: 'Heavy-duty drone',
//     cid: 2
//   }
// ])

const dataUpdate = generateAsyncUpdate(res => {
  total.value = res.lixi
  cantidadProducto.value = res.uavInfoNum
  ingresosLiquidar.value = res.allwjssy
  list.value = res.uavinfo
})

const initData = async () => {
  list.value = []
  dataUpdate(async () => {
    const res = await goodsOrderApi({ type: tab.value === 'comprado' ? 1 : 2 })
    return res.data
  })
}

watch(tab, initData, {
  immediate: true
})
</script>

<style lang="scss" scoped>
.box{
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
