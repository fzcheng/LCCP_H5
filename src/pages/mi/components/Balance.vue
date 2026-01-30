<template>
  <div class="rounded-xl p-2 flex items-center justify-center text-[#6F5A44]">
    <div class="flex-1 text-center box py-4">
      <div class="font-bold">{{ t('homebalance1') }}</div>
      <div class="font-bold text-[#370000] mt-1">
        <span>{{ t('symbol') }}</span>
        <span class="font-bold text-lg">{{ data?.yongj ?? '0.0' }}</span>
      </div>
    </div>
    <div class="h-8 w-[1px] bg-[#FCD33C]"></div>
    <div class="flex-1 text-center box py-4">
      <div class="font-bold">{{ t('homebalance2') }}</div>
      <div class="font-bold text-[#370000] mt-1">
        <span>{{ t('symbol') }}</span>
        <span class="font-bold text-lg">{{ data?.balance ?? '0.0' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { UInfo } from '../typings'
const { t } = useI18n()
defineProps<{
  data: UInfo | undefined
}>()
</script>

<style lang="scss" scoped>
.box{
  background: url(src/assets/images/home/bg1.png) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
</style>
