<template>
  <q-dialog v-model="dialog">
    <div class="full-width bg-white pb-4 px-2 box-main" style="border-radius: 12px !important">
      <div class="text-center q-mt-md text-lg font-bold text-[#370000]">{{ t('Notificar') }}</div>
      <div class="px-2 mt-2 text-[13px] text-[#370000]" v-html="groupmsg"></div>

      <div v-if="!!info?.chats_link_cs" class="box flex items-center justify-center text-main rounded-lg px-2 py-1 mt-2">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('cs3') }}</div>
        </div>
        <a :href="info?.chats_link_cs ?? ''" class="a-nostyle">
          <q-btn
            class="btn-bg"
            text-color="white"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>

      <div v-if="!!info?.chats_link_telegram_channel" class="box flex items-center justify-center text-main rounded-lg px-2 py-1 mt-2">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('cs4') }}</div>
        </div>
        <a :href="info?.chats_link_telegram_channel ?? ''" class="a-nostyle">
          <q-btn
            class="btn-bg"
            text-color="white"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>

      <div v-if="!!info?.chats_link_whatsapp" class="box flex items-center justify-center text-main rounded-lg px-2 py-1 mt-4">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/WhatsApp.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('cs5') }}</div>
        </div>
        <a :href="info?.chats_link_whatsapp ?? ''" class="a-nostyle">
          <q-btn
            class="btn-bg"
            text-color="white"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>

      <div v-if="!!info?.chats_link_telegram" class="box flex items-center justify-center text-main rounded-lg px-2 py-1 mt-4">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('cs6') }}</div>
        </div>
        <a :href="info?.chats_link_telegram ?? ''" class="a-nostyle">
          <q-btn
            class="btn-bg"
            text-color="white"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>

      <div class="px-2 mt-4 mb-1">
        <q-btn
          text-color="white"
          class="full-width btn-bg"
          style="border-radius: 6px"
          :label="t('home3')"
          unelevated
          @click="dialog = false"
        />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { BigNumber } from 'bignumber.js';
import { Chat } from '../typings'
import { ref, watch } from 'vue';
import { isShowLock } from './CSDialog';
import { useI18n } from 'vue-i18n';
const dialog = ref(false)
const {t} = useI18n()
const props = defineProps<{
  info?: Chat | undefined
  groupmsg: string
}>()

watch(() => props.info, () => {
  if (isShowLock.value) return
  dialog.value = true
  isShowLock.value = true
})
</script>

<style lang="scss" scoped>
.box {
  background: rgba(220, 219, 219, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
