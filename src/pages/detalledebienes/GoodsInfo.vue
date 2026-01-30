<template>
  <BackWrap :title="t('goodsInfo1')">
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

      <div class="text-base font-medium q-mt-md text-center text-main">
        {{ info?.goods_name ?? '' }}
      </div>
      <div class="text-lg font-bold text-center text-[#FF9600]">{{ t('symbol') }} {{ info?.goods_price ?? '0' }}</div>

      <div class="flex flex-col gap-3 q-mt-md">
        <!-- 每日收益 -->
        <div class="bg-[#FFF8E7] rounded-lg p-4 flex items-center justify-center shadow-sm">
          <!-- <div class="flex-1 text-center border-r border-[#FF9600]">
            <div class="text-xl font-bold text-[#FF9600]">{{ t('symbol') }}{{ info?.day_send_money ?? '0.00' }}</div>
            <div class="text-xs text-[#370000] font-medium">{{ t('goodsInfo2') }}</div>
          </div> -->
          <div class="flex-1 text-center">
            <div class="text-xl font-bold text-[#FF9600]">{{ t('symbol') }}{{ info?.day_income ?? '0.00' }}</div>
            <div class="text-xs text-[#370000] font-medium">{{ t('goodsInfo2') }}</div>
          </div>
        </div>

        <!-- 剩余产品数量 -->
        <div class="bg-[#FFF8E7] rounded-lg px-4 py-3 flex items-center justify-between shadow-sm">
          <div class="text-sm font-bold text-[#370000]">{{ t('goodsInfo11') }}</div>
          <div class="text-lg font-bold text-[#FF9600]">{{ info?.buy_num ?? '0' }}</div>
        </div>

        <!-- 返佣比例 -->
        <div v-if="rebateList.length > 0" class="bg-[#FFF8E7] rounded-lg p-4 flex flex-col shadow-sm">
          <div
            v-for="(item, index) in rebateList"
            :key="index"
            class="flex items-center justify-between"
            :class="{
              'pb-3': index === 0 && rebateList.length > 1,
              'py-3': index > 0 && index < rebateList.length - 1,
              'pt-3': index === rebateList.length - 1 && rebateList.length > 1
            }"
            :style="index < rebateList.length - 1 ? 'border-bottom: 1px dashed #a0937d' : ''"
          >
            <div class="text-sm font-bold text-[#370000]">{{ item.label }}</div>
            <div class="text-lg font-bold text-[#FF9600]">{{ item.value }}%</div>
          </div>
        </div>
      </div>

      <q-btn
        no-caps
        class="full-width q-mt-lg btn-bg"
        style="border-radius: 8px; font-weight: bold"
        padding="sm"
        :label="t('goodsInfo6')"
        text-color="white"
        :loading="loading"
        unelevated
        @click="submit"
      />
      <div v-if="info?.kgm_num && info?.kgm_num > 1" class="text-red mt-1">{{ t('buytip1') }}</div>
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { goodsInfoApi } from 'src/api'
import { goodsBuyorderApi } from 'src/api/order'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'


const {t} = useI18n()
const $q = useQuasar()

const rebateList = computed(() => {
  const list = []
  const i = info.value
  if (!i) return []

  // Check if site_y_rebate is valid (not 0, not empty)
  if (i.site_y_rebate && Number(i.site_y_rebate) > 0) {
    list.push({ label: t('goodsInfo8'), value: i.site_y_rebate })
  }
  // Check if site_e_rebate is valid
  if (i.site_e_rebate && Number(i.site_e_rebate) > 0) {
    list.push({ label: t('goodsInfo9'), value: i.site_e_rebate })
  }
  // Check if site_s_rebate is valid
  if (i.site_s_rebate && Number(i.site_s_rebate) > 0) {
    list.push({ label: t('goodsInfo10'), value: i.site_s_rebate })
  }
  return list
})

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
  day_send_money: string
}

const info = ref<GoodInfo>()

const loading = ref(false)
const submit = async () => {
  loading.value = true
  await goodsBuyorderApi({ id }).finally(() => (loading.value = false))
  $q.notify({
    type: 'positive',
    message: t('submitTIps5')
  })
}

const initData = async () => {
  const res = await goodsInfoApi({ id })
  info.value = res.data.info
}

initData()
</script>

<style lang="scss" scoped>
.bg{
  color: #a0937d;
}
</style>
