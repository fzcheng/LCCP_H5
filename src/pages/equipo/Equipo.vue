<template>
  <q-page class="q-pa-md">
    <div class="flex items-center justify-center">
      <div class="center mr-1.5">
        <img src="~/assets/images/equipo/title.png" alt="title" style="width: 22px; height: 22px" />
      </div>
      <div class="font-bold text-xl">Equipo</div>
    </div>

    <div>
      <div class="font-medium">Invitar:</div>
      <div class="flex items-center justify-between mt-1">
        <div class="bg-[#222530] rounded-lg px-3 py-1.5 font-bold text-base min-h-[36px]">{{ inviteCode }}</div>
        <q-btn
          @click="copyTextNotify(inviteCode)"
          color="primary"
          class="q-mr-sm"
          text-color="black"
          padding="xs 12px"
          style="border-radius: 6px"
          size="sm"
          no-caps
          label="Copiar"
        />
      </div>
    </div>
    <div class="q-mt-sm">
      <div class="font-medium">Invitar:</div>
      <div class="flex items-center q-px-sm py-2 justify-between mt-1 bg-[#222530] rounded-lg">
        <div class="flex-1 w-20 mr-2 text-[13px]">{{ inviteLink }}</div>
        <q-btn
          @click="copyTextNotify(inviteLink)"
          color="primary"
          text-color="black"
          padding="xs 12px"
          style="border-radius: 6px"
          size="sm"
          no-caps
          label="Copiar"
        />
      </div>
    </div>

    <Balance class="q-mt-md" :total-commission="data?.total_commission ?? 0" :total-people="data?.total_people ?? 0" />

    <div class="rounded-lg px-2 py-3 q-mt-md bg-[#222530]">
      <div class="text-center">Nivel de equipo 1</div>
      <q-separator color="grey-7" class="q-my-sm" />
      <div class="flex items-center justify-between no-wrap text-xs">
        <div class="text-center">
          <div>Recargar dinero</div>
          <div class="text-sm font-bold">
            <span>m$</span>
            <span class="text-lg">{{ data?.yjczje ?? 0 }}</span>
          </div>
        </div>
        <div class="text-center">
          <div>Total de personas</div>
          <div class="text-lg font-bold">{{ data?.xjy ?? 0 }}</div>
        </div>
        <div class="text-center">
          <div>Tasa de comisión</div>
          <div class="text-lg font-bold text-secondary">{{ data?.site_y_rebate ?? '0' }}%</div>
        </div>
      </div>
    </div>
    <div class="rounded-lg px-2 py-3 q-mt-md bg-[#222530]">
      <div class="text-center">Nivel de equipo 2</div>
      <q-separator color="grey-7" class="q-my-sm" />
      <div class="flex items-center justify-between no-wrap text-xs">
        <div class="text-center">
          <div>Recargar dinero</div>
          <div class="text-sm font-bold">
            <span>m$</span>
            <span class="text-lg">{{ data?.ejczje ?? 0 }}</span>
          </div>
        </div>
        <div class="text-center">
          <div>Total de personas</div>
          <div class="text-lg font-bold">{{ data?.xje ?? 0 }}</div>
        </div>
        <div class="text-center">
          <div>Tasa de comisión</div>
          <div class="text-lg font-bold text-secondary">{{ data?.site_e_rebate ?? 0 }}%</div>
        </div>
      </div>
    </div>
    <div class="rounded-lg px-2 py-3 q-mt-md bg-[#222530]">
      <div class="text-center">Nivel de equipo 3</div>
      <q-separator color="grey-7" class="q-my-sm" />
      <div class="flex items-center justify-between no-wrap text-xs">
        <div class="text-center">
          <div>Recargar dinero</div>
          <div class="text-sm font-bold">
            <span>m$</span>
            <span class="text-lg">{{ data?.sjczje ?? 0 }}</span>
          </div>
        </div>
        <div class="text-center">
          <div>Total de personas</div>
          <div class="text-lg font-bold">{{ data?.xjs ?? 0 }}</div>
        </div>
        <div class="text-center">
          <div>Tasa de comisión</div>
          <div class="text-lg font-bold text-secondary">{{ data?.site_s_rebate ?? 0 }}%</div>
        </div>
      </div>
    </div>

    <div v-if="msg" class="bg-[#222530] text-[13px] rounded-lg p-2 q-mt-md">
        <!-- <div class="flex items-center">
          <div class="mr-1 center"><q-icon name="error" size="15px" /></div>
          <div class="font-bold">{{ msg?.title ?? '' }}</div>
        </div> -->
        <div class="mt-1 html-content" v-html="msg?.content ?? ''"></div>
      </div>
  </q-page>
</template>

<script setup lang="ts">
import { copyTextNotify } from 'src/utils/copy'
import Balance from './components/Balance.vue'
import { teamIndexApi } from 'src/api'
import { computed, ref } from 'vue'

type Msg = {
  id: number
  title: string
  content: string
  type: number
  addtime: number
  status: number
  author: string
}

const msg = ref<Msg>()
const inviteCode = ref('')
const inviteLink = computed(() => {
  return `${location.origin}/register?invite=${inviteCode.value}`
})

type ResType = {
  controllerName: string
  currency: string
  url: string
  rwlist: null
  yjczje: number
  ejczje: number
  sjczje: number
  xjy: number
  xje: number
  xjs: number
  nozeroPeople: number
  vipyqCon: number
  vipyqlist_m: never[]
  vipyqlist_m_all: number
  total_commission: number
  total_people: number
  site_y_rebate: string
  site_e_rebate: string
  site_s_rebate: string
  team: string
  codeLink: string
  copy: string
  TotalCommission: string
  TotalPeople: string
  teamLevel1: string
  rechargeMoney: string
  CommissionRate: string
  teamLevel2: string
  teamLevel3: string
  success: string
}

const data = ref<ResType>()

const initData = async () => {
  const res = await teamIndexApi()
  inviteCode.value = res.data.uinfo.invite_code
  data.value = res.data
  msg.value = res.data.msg
}

initData()
</script>

<style lang="scss" scoped></style>
