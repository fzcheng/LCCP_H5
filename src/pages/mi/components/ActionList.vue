<template>
  <div >
    <router-link to="/securitypassword"  class="a-nostyle flex items-center justify-between py-4 font-bold">
      <div class="flex mr-2 items-center flex-1 w-20">
        <div class="flex items-center flex-1 w-10">
          <div class="center mr-3">
            <img src="~/assets/images/mi/btn1.png" alt="btn" width="24px" height="12px" />
          </div>
          <div class="flex-1 w-5 ">{{ t('mi2') }}</div>
        </div>
      </div>
      <div class="center">
        <q-icon name="arrow_forward_ios" />
      </div>
    </router-link>

    <router-link to="/recargarlog" class=" a-nostyle flex items-center justify-between py-4 font-bold">
      <div class="flex mr-2 items-center flex-1 w-20">
        <div class="flex items-center flex-1 w-10">
          <div class="center mr-3">
            <img src="~/assets/images/mi/btn2.png" alt="btn" width="24px" height="24px" />
          </div>
          <div class="flex-1 w-5 ">{{ t('mi3') }}</div>
        </div>
      </div>
      <div class="center">
        <q-icon name="arrow_forward_ios" />
      </div>
    </router-link>

    <router-link to="/retirarlog" class="a-nostyle flex items-center justify-between py-4 font-bold">
      <div class="flex mr-2 items-center flex-1 w-20">
        <div class="flex items-center flex-1 w-10">
          <div class="center mr-3">
            <img src="~/assets/images/mi/btn3.png" alt="btn" width="24px" height="24px" />
          </div>
          <div class="flex-1 w-5 ">{{ t('mi4') }}</div>
        </div>
      </div>
      <div class="center">
        <q-icon name="arrow_forward_ios" />
      </div>
    </router-link>

    <a :href="downLink" class="a-nostyle flex items-center justify-between py-4 font-bold">
      <div class="flex mr-2 items-center flex-1 w-20">
        <div class="flex items-center flex-1 w-10">
          <div class="center mr-3">
            <img src="~/assets/images/mi/btn4.png" alt="btn" width="24px" height="24px" />
          </div>
          <div class="flex-1 w-5 ">{{ t('Descargar') }}</div>
        </div>
      </div>
      <div class="center">
        <q-icon name="arrow_forward_ios" />
      </div>
    </a>

    <div @click="logout" class="flex items-center justify-between py-4 font-bold">
      <div class="flex mr-2 items-center flex-1 w-20">
        <div class="flex items-center flex-1 w-10">
          <div class="center mr-3">
            <img src="~/assets/images/mi/btn5.png" alt="btn" width="24px" height="24px" />
          </div>
          <div class="flex-1 w-5 ">{{ t('Salir') }}</div>
        </div>
      </div>
      <div class="center">
        <q-icon name="arrow_forward_ios" />
      </div>
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

</style>
