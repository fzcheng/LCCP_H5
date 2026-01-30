<template>
  <BackWrap :title="t('mi3')">
    <q-page class="q-pa-md">
      <div class="box-main rounded-md">
        <div v-for="(item, index) in list" :key="item.id">
          <div class="p-3 flex items-center justify-between">
            <div class="">
              <div class="font-bold text-[15px] text-main">{{ item.pay_name }}</div>
              <div class="text-[13px] mt-1 text-[#9E9E9E]">{{ dayjs(item.addtime).format('DD/MM/YYYY HH:mm:ss') }}</div>
            </div>
            <div>
              <div class="text-[#00961C] text-base font-bold text-right">+ {{ item.num }} {{ t('symbol') }}</div>
              <div v-if="item.status_text" :style="{color: item.color}" class="text-right text-[13px]">{{ item.status_text }}</div>
            </div>
          </div>
          <div v-if="(index + 1) !== list.length" class="bg-[rgba(255,255,255,0.12)] h-[1px]"></div>
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
import dayjs from 'dayjs'
import { myRechargeRecordsApi } from 'src/api/order'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const {t} = useI18n()
const loading = ref(true)

type Log = {
  id: number
  oid: string
  uid: number
  tel: string
  num: string
  real_num: string
  usdtimg: string
  address: null
  addtime: number
  endtime: number
  status: number
  pay_name: string
  pay_status: number
  pay_money?: number
  status_text: string
  color: string
}
const list = ref<Log[]>([])
// const list = ref<Log[]>([
//   {
//     id: 1,
//     oid: 'ORD123456789',
//     uid: 1001,
//     tel: '13800138000',
//     num: '100.00',
//     real_num: '100.00',
//     usdtimg: '',
//     address: null,
//     addtime: 1678888888000,
//     endtime: 1678899999000,
//     status: 1,
//     pay_name: 'USDT Recharge',
//     pay_status: 1,
//     pay_money: 100,
//     status_text: 'Success',
//     color: '#7EFF98'
//   },
//   {
//     id: 2,
//     oid: 'ORD987654321',
//     uid: 1001,
//     tel: '13800138000',
//     num: '50.00',
//     real_num: '50.00',
//     usdtimg: '',
//     address: null,
//     addtime: 1678999999000,
//     endtime: 0,
//     status: 0,
//     pay_name: 'Bank Transfer',
//     pay_status: 0,
//     pay_money: 50,
//     status_text: 'Pending',
//     color: '#FFD700'
//   }
// ])

const initData = async () => {
  loading.value = false // true
  const res = await myRechargeRecordsApi().finally(() => (loading.value = false))
  list.value = res.data.list
}

initData()
</script>

<style lang="scss" scoped></style>
