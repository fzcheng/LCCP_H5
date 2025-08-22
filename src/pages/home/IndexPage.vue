<template>
  <q-page >
    <div class="flex items-center justify-between bg-[#194232] q-pa-md">
      <q-avatar size="38px"   color="teal" >
        <img src="/logo.png" alt="logo" >
      </q-avatar>

      <router-link to="/cs"  class=" a-nostyle flex items-center px-4 py-1 rounded-full " style="background: #14643D;">
        <div class="center mr-2"><img src="~/assets/images/home/customer.png" alt="customer" style="width: 18px;" /></div>
        <div>CS</div>
      </router-link>
    </div>
    <div class="q-pa-md">
      <Banner />
      <Information v-if="indexmsg" :msg="indexmsg"  class="mt-3" />
      <div class="h-1" v-else></div>
      <div class="border-2 border-[#FFC31A] rounded-xl" style="background:linear-gradient(to bottom, #25432B 0%, #25432B 70% ,#FFC31A 75%,#FFC31A 100%);">
        <ActionBtns class="q-mt-md" />
        <Balance class="mt-3" :data="uinfo" />
      </div>
      <ProdList :data="ginfo" class="q-mt-md" />
      <CSDialog :info="chat" :groupmsg="groupmsg"  />
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { indexApi } from 'src/api/index';
import ActionBtns from './components/ActionBtns.vue';
import Balance from './components/Balance.vue';
import Banner from './components/Banner.vue';
import Information from './components/Information.vue';
import ProdList from './components/ProdList.vue';
import { ref } from 'vue';
import { Chat, GInfoItem, UInfo } from './typings';
import CSDialog from './components/CSDialog.vue';

const indexmsg = ref('')
const uinfo = ref<UInfo>()
const ginfo = ref<GInfoItem[]>([])

const chat = ref<Chat | undefined>()
const groupmsg = ref<string>('')


const initData = async () => {
  const res = await indexApi()
  indexmsg.value = res.data.indexmsg
  uinfo.value = res.data.uinfo
  ginfo.value = analysisGoods(res.data.ginfo)
  chat.value = res.data.pinfo
  groupmsg.value = res.data.groupmsg
}

const analysisGoods = (goods: GInfoItem[]) => {
  const index = goods.findIndex(item => item.balance_goods_status == 1);
  if (index > 0) {
    return goods.slice(index - 1);
  } else if (index === 0) {
    // 如果第一个元素就满足条件，返回整个数组
    return goods;
  }
  // 如果没找到，返回整个数组
  return goods;
};

initData();

</script>

<style lang="scss" scoped>

</style>
