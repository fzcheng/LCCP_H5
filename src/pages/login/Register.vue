<template>
  <section class="flex flex-col items-center justify-center min-h-screen q-pa-md">
    <!-- Logo 或头像区域 -->
    <!-- <div class="w-36 h-36 bg-yellow-400 rounded-lg mb-5 logo-png"></div> -->
    <div class="flex items-center justify-center">
      <img src="~/assets/images/login/icon.png" class="w-[80%] block" />
    </div>
    <form class="w-full space-y-4">
      <div>
        <label class="text-white font-bold text-base flex items-center gap-2">
          <div class="center">
            <img src="~/assets/images/login/phone.png" alt="phone" class="w-[14px] h-[17.11px] block" />
          </div>
          <div class="text-main">{{ t('login1') }}</div>
        </label>
        <div class="flex items-center bg-white rounded-md q-mt-xs text-[#370000]">
          <div class="text-[#370000] mr-2 font-bold ml-4">+52</div>
          <input
            type="tel"
            v-model="mobile"
            maxlength="10"
            autocomplete="username"
            :placeholder="t('login2')"
            class="bg-transparent mr-4 outline-none border-none flex-1 py-3 w-5 text-[#370000] placeholder-gray-400"
          />
        </div>
      </div>

      <!-- 密码输入框 -->
      <div>
        <label class="text-white font-bold text-base flex items-center gap-2">
          <div class="center">
            <img src="~/assets/images/login/password.png" alt="phone" class="w-[16px] h-[18px] block" />
          </div>
          <div class="text-main">{{ t('login8') }}</div>
        </label>
        <input
          autocomplete="new-password"
          type="password"
          v-model="password"
          :placeholder="t('login4')"
          class="bg-white px-4 py-3 q-mt-xs rounded-md outline-none border-none w-full text-[#370000] placeholder-gray-400"
        />
      </div>

      <div>
        <label class="text-white font-bold text-base flex items-center gap-2">
          <div class="center">
            <img src="~/assets/images/login/invitaction.png" alt="phone" class="w-[16px] h-[18px] block" />
          </div>
          <div class="text-main">{{ t('login9') }}</div>
        </label>
        <input
          type="text"
          v-model="invitationCode"
          :placeholder="t('login10')"
          class="bg-white px-4 py-3 q-mt-xs rounded-md outline-none border-none w-full text-[#370000] placeholder-gray-400"
        />
      </div>

      <div class="q-mt-lg">
        <div>
          <q-btn
            text-color="white"
            label="Registrarse"
            class="full-width btn-bg"
            padding="sm"
            unelevated
            no-caps
            :loading="loading"
            style="border-radius: 8px; font-weight: bold"
            @click="submit"
          />
        </div>
        <router-link to="/login" class="mt-3 block a-nostyle">
          <q-btn
            text-color="main"
            label="Iniciar sesion"
            class="full-width bg-white"
            padding="sm"
            no-caps
            unelevated
            style="border-radius: 8px; font-weight: bold"
          />
        </router-link>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { doRegisterApi } from 'src/api/user'
import { downLink } from 'src/config/env.config'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const {t} = useI18n()
const router = useRouter()
const route = useRoute()

const mobile = ref('')
const password = ref('')
const invitationCode = ref<string>((route.query.invite as string) || '')
const kid = ref('')

const $q = useQuasar()

const loading = ref(false)

const submit = async () => {
  if (!mobile.value || mobile.value.length != 10) {
    $q.notify({
      type: 'negative',
      message: t('submitTIps7')
    })
    return
  }

  if (!password.value) {
    $q.notify({
      type: 'negative',
      message: t('submitTIps8')
    })
    return
  }

  if (!invitationCode.value) {
    $q.notify({
      type: 'negative',
      message: t('submitTIps11')
    })
    return
  }

  loading.value = true
  await doRegisterApi({
    mobile: mobile.value,
    password: password.value,
    confirmpwd: password.value,
    invitationCode: invitationCode.value,
    kid: kid.value
  }).finally(() => (loading.value = false))
  $q.notify({
    type: 'positive',
    message: t('submitTIps1')
  })
  location.href = downLink
  // router.replace('/login')
}

const countdown = ref(0)
const getCode = () => {
  // 模拟获取验证码
  countdown.value = 60 // 设置60秒倒计时
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
/* 无自定义样式，全部使用 Tailwind + Quasar 组件类 */
.logo-png {
  background: url(/logo.png) no-repeat;
  background-size: 100% 100%;
}
</style>
