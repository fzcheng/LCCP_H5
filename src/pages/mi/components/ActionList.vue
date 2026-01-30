<template>
  <div class="box flex flex-wrap items-start justify-start p-3 rounded-lg q-mt-md gap-y-3">
    <router-link to="/securitypassword" class="a-nostyle flex flex-col items-center justify-start w-1/4 mb-3">
      <div class="icon-box flex items-center justify-center mb-1">
        <img src="~/assets/images/mi/btn1.png" alt="btn" width="30px" height="30px" />
      </div>
      <div class="text-center text-md text-medium w-full px-1 text-[#250700]">{{ t('mi2') }}</div>
    </router-link>

    <router-link to="/recargarlog" class="a-nostyle flex flex-col items-center justify-start w-1/4 mb-3">
      <div class="icon-box flex items-center justify-center mb-1">
        <img src="~/assets/images/mi/btn2.png" alt="btn" width="30px" height="30px" />
      </div>
      <div class="text-center text-xs text-medium w-full px-1 text-[#250700]">{{ t('mi3') }}</div>
    </router-link>

    <router-link to="/retirarlog" class="a-nostyle flex flex-col items-center justify-start w-1/4 mb-3">
      <div class="icon-box flex items-center justify-center mb-1">
        <img src="~/assets/images/mi/btn3.png" alt="btn" width="30px" height="30px" />
      </div>
      <div class="text-center text-xs text-medium w-full px-1 text-[#250700]">{{ t('mi4') }}</div>
    </router-link>

    <a :href="downLink" class="a-nostyle flex flex-col items-center justify-start w-1/4 mb-3">
      <div class="icon-box flex items-center justify-center mb-1">
        <img src="~/assets/images/mi/btn4.png" alt="btn" width="30px" height="30px" />
      </div>
      <div class="text-center text-xs text-medium w-full px-1 text-[#250700]">{{ t('Descargar') }}</div>
    </a>

    <div @click="logout" class="flex flex-col items-center justify-start w-1/4 mb-3 cursor-pointer">
      <div class="icon-box flex items-center justify-center mb-1">
        <img src="~/assets/images/mi/btn5.png" alt="btn" width="30px" height="30px" />
      </div>
      <div class="text-center text-xs text-medium w-full px-1 text-[#250700]">{{ t('Salir') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { downLink } from 'src/config/env.config';
import { useUserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const {t} = useI18n()
const router = useRouter()

const logout = () => {
  useUserStore().logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.box {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.icon-box {
  background: #fff;
  border-radius: 12px;
  width: 70px;
  height: 70px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
