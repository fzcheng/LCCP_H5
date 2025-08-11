<template>
  <BackWrap title="Detalle de bienes">
    <q-page class="q-pa-md">
      <div class="flex justify-center items-center">
        <q-img
          :src="info?.goods_pic ?? ''"
          :ratio="1"
          spinner-color="primary"
          spinner-size="28px"
          width="140px"
          height="140px"
          style="border-radius: 8px"
          fit="cover"
        />
      </div>

      <div class="text-base font-medium q-mt-md">
        {{ info?.goods_name ?? '' }}
      </div>
      <div class="text-lg font-bold text-primary">M${{ info?.goods_price ?? '0' }}</div>

      <div class="grid grid-cols-2 grid-flow-row gap-4 q-mt-md">
        <div class="bg-[#222530] rounded-md text-center px-2 py-3 min-h-[68px]">
          <div class="text-base font-bold text-primary">M${{ info?.day_income ?? '0' }}</div>
          <div class="text-[13px]">Ingreso por día</div>
        </div>
        <div class="bg-[#222530] rounded-md text-center px-2 py-3 min-h-[68px]">
          <div class="text-base font-bold text-primary">M${{ info?.total_income ?? '0' }}</div>
          <div class="text-[13px]">Ingreso total</div>
        </div>
        <div class="bg-[#222530] rounded-md text-center px-2 py-3 min-h-[68px]">
          <div class="text-base font-bold text-primary">{{ info?.effective_time ?? '0' }} Días</div>
          <div class="text-[13px]">Días de inversión</div>
        </div>
        <div class="bg-[#222530] rounded-md text-center px-2 py-3 min-h-[68px]">
          <div class="text-base font-bold text-primary">{{ info?.buy_num ?? '0' }}</div>
          <div class="text-[13px]">Cantidad invertible</div>
        </div>
      </div>

      <q-btn
        color="primary"
        no-caps
        class="full-width q-mt-lg"
        style="border-radius: 8px; font-weight: bold"
        padding="sm"
        label="Invertir ahora"
        text-color="black"
        :loading="loading"
        unelevated
        @click="submit"
      />
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { goodsInfoApi } from 'src/api'
import { goodsBuyorderApi } from 'src/api/order'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const $q = useQuasar()

const route = useRoute()
const id = Number((route.query.id as string) || '0')

type GoodInfo = {
  id: number
  goods_name: string
  goods_info: string
  goods_price: string
  v_id: number
  hourly_income: string
  day_income: string
  effective_time: number
  total_income: number
  buy_num: number
  goods_pic: string
  goods_num: number
  yg_num: number
  goods_sort: number
  addtime: number
  status: number
  ys: number
  cid: number
  is_kyd: number
  kydnum: number
  kydnum_amount: string
  site_y_rebate: string
  site_e_rebate: string
  site_s_rebate: string
  kgm_num: number
}

const info = ref<GoodInfo>()

const loading = ref(false)
const submit = async () => {
  loading.value = true
  await goodsBuyorderApi({ id }).finally(() => (loading.value = false))
  $q.notify({
    type: 'positive',
    message: 'Compra exitosa'
  })
}

const initData = async () => {
  const res = await goodsInfoApi({ id })
  info.value = res.data.info
}

initData()
</script>

<style lang="scss" scoped></style>
