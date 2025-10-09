<template>
  <BackWrap :title="t('mi2')">
    <q-page class="q-pa-md">
      <div class="">
        <div class="font-bold text-[15px] mb-1">{{ t('SecurityPassword2') }}</div>
        <q-input
          v-model="oldPassword"
          dense
          standout
          class="mine-input q-mb-md"
          :placeholder="t('SecurityPassword2')"
          :type="isPwd.old ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              size="20px"
              :name="isPwd.old ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd.old = !isPwd.old"
            />
          </template>
        </q-input>

        <div class="font-bold text-[15px] mb-1">{{ t('SecurityPassword3') }}</div>
        <q-input
          v-model="newPassword"
          dense
          standout
          class="q-mb-md mine-input"
          :placeholder="t('SecurityPassword3')"
          :type="isPwd.new ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              size="20px"
              :name="isPwd.new ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd.new = !isPwd.new"
            />
          </template>
        </q-input>

        <div class="font-bold text-[15px] mb-1">{{ t('SecurityPassword4') }}</div>
        <q-input
          v-model="confirmPassword"
          dense
          standout
          class="q-mb-md mine-input"
          :placeholder="t('SecurityPassword4')"
          :type="isPwd.confirm ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              size="20px"
              :name="isPwd.confirm ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd.confirm = !isPwd.confirm"
            />
          </template>
        </q-input>

        <q-btn
          class="font-bold full-width q-mb-sm q-mt-sm"
          color="primary"
          text-color="black"
          no-caps
          style="border-radius: 8px; font-size: 16px"
          :label="t('Confirmar')"
          @click="submit"
          :loading="loading"
        />
      </div>
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { editpwdApi } from 'src/api/user'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const $q = useQuasar()

const oldPassword = ref()
const newPassword = ref()
const confirmPassword = ref()
const isPwd = reactive({
  old: true,
  new: true,
  confirm: true
})
const loading = ref(false)

const reset = () => {
  oldPassword.value = null
  newPassword.value = null
  confirmPassword.value = null
  isPwd.old = true
  isPwd.new = true
  isPwd.confirm = true
}

const submit = async () => {
  if (!oldPassword.value) {
    return $q.notify({ message: 'Contraseña anterior', type: 'negative' })
  }
  if (!newPassword.value) {
    return $q.notify({ message: 'Por favor, introduzca su contraseña', type: 'negative' })
  }
  if (!confirmPassword.value) {
    return $q.notify({ message: 'Por favor, vuelva a escribir su contraseña', type: 'negative' })
  }
  if (newPassword.value !== confirmPassword.value) {
    return $q.notify({ message: 'Las contraseñas no coinciden', type: 'negative' })
  }
  loading.value = true
  await editpwdApi({
    oldPwd: oldPassword.value,
    newPwd: newPassword.value,
    confirmPwd: confirmPassword.value
  }).finally(() => (loading.value = false))

  $q.notify({
    type: 'positive',
    message: 'Contraseña cambiada exitosamente'
  })

  reset()
}
</script>

<style lang="scss" scoped></style>
