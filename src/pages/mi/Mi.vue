<template>
  <q-page class="q-pa-md">
    <div class="flex items-center justify-between">
      <div class="w-1/3"></div>
      <div class="flex items-center justify-center w-1/3">
        <div class="center mr-1">
          <img src="~/assets/images/mi/title.png" alt="title" style="width: 22px; height: 22px" />
        </div>
        <div class="font-bold text-xl">{{ t('Mi') }}</div>
      </div>
      <div class="w-1/3 flex items-center justify-end">
        <q-btn
          @click="router.push('/language')"
          outline
          rounded
          color="white"
          padding="none sm"
          no-caps
          class="outline-btn-border"
        >
          <div class="flex items-center py-0.5 px-0.5">
            <div>{{ lang }}</div>
          </div>
        </q-btn>
      </div>

    </div>

    <div class="font-bold q-mt-md">{{ t('mi1') }}:{{ userinfo?.username ?? '' }}</div>

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
import { ref, watch } from 'vue';
import { UInfo } from './typings';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const router = useRouter()
const userinfo = ref<UInfo>()
const langList = ref<any[]>([{label: 'English', value: 'en-US'},{label:'Bahasa Melayu',value:'ms-MY'},{label:'Español',value:'es-ES'}])
const lang = ref()
const { t, locale } = useI18n()
watch(locale, (newVal) => {
  let a = langList.value.find(item => item.value === newVal)
  lang.value = a?.label
})
const initData = async () => {
  let a = langList.value.find(item => item.value === locale.value)
  lang.value = a?.label


  const res = await myIndexApi()
  userinfo.value = res.data.uInfo
}

initData()
</script>

<style lang="scss" scoped></style>
