<template>
  <BackWrap title="Factura">
    <q-page class="q-pa-md">
      <div class="space-y-3">
        <div v-for="item in list" :key="item.id" class="bg-[#25432B] rounded-md p-3">
          <div class="flex justify-between items-center">
            <div class="font-bold text-base" :style="{color: item.color}">M${{ BigNumber(item.num).toFixed(1, BigNumber.ROUND_DOWN) }}</div>
            <div>{{ item.type_text }}</div>
          </div>
          <div class="flex justify-between items-center text-[13px] mt-1">
            <div class="text-[#9E9E9E]">Tiempo</div>
            <div>{{ dayjs(item.addtime).format('DD/MM/YYYY HH:mm:ss') }}</div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="center py-10">
        <q-spinner color="primary" size="3rem" />
      </div>
      <div v-else-if="!list.length" class="h-20 center text-gray-400">Aún no hay datos</div>
      <template v-else>
        <!-- <div class="flex justify-center mt-2"> -->
          <q-footer class="footer flex justify-center">
            <q-pagination
              v-model="current"
              class="my-1"
              :max="total"
              :max-pages="5"
              size="13px"
              direction-links
              flat
              color="grey"
              active-color="primary"
            />
          </q-footer>

        <!-- </div> -->

      </template>
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import { myBillApi } from 'src/api/order'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref,watch  } from 'vue'

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
const current = ref(1)
const total = ref(0)
const size = ref(10)

watch(current, () => {
  list.value = []
  initData()
})
const initData = async () => {
  loading.value = true
  const res = await myBillApi({page:current.value,size:size.value}).finally(() => (loading.value = false))
  list.value = res.data.list
  total.value = Math.ceil(res.data.count / size.value) 
}

initData()
</script>

<style lang="scss" scoped>
.footer {
  background: #14643D;
  background-size: 100% 100%;
}
</style>
