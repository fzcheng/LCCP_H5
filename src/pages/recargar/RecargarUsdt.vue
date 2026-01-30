<template>
  <BackWrap title="Recargar">
    <q-page class="q-pa-md">
      <div class="rounded-lg px-3 pt-6 pb-4 bg-[#222530]">
        <div class="flex justify-center">
          <img :src="qrcodeUrl" alt="qrcodeUrl" width="120px" height="120px" class="block" />
        </div>
        <div class="font-bold q-mt-md">Tipo de canal: {{ tdType }}</div>
        <div class="flex items-center text-xs mt-1.5" @click="copyTextNotify(address,t)">
          <div>Dirección :</div>
          <div class="flex-1 w-10">{{ address }}</div>
          <div class="center"><q-icon name="content_copy" /></div>
        </div>
      </div>

      <div class="flex items-center q-mt-md">
        <div class="w-[2px] bg-primary h-[12px] mr-1"></div>
        <div class="font-medium">Recarga de saldo</div>
      </div>

      <div class="grid grid-flow-row grid-cols-3 gap-3 q-mt-sm">
        <q-btn
          class="full-width"
          v-for="item in moneylist"
          :key="item"
          style="border-radius: 6px; font-size: 15px; font-weight: 700"
          color="primary"
          :text-color="activeMoney === item ? 'black' : undefined"
          no-caps
          unelevated
          :outline="activeMoney !== item"
          padding="10px xs"
          @click="activeMoney = item"
        >
          <span :class="{ 'text-white': activeMoney !== item }">EGP{{ item }}</span>
        </q-btn>
      </div>

      <div class="rounded-md p-3 flex items-center q-mt-md font-bold text-lg" style="border: 1px solid #feba1b">
        <div class="mr-2">EGP</div>
        <input
          type="number"
          inputmode="numeric"
          v-model.number="activeMoney"
          class="border-none bg-transparent outline-none flex-1 w-10 text-white placeholder:text-gray-400"
          placeholder="Ingrese el monto de la recarga"
        />
      </div>

      <div class="text-primary mt-1 text-[13px]">
        Tipo de cambio: {{ usdtrate }},Debe pagar:
        <span class="text-[#FC0000]">{{ pagar }}</span>
      </div>

      <q-btn
        color="primary"
        text-color="black"
        unelevated
        class="full-width q-mt-md q-mb-xs"
        no-caps
        style="font-size: 16px; border-radius: 8px; font-weight: bold"
        label="Enviar"
      />

      <div v-if="msg" class="bg-[rgba(255,255,255,0.05)] text-[13px] rounded-lg p-2 q-mt-md">
        <div class="flex items-center">
          <div class="mr-1 center"><q-icon name="error" size="15px" /></div>
          <div class="font-bold">{{ msg?.title ?? '' }}</div>
        </div>
        <div class="mt-1 html-content" v-html="msg?.content ?? ''"></div>
      </div>
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import QRCode from 'qrcode'
import { computed, onMounted, onUpdated, ref, useTemplateRef } from 'vue'
import { copyTextNotify } from 'src/utils/copy'
import { moneyRechargeUsdtApi } from 'src/api/money'
import { BigNumber } from 'bignumber.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const address = ref('')

const qrcodeUrl = ref('')
type Msg = {
  id: number
  title: string
  content: string
  type: number
  addtime: number
  status: number
  author: string
}

const moneylist = ref<number[]>([])
const activeMoney = ref<number>()
const msg = ref<Msg>()
const tdType = ref('TRC20')
const usdtrate = ref(0)

const pagar = computed(() => {
  if (!activeMoney.value) return 0;
  if (activeMoney.value <= 0) return 0;
  if (usdtrate.value <= 0) return 0;
  return BigNumber(activeMoney.value).div(usdtrate.value)
})

const initData = async () => {
  const res = await moneyRechargeUsdtApi()
  qrcodeUrl.value = res.data.qrCode
  tdType.value = res.data.tdType
  address.value = res.data.address_url
  usdtrate.value = res.data.usdtrate
  moneylist.value = (res.data.moneylist ?? []).map((item: string) => Number(item))
  activeMoney.value = moneylist.value[0]
  msg.value = res.data.msg
}

initData()
</script>

<style lang="scss" scoped></style>
