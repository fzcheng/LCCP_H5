<template>
  <BackWrap :title="t('CS')">
    <q-page class="q-pa-md">
      <div class="text-center font-bold text-main">{{ t('cs1') }}</div>
      <div class="text-center text-[13px] mt-0.5 text-main">
        {{ t('cs2') }}
      </div>

      <div v-if="!!info?.chats_link_cs" class="box-main flex items-center justify-center rounded-lg p-4 mt-4 text-main">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('cs3') }}</div>
        </div>
        <a :href="info?.chats_link_cs ?? ''" class="a-nostyle">
          <q-btn
            text-color="white"
            class="btn-bg"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>

      <div v-if="!!info?.chats_link_telegram_channel" class="box-main flex items-center justify-center rounded-lg p-4 mt-4 text-main">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('cs4') }}</div>
        </div>
        <a :href="info?.chats_link_telegram_channel ?? ''" class="a-nostyle">
          <q-btn
            text-color="white"
            class="btn-bg"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>

      <div v-if="!!info?.chats_link_whatsapp" class="box-main flex items-center justify-center rounded-lg p-4 mt-4 text-main">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/WhatsApp.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('cs5') }}</div>
        </div>
        <a :href="info?.chats_link_whatsapp ?? ''" class="a-nostyle">
          <q-btn
            text-color="white"
            class="btn-bg"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            :label="t('home2')"
          />
        </a>
      </div>

      <div v-if="!!info?.chats_link_telegram" class="box-main flex items-center justify-center rounded-lg p-4 mt-4 text-main">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">{{ t('cs6') }}</div>
        </div>
        <a :href="info?.chats_link_telegram ?? ''" class="a-nostyle">
          <q-btn
            text-color="white"
            class="btn-bg"
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
// const info = ref<Chat>({
//   id: 1,
//   parent_id: 0,
//   username: 'test_user',
//   password: '***',
//   phone: '1234567890',
//   email: 'test@example.com',
//   chats_link_telegram: 'https://t.me/test_group',
//   chats_link_telegram_channel: 'https://t.me/test_channel',
//   chats_link_whatsapp: 'https://wa.me/1234567890',
//   chats_link_cs: 'https://t.me/cs_support',
//   login_at: null,
//   login_ip: '127.0.0.1',
//   login_num: 1,
//   authorize: 'token_xxx',
//   status: 1,
//   create_at: '2023-01-01',
//   google_secret: '',
//   google_url: '',
//   google_is_bind: 0,
//   i_code: '123456'
// })

const initData = async () => {
  const res = await indexApi()
  info.value = res.data.pinfo
}

initData()
</script>

<style lang="scss" scoped></style>
