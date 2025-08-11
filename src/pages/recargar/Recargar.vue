<template>
  <BackWrap title="Recargar">
    <q-page class="q-pa-md">
      <div class="rounded-xl p-3 flex items-center justify-between bg-[#fcd33c12]" style="border: 1px solid #fcd33c">
        <div class="text-base">Mi saldo</div>

        <div class="text-secondary">
          <span>M$</span>
          <span class="font-bold text-lg">{{ balance }}</span>
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
          <span :class="{ 'text-white': activeMoney !== item }">M${{ item }}</span>
        </q-btn>
      </div>

      <div class="rounded-md px-3 py-2 flex items-center q-mt-md font-bold text-lg" style="border: 1px solid #feba1b">
        <div class="mr-2">M$</div>
        <input
          type="number"
          inputmode="numeric"
          v-model.number="activeMoney"
          class="border-none bg-transparent outline-none flex-1 w-10 text-white placeholder:text-gray-400"
          placeholder="Ingrese el monto de la recarga"
        />
      </div>

      <q-btn
        color="primary"
        text-color="black"
        unelevated
        class="full-width q-mt-lg q-mb-xs"
        no-caps
        style="font-size: 16px; border-radius: 8px; font-weight: bold"
        label="Enviar"
        :loading="loading"
        @click="submit"
      />
      <!-- <q-btn
        color="primary"
        outline
        unelevated
        class="full-width q-mt-sm"
        no-caps
        style="font-size: 16px; border-radius: 8px; font-weight: bold"
        @click="$router.push('/recargarusdt')"
      >
        <div class="flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/usdt.png" alt="usdt" width="20px" height="20px" />
          </div>
          <div>USDT Charging</div>
        </div>
      </q-btn> -->

      <div v-if="msg" class="bg-[rgba(255,255,255,0.05)] text-[13px] rounded-lg p-2 q-mt-md">
        <!-- <div class="flex items-center">
          <div class="mr-1 center"><q-icon name="error" size="15px" /></div>
          <div class="font-bold">{{ msg?.title ?? '' }}</div>
        </div> -->
        <div class="mt-1 html-content" v-html="msg?.content ?? ''"></div>
      </div>
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import { moneyRechargeApi, rechargeDoBeforeApi } from 'src/api/money'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref } from 'vue'
import { useWebView } from '../webview/webview'
import { useRouter } from 'vue-router'
import { baseApiUrl } from 'src/config/env.config'

type Msg = {
  id: number
  title: string
  content: string
  type: number
  addtime: number
  status: number
  author: string
}

const router = useRouter()

const balance = ref('')
const moneylist = ref<number[]>([])
const activeMoney = ref<number>()
const msg = ref<Msg>()
const loading = ref(false)

const submit = async () => {
  loading.value = true
  const res = await rechargeDoBeforeApi<{ url: string }>({ id: '', money: activeMoney.value }).finally(() => {
    loading.value = false
  })
  const tempUrl = res.data.url
  if (tempUrl.startsWith('http')) {
    return useWebView(router).goTo('Recargar', res.data.url)
  }
  return useWebView(router).goTo('Recargar', new URL(res.data.url ?? '', baseApiUrl).href)
}

const initData = async () => {
  const res = await moneyRechargeApi()
  balance.value = res.data.uinfo.balance
  moneylist.value = (res.data.moneylist ?? []).map((item: string) => Number(item))
  activeMoney.value = moneylist.value[0]
  msg.value = res.data.msg
}

initData()
</script>

<style lang="scss" scoped></style>
