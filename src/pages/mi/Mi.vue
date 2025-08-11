<template>
  <q-page class="q-pa-md">
    <div class="flex items-center justify-center">
      <div class="center mr-1">
        <img src="~/assets/images/mi/title.png" alt="title" style="width: 22px; height: 22px" />
      </div>
      <div class="font-bold text-xl">Mi</div>
    </div>

    <div class="font-bold q-mt-md">ID de usuario:{{ userinfo?.username ?? '' }}</div>

    <Balance :data="userinfo" class="q-mt-md" />
    <ActionBtns class="q-mt-lg" />

    <div class="mt-7">
      <q-separator color="grey-7" />
    </div>
    <ActionList />
  </q-page>
</template>

<script setup lang="ts">
import { myIndexApi } from 'src/api';
import ActionBtns from './components/ActionBtns.vue';
import ActionList from './components/ActionList.vue';
import Balance from './components/Balance.vue';
import { ref } from 'vue';
import { UInfo } from './typings';

const userinfo = ref<UInfo>()

const initData = async () => {
  const res = await myIndexApi()
  userinfo.value = res.data.uInfo
}

initData()
</script>

<style lang="scss" scoped></style>
