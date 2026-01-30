<template>
  <BackWrap :title="t('Recargar')">
    <q-page class="q-pa-md">
      <div class="rounded-xl p-3 flex items-center justify-between bg-[#FF991A] text-white" style="border: 1px solid #fcd33c">
        <div class="text-base">{{ t('recargar1') }}</div>

        <div class="text-white">
          <span>{{ t('symbol') }}</span>
          <span class="font-bold text-lg">{{ balance }}</span>
        </div>
      </div>
      <div class="flex items-center q-mt-md">
        <div class="w-[2px] bg-primary h-[12px] mr-1"></div>
        <div class="font-medium text-[#020106]">{{ t('buytip2') }}</div>
      </div>

      <div class="grid grid-flow-row grid-cols-3 gap-3 q-mt-sm">
        <q-btn
          class="full-width"
          v-for="item in channel"
          :key="item"
          :class="activeChannel === item ? 'tab-active':'tab'"
          no-caps
          unelevated
          padding="10px xs"
          @click="activeChannel = item"
        >
          <span>{{ item }}</span>
        </q-btn>
      </div>
      <div class="flex items-center q-mt-md">
        <div class="w-[2px] bg-primary h-[12px] mr-1"></div>
        <div class="font-medium text-[#020106]">{{ t('recargar2') }}</div>
      </div>

      <div class="grid grid-flow-row grid-cols-3 gap-3 q-mt-sm">
        <q-btn
          class="full-width"
          :class="activeMoney === item ? 'tab-active':'tab'"
          v-for="item in moneylist"
          :key="item"
          no-caps
          unelevated
          padding="10px xs"
          @click="activeMoney = item"
        >
          <span >{{ t('symbol') }}{{ item }}</span>
        </q-btn>
      </div>

      <div class="input-bg px-3 py-2 flex items-center q-mt-md font-bold text-lg">
        <div class="mr-2 text-[#020106]">{{ t('symbol') }}</div>
        <input
          type="number"
          inputmode="numeric"
          v-model.number="activeMoney"
          class="border-none bg-transparent outline-none flex-1 w-10 text-[#020106] placeholder:text-gray-400"
          :placeholder="t('recargar3')"
        />
      </div>

      <q-btn
        text-color="White"
        unelevated
        class="full-width q-mt-lg q-mb-xs"
        no-caps
        style="font-size: 16px; border-radius: 8px; font-weight: bold;background-color: #FFA81A;"
        :label="t('Enviar')"
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

      <div v-if="msg" class="box-main text-[#370000] text-[13px] rounded-lg p-2 q-mt-md">
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
import { useI18n } from 'vue-i18n'

const {t} = useI18n()
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
// const channel = ref<string[]>(['Qris','VA'])
// const activeChannel = ref<string>('Qris')
const channel = ref<string[]>(['EWallet'])
const activeChannel = ref<string>('EWallet')
const moneylist = ref<number[]>([])
const activeMoney = ref<number>()
const msg = ref<Msg>()
const loading = ref(false)

const submit = async () => {
  loading.value = true
  const res = await rechargeDoBeforeApi<{ url: string }>({ id: '', money: activeMoney.value ,bank_name:activeChannel.value}).finally(() => {
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

<style lang="scss" scoped>
.tab{
  background-color: white;
  border: 2px solid rgba(213, 213, 213, 0.562);
  border-radius: 6px;
  color: black;
}
.tab-active{
  background-color: #FEF2F2;
  border: 2px solid red;
  border-radius: 6px;
  color: red;
}
.input-bg{
  background-color: white;
  border: 2px solid rgba(213, 213, 213, 0.562);
  border-radius: 6px;
}
</style>
