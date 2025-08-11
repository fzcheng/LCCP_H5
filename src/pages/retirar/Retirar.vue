<template>
  <BackWrap title="Retirar">
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
        <div class="font-medium">Retiro de saldo</div>
      </div>

      <div class="rounded-md p-3 flex items-center mt-3 font-bold text-[15px]" style="border: 1px solid #feba1b">
        <div class="mr-2">M$</div>
        <input
          type="number"
          inputmode="numeric"
          v-model.number="amount"
          class="border-none bg-transparent outline-none flex-1 w-10 text-white placeholder:text-gray-400"
          placeholder="Ingrese el monto del retiro"
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
import { useQuasar } from 'quasar'
import { moneyWithdrawApi, moneyWithdrawDoApi } from 'src/api/money'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref } from 'vue'

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
    return $q.notify({ message: 'Ingrese el monto de la retiro', type: 'negative' })
  }
  if (amountTemp > Number(balance.value)) {
    return $q.notify({ message: 'Saldo insuficiente', type: 'negative' })
  }
  loading.value =true

  await moneyWithdrawDoApi({
    money: amountTemp
  }).finally(() => loading.value =false)

   $q.notify({
    type: 'positive',
    message: 'Se ha enviado la solicitud de retiro'
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

<style lang="scss" scoped></style>
