<template>
  <div class="box flex items-center justify-around rounded-lg px-2 py-3">
    <router-link to="/recargar" class="a-nostyle flex flex-col justify-center items-center">
      <div class="box2 center p-3">
        <q-img
          src="~/assets/images/home/action1.png"
          width="33px"
          height="33px"
          fit="contain"
          no-spinner
          no-transition
          alt="action1"
        />
      </div>
      <div class="mt-0.5 text-[#250700]">{{ t('Recargar') }}</div>
    </router-link>
    <router-link to="/retirar" class="a-nostyle flex flex-col justify-center items-center">
      <div class="box2 center p-3">
        <q-img
          src="~/assets/images/home/action2.png"
          width="33px"
          height="33px"
          fit="contain"
          no-spinner
          no-transition
          alt="action2"
        />
      </div>
      <div class="mt-0.5 text-[#250700]">{{ t('Retirar') }}</div>
    </router-link>
    <router-link to="/factura" class="a-nostyle flex flex-col justify-center items-center">
      <div class="box2 center p-3">
        <q-img
          src="~/assets/images/home/action3.png"
          width="33px"
          height="33px"
          fit="contain"
          no-spinner
          no-transition
          alt="action3"
        />
      </div>
      <div class="mt-0.5 text-[#250700]">{{  t('Factura') }}</div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.box{
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.box2{
  background: url(src/assets/images/home/bg2.png) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
</style>
