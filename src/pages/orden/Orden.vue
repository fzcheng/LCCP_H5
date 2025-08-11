<template>
  <q-page class="q-pa-md">
    <div class="flex items-center justify-center">
      <div class="center mr-1">
        <img src="~/assets/images/orden/title.png" alt="title" style="width: 22px; height: 22px" />
      </div>
      <div class="font-bold text-xl">Orden</div>
    </div>

    <div
      class="bg-[#fcd33c12] rounded-lg p-2 q-mt-md flex justify-center items-center"
      style="border: 1px solid #fcd33c"
    >
      <div class="text-center mx-4 my-1">
        <div>Ganancia total</div>
        <div class="text-secondary font-bold">
          <span>M$</span>
          <span class="text-lg">{{ total }}</span>
        </div>
      </div>
      <div class="text-center mx-4 my-1">
        <div>Cantidad de producto</div>
        <div class="text-secondary font-bold">
          <span class="text-lg">{{ cantidadProducto }}</span>
        </div>
      </div>
      <div class="text-center mx-4 my-1">
        <div>Ingresos pendientes de liquidar</div>
        <div class="text-secondary font-bold">
          <span>M$</span>
          <span class="text-lg">{{ ingresosLiquidar }}</span>
        </div>
      </div>
    </div>

    <q-tabs v-model="tab" class="text-grey-5 q-mt-sm" active-color="primary" indicator-color="primary" align="justify">
      <q-tab name="comprado" no-caps :ripple="false" style="font-size: 16px" label="Comprado" />
      <q-tab name="ya" :ripple="false" no-caps label="Ya vencido" />
    </q-tabs>
    <q-separator style="margin-top: -1px" color="grey-5" />

    <q-tab-panels v-model="tab" animated>
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

const tab = ref('comprado')

const total = ref<number>(0)
const cantidadProducto = ref<number>(0)
const ingresosLiquidar = ref<number>(0)

const list = ref<UavInfoItem[]>([])

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

<style lang="scss" scoped></style>
