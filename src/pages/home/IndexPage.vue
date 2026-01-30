<template>
  <q-page  class="q-pa-md">
    <div class="flex items-center justify-between">
      <!-- <q-avatar size="38px"   color="teal" >
        <img src="/logo.png" alt="logo" >
      </q-avatar> -->
      <div>
        <img src="/logo.png" alt="logo" width="150px">
      </div>

      <router-link to="/cs"  class=" a-nostyle flex items-center px-4 py-1 rounded-full " style="background-color: white;color: black;">
        <div class="center mr-2"><img src="~/assets/images/home/customer.png" alt="customer" style="width: 18px;" /></div>
        <div>{{ t('CS') }}</div>
      </router-link>
    </div>

    <Banner class="q-mt-xs" />
    <Information v-if="indexmsg" :msg="indexmsg"  class="mt-3" />
    <div class="h-1" v-else></div>
    <Balance class="mt-3" :data="uinfo" />
    <ActionBtns class="q-mt-md" />
    <ProdList :data="ginfo" class="q-mt-md" />
    <CSDialog :info="chat" :groupmsg="groupmsg"  />
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
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const indexmsg = ref('')
const uinfo = ref<UInfo>()
const ginfo = ref<GInfoItem[]>([])

const chat = ref<Chat | undefined>()
const groupmsg = ref<string>('')


const initData = async () => {
  const res = await indexApi()
  indexmsg.value = res.data.indexmsg
  uinfo.value = res.data.uinfo
  ginfo.value = res.data.ginfo
  chat.value = res.data.pinfo
  groupmsg.value = res.data.groupmsg
}

initData();

</script>

<style lang="scss" scoped>

</style>
