<template>
  <BackWrap :title="t('mi3')">
    <q-page class="q-pa-md">
      <div class="bg-[#222530] rounded-md">
        <div v-for="(item, index) in list" :key="item.id">
          <div class="p-3 flex items-center justify-between">
            <div class="">
              <div class="font-bold text-[15px]">{{ item.pay_name }}</div>
              <div class="text-[13px] mt-1 text-[#9E9E9E]">{{ dayjs(item.addtime).format('DD/MM/YYYY HH:mm:ss') }}</div>
            </div>
            <div>
              <div class="text-[#7EFF98] text-base font-bold text-right">+ {{ item.num }} {{ t('symbol') }}</div>
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

const initData = async () => {
  loading.value = true
  const res = await myRechargeRecordsApi().finally(() => (loading.value = false))
  list.value = res.data.list
}

initData()
</script>

<style lang="scss" scoped></style>
