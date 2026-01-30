<template>
  <BackWrap :title="t('SwitchLanguage')">
    <div class="q-pa-md">
      <div v-if="loading" class="pt-10 pb-8 center">
        <q-spinner-gears color="primary" size="4rem" />
      </div>
      <div v-else class="bg-[rgba(255,255,255,0.05)] rounded-md">
        <div v-for="(item, index) in list" >
          <div
            @click="switchLanguage(item)"
            class="flex items-center justify-between q-pa-md"
            :class="{ 'font-bold': locale === item.value }"
          >
            <div class="mr-2">{{ item.label }}</div>
            <div v-if="locale === item.value" class="text-primary">
              <q-icon name="check_circle" size="20px" />
            </div>
          </div>
          <div v-if="index + 1 !== list.length" class="q-mx-md h-[1px] bg-[rgba(255,255,255,0.15)]"></div>
        </div>
      </div>
    </div>
  </BackWrap>
</template>

<script setup lang="ts">
import { QSpinnerGears, useQuasar } from 'quasar'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()

const $q = useQuasar()
const router = useRouter()
// Bahasa Melayu
type LanguageItem = {
  label: string
  value: string
}
// const list = ref<LanguageItem[]>([{label: 'English', value: 'en-US'},{label:'Bahasa Melayu',value:'ms-MY'}])
const list = ref<LanguageItem[]>([{label: 'English', value: 'en-US'},{label:'Español',value:'es-MX'}])
const switchLanguage = async (item: LanguageItem) => {
  if (item.value === locale.value) return
  // $q.loading.show()
  // await useApp.setAppLanguage(item)
  // await new Promise(resolve => setTimeout(resolve, 3000))
  locale.value = item.value
  // actionClear();
  // $q.loading.hide()
  // router.back()
  // router.replace({ path: '/' })
}

const loading = ref(false)
</script>

<style lang="scss" scoped></style>
