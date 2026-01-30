<template>
  <section
    class="flex flex-col items-center justify-center min-h-screen q-pa-md"
  >
    <!-- Logo 或头像区域 -->
    <!-- <div class="w-36 h-36 bg-yellow-400 rounded-lg mb-5 logo-png"></div> -->
    <div class="flex items-center justify-center">
      <img src="~/assets/images/login/icon.png" class="w-[80%] block" />
    </div>
    <form class="w-full space-y-2">
      <div>
        <label class="text-white font-bold text-base flex items-center gap-2">
          <div class="center">
            <img
              src="~/assets/images/login/phone.png"
              alt="phone"
              class="w-[14px] h-[17.11px] block"
            />
          </div>
          <div class="text-main">{{ t('login1') }}</div>
        </label>
        <div
          class="flex items-center bg-white rounded-md q-mt-xs text-white"
        >
          <div class="mr-2 font-bold ml-4 text-main">+52</div>
          <input
            type="tel"
            v-model="mobile"
            autocomplete="username"
            :placeholder="t('login2')"
            class="bg-transparent mr-4 outline-none border-none flex-1 py-3 w-5 text-main placeholder-gray-400"
          />

          <q-btn
            class="btn-bg"
            unelevated
            text-color="white"
            style="transform: scale(0.8); border-radius: 6px"
            size="xs"
            padding="sm sm"
            no-caps
            :label="countdown > 0 ? `${countdown} S` : t('Enviar')"
            :disable="countdown > 0"
            @click="getCode"
          />
        </div>
      </div>

      <!-- 验证码 -->
      <div>
        <label class="text-white font-bold text-base flex items-center gap-2">
          <div class="center">
            <img
              src="~/assets/images/login/code.png"
              alt="phone"
              class="w-[14px] h-[17.11px] block"
            />
          </div>
          <div class="text-main">{{ t('login11') }}</div>
        </label>
        <input
          type="text"
          v-model="verificationCode"
          :placeholder="t('login12')"
          class="bg-white px-4 py-3 q-mt-xs rounded-md outline-none border-none w-full text-[#370000] placeholder-gray-400"
        />
      </div>

      <!-- 密码输入框 -->
      <div>
        <label class="text-white font-bold text-base flex items-center gap-2">
          <div class="center">
            <img
              src="~/assets/images/login/password.png"
              alt="phone"
              class="w-[16px] h-[18px] block"
            />
          </div>
          <div class="text-main">{{ t('login13') }}</div>
        </label>
        <input
          autocomplete="current-password"
          type="password"
          v-model="password"
          :placeholder="t('login4')"
          class="bg-white px-4 py-3 q-mt-xs rounded-md outline-none border-none w-full text-[#370000] placeholder-gray-400"
        />
      </div>

      <div>
        <label class="text-white font-bold text-base flex items-center gap-2">
          <div class="center">
            <img
              src="~/assets/images/login/password.png"
              alt="phone"
              class="w-[16px] h-[18px] block"
            />
          </div>
          <div class="text-main">{{ t('SecurityPassword4') }}</div>
        </label>
        <input
          autocomplete="new-password"
          type="password"
          v-model="passwordC"
          :placeholder="t('login14')"
          class="bg-white px-4 py-3 q-mt-xs rounded-md outline-none border-none w-full text-[#370000] placeholder-gray-400"
        />
      </div>

      <div class="q-mt-lg">
        <div>
          <q-btn
            text-color="white"
            :label="t('Enviar')"
            class="full-width btn-bg"
            padding="sm"
            unelevated
            no-caps
            style="border-radius: 8px; font-weight: bold"
            @click="submit"
          />
        </div>
        <router-link to="/login" replace  class="mt-3 block a-nostyle">
          <q-btn
            text-color="main"
            :label="t('login6')"
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
import { useQuasar } from "quasar";
import { doForgetPasswordApi, sendsmsApi } from "src/api/user";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const {t} = useI18n()
const mobile = ref("");
const password = ref("");
const passwordC = ref("");
const verificationCode = ref("");

const $q = useQuasar();

const loading = ref(false);

const router = useRouter();

const submit = async () => {
  if (!mobile.value) {
    $q.notify({
      type: "negative",
      message: t('submitTIps7'),
    });
    return;
  }

  if (!password.value) {
    $q.notify({
      type: "negative",
      message: t('submitTIps8'),
    });
    return;
  }

  if (!passwordC.value) {
    $q.notify({
      type: "negative",
      message: t('submitTIps9'),
    });
    return;
  }

  if (passwordC.value !== password.value) {
    $q.notify({
      type: "negative",
      message: t('submitTIps10'),
    });
    return;
  }


  await doForgetPasswordApi({
    mobile: mobile.value,
    password: password.value,
    confirmpwd: passwordC.value,
    verificationCode: verificationCode.value
  }).finally(() => {
    loading.value = false;
  });
  $q.notify({
    type: 'positive',
    message: t('submitTIps2')
  })

  router.replace("/login");

};



const countdown = ref(0);
const codeLoading = ref(false);
const getCode = async () => {
  if (codeLoading.value || countdown.value > 0)  return;
  if (!mobile.value) {
    $q.notify({
      type: "negative",
      message: t('submitTIps7'),
    });
    return;
  }

  // 模拟获取验证码
  await sendsmsApi({
    tel: mobile.value,
    type: 2,
    code: '+52'
  }).finally(() => {
    loading.value = false;
  });
  countdown.value = 60; // 设置60秒倒计时
  const interval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
       clearInterval(interval);
    }
  }, 1000);
};
</script>

<style lang="scss" scoped>
/* 无自定义样式，全部使用 Tailwind + Quasar 组件类 */
.logo-png{
  background: url(/logo.png) no-repeat;
  background-size: 100% 100%;
}
</style>
