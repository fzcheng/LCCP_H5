<template>
  <BackWrap :title="t('Banco')">
    <q-page class="q-pa-md">
      <div class="">
        <div class="font-bold text-[15px] mb-1">{{ t('banco1') }}</div>
        <q-select
          standout
          dense
          class="q-mb-md mine-select "
          v-model="bankname"
          use-input
          @filter="filterFn"
          :label="bankname ? undefined : t('banco2')"
          :options="options"
          behavior="menu"
        />

        <div class="font-bold text-[15px] mb-1">{{ t('banco3') }}</div>
        <q-input
          v-model="username"
          dense
          standout
          class="q-mb-md mine-input"
          :placeholder="t('banco4')"
          type="text"
        ></q-input>

        <div class="font-bold text-[15px] mb-1">{{ t('banco5') }}</div>
        <q-input
          v-model="cardnum"
          dense
          standout
          class="q-mb-md mine-input"
          :placeholder="t('banco6')"
          type="text"
        ></q-input>

        <q-btn
          class="font-bold full-width q-mb-sm q-mt-sm"
          color="primary"
          text-color="black"
          no-caps
          style="border-radius: 8px; font-size: 16px"
          :label="t('Enviar')"
          @click="submit"
          :loading="loading"
        />
      </div>
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { moneyBankApi, moneyBankPostApi } from 'src/api/money'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const $q = useQuasar()

const bankname = ref()
const cardnum = ref()
const username = ref()
const loading = ref(false)
const regionsList = ref<string[]>([])
const options = ref<string[]>([])

const reset = () => {
  bankname.value = null
  cardnum.value = null
  username.value = null
}

const filterFn = (val: string, update: (fn: () => void) => void) => {
  if (val === '') {
    update(() => {
      options.value = [...regionsList.value]
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = regionsList.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

const submit = async () => {
  if (!bankname.value) {
    return $q.notify({ message: 'Ingrese el nombre del banco', type: 'negative' })
  }
  if (!cardnum.value) {
    return $q.notify({ message: 'Ingrese el Número de cuenta', type: 'negative' })
  }
  if (!username.value) {
    return $q.notify({ message: 'Ingrese su nombre', type: 'negative' })
  }
  loading.value = true
  await moneyBankPostApi({
    bankname: bankname.value,
    username: username.value,
    cardnum: cardnum.value
  }).finally(() => (loading.value = false))
  $q.notify({
    type: 'positive',
    message: 'Vinculación exitosa'
  })
}

const initData = async () => {
  const res = await moneyBankApi()
  bankname.value = res.data.list.bankname
  cardnum.value = res.data.list.cardnum
  username.value = res.data.list.username
  regionsList.value = Object.values(res.data.banklists ?? {})
  options.value = Object.values(res.data.banklists ?? {})
}

initData()
</script>

<style lang="scss" scoped>
.options-select{

}
</style>
