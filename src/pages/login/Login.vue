<template>
  <section class="flex flex-col items-center justify-center min-h-screen q-pa-md">
    <!-- Logo 或头像区域 -->
    <div class="w-36 h-36 bg-yellow-400 rounded-lg mb-5 logo-png" style=""></div>

    <form class="w-full space-y-4">
      <div>
        <label class="text-white font-bold text-base flex items-center gap-2">
          <div class="center">
            <img src="~/assets/images/login/phone.png" alt="phone" class="w-[14px] h-[17.11px] block" />
          </div>
          <div>{{ t('login1') }}</div>
        </label>
        <div class="flex items-center bg-[#2c2c2e] rounded-md px-4 q-mt-xs text-white">
          <span class="text-white mr-2 font-bold">+52</span>
          <input
            type="tel"
            v-model="mobile"
            autocomplete="username"
            :placeholder="t('login2')"
            class="bg-transparent outline-none border-none flex-1 py-3 w-5 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <!-- 密码输入框 -->
      <div>
        <label class="text-white font-bold text-base flex items-center gap-2">
          <div class="center">
            <img src="~/assets/images/login/password.png" alt="phone" class="w-[16px] h-[18px] block" />
          </div>
          <div>{{ t('login3') }}</div>
        </label>
        <input
          autocomplete="current-password"
          type="password"
          v-model="password"
          :placeholder="t('login4')"
          class="bg-[#2c2c2e] px-4 py-3 q-mt-xs rounded-md outline-none border-none w-full text-white placeholder-gray-400"
        />
      </div>

      <div class="text-right text-[#AEB4B3]">
        <router-link to="/forget" class="a-nostyle">{{ t('login5') }}</router-link>
      </div>

      <div class="q-mt-lg">
        <div>
          <q-btn
            color="primary"
            text-color="black"
            :label="t('login6')"
            class="full-width"
            padding="sm"
            unelevated
            no-caps
            :loading="loading"
            style="border-radius: 8px; font-weight: bold"
            @click="submit"
          />
        </div>
        <router-link to="/register" class="mt-3 block a-nostyle">
          <q-btn
            color="primary"
            :label="t('login7')"
            class="full-width"
            padding="sm"
            no-caps
            outline
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
import { doLoginApi, loginAdminApi } from 'src/api/user'
import { useUserStore } from 'src/stores/user'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const {t} = useI18n()
const mobile = ref('')
const password = ref('')

const loading = ref(false)

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const submit = async () => {
  if (!mobile.value) {
    $q.notify({
      type: 'negative',
      message: 'Por favor, introduzca su número de móvil'
    })
    return
  }

  if (!password.value) {
    $q.notify({
      type: 'negative',
      message: 'Por favor, introduzca su contraseña'
    })
    return
  }
  loading.value = true
  const res = await doLoginApi({
    mobile: mobile.value,
    password: password.value
  }).finally(() => (loading.value = false))

  useUserStore().login(res.data.token)
  router.replace('/')
}

const initData = async () => {
  const tel = route.query.tel as string
  if (!tel) return
  $q.loading.show()
  const res = await loginAdminApi(tel).finally(() => $q.loading.hide())
  mobile.value = res.data.uinfo.tel
  password.value = res.data.uinfo.pwdmw
}

initData()
</script>

<style lang="scss" scoped>
/* 无自定义样式，全部使用 Tailwind + Quasar 组件类 */
.logo-png {
  background: url(/logo.png) no-repeat;
  background-size: 100% 100%;
}
</style>
