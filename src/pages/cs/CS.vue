<template>
  <BackWrap :title="t('CS')">
    <q-page class="q-pa-md">
      <div class="text-center font-bold">{{ t('cs1') }}</div>
      <div class="text-center text-[13px] mt-0.5">
        {{ t('cs2') }}
      </div>

      <div class="flex items-center justify-center bg-[#222530] rounded-lg p-4 mt-4">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('home1') }}</div>
        </div>
        <a :href="info?.chats_link_cs ?? ''" class="a-nostyle">
          <q-btn
            color="primary"
            text-color="black"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>

      <div class="flex items-center justify-center bg-[#222530] rounded-lg p-4 mt-4">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('Telegram') }}</div>
        </div>
        <a :href="info?.chats_link_telegram ?? ''" class="a-nostyle">
          <q-btn
            color="primary"
            text-color="black"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>

      <div class="flex items-center justify-center bg-[#222530] rounded-lg p-4 mt-4">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/WhatsApp.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('WhatsApp') }}</div>
        </div>
        <a :href="info?.chats_link_whatsapp ?? ''" class="a-nostyle">
          <q-btn
            color="primary"
            text-color="black"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>
    </q-page>
  </BackWrap>
</template>

<script setup lang="ts">
import { indexApi } from 'src/api'
import BackWrap from 'src/components/backwrap/BackWrap.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const {t} = useI18n()
type Chat = {
  id: number
  parent_id: number
  username: string
  password: string
  phone: string
  email: string
  chats_link_telegram: string
  chats_link_telegram_channel: string
  chats_link_whatsapp: string
  chats_link_cs: string
  login_at: null
  login_ip: string
  login_num: number
  authorize: string
  status: number
  create_at: string
  google_secret: string
  google_url: string
  google_is_bind: number
  i_code: string
}

const info = ref<Chat>()

const initData = async () => {
  const res = await indexApi()
  info.value = res.data.pinfo
}

initData()
</script>

<style lang="scss" scoped></style>
