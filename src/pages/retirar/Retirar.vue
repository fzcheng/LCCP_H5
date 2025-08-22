<template>
  <BackWrap title="Retirar">
    <q-page class="q-pa-md">
      <div class="rounded-xl p-3 flex items-center justify-between bg-[#644914]" style="border: 1px solid #fcd33c">
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
        <q-btn
          color="primary"
          text-color="black"
          unelevated
          class=""
          no-caps
          style="font-size: 13px; border-radius: 8px; font-weight: bold;padding:0 10px;"
          label="ALL"
          @click="getAll()"
        />
      </div>
      <div class="text-[13px] font-bold mt-3">
        <div class="flex item-center">{{ `Retiro VIP: ${withdraw_quota} ` }}
          <div class="center">
            <img 
              src="~/assets/images/public/gan.png"
              alt="Close" 
              style="width: 15px;margin-left: 5px;"
              @click="showIncome()"
            />
          </div>
        </div>
        <div class="flex item-center mt-1">{{ `Retiro Retiro promo: ${yongj} ` }}
          <div class="center">
            <img 
              src="~/assets/images/public/gan.png"
              alt="Close" 
              style="width: 15px;margin-left: 5px;"
              @click="showRebate()"
            />
          </div>
        </div>
      </div>
      <div class="text-[13px] mt-3 text-white">
        <div>{{ ginfo?.goods_name }}</div>
        <!-- <div class="mt-1">{{ `Comisión 1er nivel: ${!ginfo?.site_y_rebate ? '0%' : ginfo.site_y_rebate+ '%'}` }}</div>
        <div class="mt-1">{{ `Comisión 2do nivel: ${!ginfo?.site_e_rebate ? '0%' : ginfo.site_e_rebate+ '%'}` }}</div>
        <div class="mt-1">{{ `Comisión 3er nivel: ${!ginfo?.site_s_rebate ? '0%' : ginfo.site_s_rebate+ '%'}` }}</div> -->
        <div class="mt-1">{{ `Comisión 1er nivel: ${!ginfo?.recharge_y_rebate ? '0%' : ginfo.recharge_y_rebate+ '%'}` }}</div>
        <div class="mt-1">{{ `Comisión 2do nivel: ${!ginfo?.recharge_e_rebate ? '0%' : ginfo.recharge_e_rebate+ '%'}` }}</div>
        <div class="mt-1">{{ `Comisión 3er nivel: ${!ginfo?.recharge_s_rebate ? '0%' : ginfo.recharge_s_rebate+ '%'}` }}</div>
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

      <div v-if="msg" class="bg-[#25432B] text-[13px] rounded-lg p-2 q-mt-md">
        <!-- <div class="flex items-center">
          <div class="mr-1 center"><q-icon name="error" size="15px" /></div>
          <div class="font-bold">{{ msg?.title ?? '' }}</div>
        </div> -->
        <div class="mt-1 html-content" v-html="msg?.content ?? ''"></div>
      </div>
    </q-page>
  </BackWrap>
  <IncomeDetail ref="IncomeDetailRef"/>
  <RebateDetail ref="RebateDetailRef"/>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { moneyWithdrawApi, moneyWithdrawDoApi } from 'src/api/money'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref } from 'vue'
import IncomeDetail from './IncomeDetail.vue'
import RebateDetail from './RebateDetail.vue'
import { GInfoItem } from '../home/typings'

const IncomeDetailRef = ref()
const RebateDetailRef = ref()
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
const withdraw_quota = ref('')
const yongj = ref('')
const msg = ref<Msg>()
const amount = ref<number>()
const gList = ref<GInfoItem[]>([])
const ginfo = ref<GInfoItem>()
const loading = ref(false)
const withdraw_money = ref('')

const submit = async () =>{
  const amountTemp = (amount.value ?? 0)
  if (amountTemp <= 0) {
    return $q.notify({ message: 'Ingrese el monto de la retiro', type: 'negative' })
  }
  if (amountTemp > Number(withdraw_money.value)) {
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

const getAll = ()=>{
  amount.value = parseInt(withdraw_money.value) 
}
const showIncome= () =>{
  IncomeDetailRef.value.show(ginfo.value)
}

const showRebate = () =>{ 
  RebateDetailRef.value.show(gList.value)
}
const initData = async () => {
  const res = await moneyWithdrawApi()
  // balance.value = res.data.uinfo.yongj
  // moneylist.value = (res.data.moneylist ?? []).map((item: string) => Number(item))
  // activeMoney.value = moneylist.value[0]
  balance.value = res.data.uinfo.send_money
  withdraw_money.value = res.data.uinfo.withdraw_money
  withdraw_quota.value = res.data.uinfo.withdraw_quota
  yongj.value = res.data.uinfo.yongj
  msg.value = res.data.msg
  gList.value = res.data.glist
  ginfo.value = res.data.ginfo
}

initData()
</script>

<style lang="scss" scoped></style>
