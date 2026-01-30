<template>
  <BackWrap :title="t('Retirar')">
    <q-page class="q-pa-md">
      <div class="rounded-xl p-3 flex items-center justify-between bg-[#FF991A] text-white" style="border: 1px solid #fcd33c">
        <div class="text-base">{{ t('retirar1') }}</div>

        <div class="text-white">
          <span>{{ t('symbol') }}</span>
          <span class="font-bold text-lg">{{ balance }}</span>
        </div>
      </div>

      <div class="flex items-center q-mt-md">
        <div class="w-[2px] bg-primary h-[12px] mr-1"></div>
        <div class="font-medium text-[#020106]">{{ t('retirar2') }}</div>
      </div>

      <div class="input-bg p-3 flex items-center mt-3 font-bold text-[15px]" style="border: 1px solid #feba1b">
        <div class="mr-2 text-[#020106]">{{ t('symbol') }}</div>
        <input
          type="number"
          inputmode="numeric"
          v-model.number="amount"
          class="border-none bg-transparent outline-none flex-1 w-10 text-black placeholder:text-gray-400"
          :placeholder="t('retirar3')"
        />
      </div>

      <q-btn
        text-color="white"
        unelevated
        class="full-width q-mt-lg q-mb-xs btn-bg"
        no-caps
        style="font-size: 16px; border-radius: 8px; font-weight: bold"
        :label="t('Enviar')"
        :loading="loading"
        @click="submit"
      />

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
import { useQuasar } from 'quasar'
import { moneyWithdrawApi, moneyWithdrawDoApi } from 'src/api/money'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const {t} = useI18n()
const $q = useQuasar()

type Msg = {
  id: number
  title: string
  content: string
  type: number
  addtime: number
  status: number
  author: string
}

const balance = ref('')
const msg = ref<Msg>()
const amount = ref<number>()

const loading = ref(false)


const submit = async () =>{
  const amountTemp = (amount.value ?? 0)
  if (amountTemp <= 0) {
    return $q.notify({ message: t('submitTIps12'), type: 'negative' })
  }
  if (amountTemp > Number(balance.value)) {
    return $q.notify({ message: t('submitTIps13'), type: 'negative' })
  }
  loading.value =true

  await moneyWithdrawDoApi({
    money: amountTemp
  }).finally(() => loading.value =false)

   $q.notify({
    type: 'positive',
    message: t('submitTIps3')
  })

  initData()

}

const initData = async () => {
  const res = await moneyWithdrawApi()
  balance.value = res.data.uinfo.yongj
  // moneylist.value = (res.data.moneylist ?? []).map((item: string) => Number(item))
  // activeMoney.value = moneylist.value[0]
  msg.value = res.data.msg
}

initData()
</script>

<style lang="scss" scoped>
.input-bg{
  background-color: white;
  border: 2px solid rgba(213, 213, 213, 0.562);
  border-radius: 6px;
}
</style>
