<template>
  <BackWrap :title="t('mi2')">
    <q-page class="q-pa-md flex justify-center">
      <div class="w-full max-w-[400px] flex flex-col gap-5">
        <!-- Old Password -->
        <div class="input-group">
          <label class="input-label">{{ t('SecurityPassword2') }}</label>
          <q-input
            v-model="oldPassword"
            dense
            standout
            class="mine-input"
            :placeholder="t('SecurityPassword2')"
            :type="isPwd.old ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                size="20px"
                :name="isPwd.old ? 'visibility_off' : 'visibility'"
                class="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                @click="isPwd.old = !isPwd.old"
              />
            </template>
          </q-input>
        </div>

        <!-- New Password -->
        <div class="input-group">
          <label class="input-label">{{ t('SecurityPassword3') }}</label>
          <q-input
            v-model="newPassword"
            dense
            standout
            class="mine-input"
            :placeholder="t('SecurityPassword3')"
            :type="isPwd.new ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                size="20px"
                :name="isPwd.new ? 'visibility_off' : 'visibility'"
                class="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                @click="isPwd.new = !isPwd.new"
              />
            </template>
          </q-input>
        </div>

        <!-- Confirm Password -->
        <div class="input-group">
          <label class="input-label">{{ t('SecurityPassword4') }}</label>
          <q-input
            v-model="confirmPassword"
            dense
            standout
            class="mine-input"
            :placeholder="t('SecurityPassword4')"
            :type="isPwd.confirm ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                size="20px"
                :name="isPwd.confirm ? 'visibility_off' : 'visibility'"
                class="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                @click="isPwd.confirm = !isPwd.confirm"
              />
            </template>
          </q-input>
        </div>

        <!-- Submit Button -->
        <div class="q-pt-sm">
          <q-btn
            class="w-full h-[48px] text-[16px] font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity full-width btn-bg"
            text-color="white"
            no-caps
            unelevated
            :label="t('Confirmar')"
            @click="submit"
            :loading="loading"
          />
        </div>
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
    return $q.notify({ message: t('SecurityPassword2'), type: 'negative' })
  }
  if (!newPassword.value) {
    return $q.notify({ message: t('submitTIps8'), type: 'negative' })
  }
  if (!confirmPassword.value) {
    return $q.notify({ message: t('submitTIps9'), type: 'negative' })
  }
  if (newPassword.value !== confirmPassword.value) {
    return $q.notify({ message: t('submitTIps10'), type: 'negative' })
  }
  loading.value = true
  await editpwdApi({
    oldPwd: oldPassword.value,
    newPwd: newPassword.value,
    confirmPwd: confirmPassword.value
  }).finally(() => (loading.value = false))

  $q.notify({
    type: 'positive',
    message: t('submitTIps4')
  })

  reset()
}
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-label {
  font-weight: 700;
  font-size: 15px;
  color: #370000; // text-main
  line-height: 1.2;
}
</style>
