<template>
  <q-page class="q-pa-md">
    <div class="flex items-center justify-center">
      <div class="center mr-1.5">
        <img src="~/assets/images/equipo/title.png" alt="title" style="width: 22px; height: 22px" />
      </div>
      <div class="font-bold text-xl">Equipo</div>
    </div>

    <Balance class="q-mt-md" :total-commission="data?.total_commission ?? 0" :total-people="data?.total_people ?? 0" />

    <div class="flex justify-between q-mt-md">
      <div class="w-[20%] q-mr-sm">
        <div class="font-medium">Invitar:</div>
          <div class="bg-[#25432B] rounded-lg px-3 py-1.5 font-bold text-base min-h-[36px] mt-1">{{ inviteCode }}</div>
          <div class="flex items-center justify-end mt-2" >
            <q-btn
              @click="copyTextNotify(inviteCode)"
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
      <div class="w-[77%]">
        <div class="font-medium">Invitar:</div>
        <!-- <div class="flex items-center q-px-sm py-2 justify-between mt-1 bg-[#222530] rounded-lg">
          <div class="flex-1 mr-2 text-[13px]">{{ inviteLink }}</div>
        </div> -->
        <div class="bg-[#25432B] rounded-lg px-3 py-1.5 font-bold text-base truncate mt-1">{{ inviteLink }}</div>
        <div class="flex items-center justify-end mt-2" >
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
    </div>

    <div class="mt-8">
      <div class="grid grid-cols-3 tab-box">
        <div class="text-center py-2 " :class="tab === 0 ? 'active' : ''" @click="tabClick(0)"> <div>Nivel de equipo</div> <div>1</div></div>
        <div class="text-center py-2 " :class="tab === 1 ? 'active' : ''" @click="tabClick(1)"> <div>Nivel de equipo</div> <div>2</div></div>
        <div class="text-center py-2 " :class="tab === 2 ? 'active' : ''" @click="tabClick(2)"> <div>Nivel de equipo</div> <div>3</div></div>
      </div>
      <template v-if="tab === 0">
        <div class="grid grid-cols-3 content-box">
          <div class="text-center py-4 cell-1-active"> <div>Recargar dinero</div> <div class="mt-2">{{ data?.yjczje ?? 0 }}</div></div>
          <div class="text-center py-4 cell-2"> <div>Total de personas</div> <div class="mt-2">{{ data?.xjy ?? 0 }}</div></div>
          <div class="text-center py-4 cell-3"> <div>Tasa de comisión</div> <div class="text-[#FCD43C] text-bold mt-2">{{ data?.site_y_rebate ?? '0' }}%</div></div>
        </div>
      </template>
      <template v-else-if="tab === 1">
        <div class="grid grid-cols-3 content-box">
        <div class="text-center py-4 cell-1"> <div>Recargar dinero</div> <div class="mt-2">{{ data?.ejczje ?? 0 }}</div></div>
        <div class="text-center py-4 cell-2-active"> <div>Total de personas</div> <div class="mt-2">{{ data?.xje ?? 0 }}</div></div>
        <div class="text-center py-4 cell-3"> <div>Tasa de comisión</div> <div class="text-[#FCD43C] text-bold mt-2">{{ data?.site_e_rebate ?? '0' }}%</div></div>
      </div>
      </template>
      <template v-else-if="tab === 2">
        <div class="grid grid-cols-3 content-box">
        <div class="text-center py-4 cell-1"> <div>Recargar dinero</div> <div class="mt-2">{{ data?.sjczje ?? 0 }}</div></div>
        <div class="text-center py-4 cell-2"> <div>Total de personas</div> <div class="mt-2">{{ data?.xjs ?? 0 }}</div></div>
        <div class="text-center py-4 cell-3-active"> <div>Tasa de comisión</div> <div class="text-[#FCD43C] text-bold mt-2">{{ data?.site_s_rebate ?? '0' }}%</div></div>
      </div>
      </template>
    </div>

    <!-- <div class="rounded-lg px-2 py-3 q-mt-md bg-[#222530]">
      <div class="text-center">Nivel de equipo 1</div>
      <q-separator color="grey-7" class="q-my-sm" />
      <div class="flex items-center justify-between no-wrap text-xs">
        <div class="text-center">
          <div>Recargar dinero</div>
          <div class="text-sm font-bold">
            <span>M$</span>
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
    </div> -->
    <!-- <div class="rounded-lg px-2 py-3 q-mt-md bg-[#222530]">
      <div class="text-center">Nivel de equipo 2</div>
      <q-separator color="grey-7" class="q-my-sm" />
      <div class="flex items-center justify-between no-wrap text-xs">
        <div class="text-center">
          <div>Recargar dinero</div>
          <div class="text-sm font-bold">
            <span>M$</span>
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
    </div> -->
    <!-- <div class="rounded-lg px-2 py-3 q-mt-md bg-[#222530]">
      <div class="text-center">Nivel de equipo 3</div>
      <q-separator color="grey-7" class="q-my-sm" />
      <div class="flex items-center justify-between no-wrap text-xs">
        <div class="text-center">
          <div>Recargar dinero</div>
          <div class="text-sm font-bold">
            <span>M$</span>
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
    </div> -->

    <div v-if="msg" class="bg-[#25432B] text-[13px] rounded-lg p-2 mt-8">
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

const tab = ref(0)
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

const tabClick = (index: number) => { 
  tab.value = index;
}
const initData = async () => {
  const res = await teamIndexApi()
  inviteCode.value = res.data.uinfo.invite_code
  data.value = res.data
  msg.value = res.data.msg
}

initData()
</script>

<style lang="scss" scoped>
  .tab-box{
    background: #25432B;
    border-radius: 0.5rem 0.5rem 0 0;
    .active{
      background: #669D5A;
      border-top: 2px solid #F6D042;
      border-left: 2px solid #F6D042;
      border-right: 2px solid #F6D042;
      border-radius: 0.5rem 0.5rem 0 0;
    }
  }
  .content-box{
        
    .cell-1{
      background: #669D5A;
      border-bottom: 2px solid #F6D042;
      border-left: 2px solid #F6D042;
      border-top: 2px solid #F6D042;
      border-radius: 0.5rem 0 0 0.5rem;
    }
    .cell-1-active{
      background: #669D5A;
      border-bottom: 2px solid #F6D042;
      border-left: 2px solid #F6D042;
      border-top: 2px solid transparent;
      border-radius: 0 0 0 0.5rem;
      // border-right: 2px solid #F6D042;
    }
    .cell-2{
      background: #669D5A;
      border-bottom: 2px solid #F6D042;
      // border-left: 2px solid #F6D042;
      border-top: 2px solid #F6D042;
      // border-right: 2px solid #F6D042;
    }
    .cell-2-active{
      background: #669D5A;
      border-bottom: 2px solid #F6D042;
      // border-left: 2px solid #F6D042;
      border-top: 2px solid transparent;
      // border-right: 2px solid #F6D042;
    }
    .cell-3{
      background: #669D5A;
      border-bottom: 2px solid #F6D042;
      border-top: 2px solid #F6D042;
      border-right: 2px solid #F6D042;
      border-radius: 0 0.5rem 0.5rem 0;
    }
     .cell-3-active{
      background: #669D5A;
      border-bottom: 2px solid #F6D042;
      border-top: 2px solid transparent;
      border-right: 2px solid #F6D042;
      border-radius: 0 0 0.5rem 0;
    }
  }
</style>
