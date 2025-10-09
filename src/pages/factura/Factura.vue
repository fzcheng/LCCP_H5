<template>
  <BackWrap :title="t('Factura')">
    <q-page class="q-pa-md">
      <div class="space-y-3">
        <div v-for="item in list" :key="item.id" class="bg-[#222530] rounded-md p-3">
        <div class="flex justify-between items-center">
          <div class="font-bold text-base" :style="{color: item.color}"> {{ t('symbol') }} {{ BigNumber(item.num).toFixed(1, BigNumber.ROUND_DOWN) }}</div>
          <div>{{ item.type_text }}</div>
        </div>
        <div class="flex justify-between items-center text-[13px] mt-1">
          <div class="text-[#9E9E9E]">{{ t('Tiempo') }}</div>
          <div>{{ dayjs(item.addtime).format('DD/MM/YYYY HH:mm:ss') }}</div>
        </div>
      </div>
      </div>
      <div v-if="loading" class="center py-10">
        <q-spinner color="primary" size="3rem" />
      </div>
      <div v-else-if="!list.length" class="h-20 center text-gray-400">{{ t('nodata') }}</div>
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import { myBillApi } from 'src/api/order'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const {t} = useI18n()
type BillItem = {
  id: number
  uid: number
  oid: string
  num_f: string
  num: string
  num_a: string
  num_type: number
  type: number
  status: number
  addtime: string
  remark: string
  type_text: string
  color: string
}
const list = ref<BillItem[]>([])
const loading = ref(true)

const initData = async () => {
  loading.value = true
  const res = await myBillApi().finally(() => (loading.value = false))
  list.value = res.data.list
}

initData()
</script>

<style lang="scss" scoped></style>
