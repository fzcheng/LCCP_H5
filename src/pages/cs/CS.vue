<template>
  <BackWrap title="CS">
    <q-page class="q-pa-md">
      <div class="text-center font-bold">Encantada de ayudarte!</div>
      <div class="text-center text-[13px] mt-0.5">
        Haga clic en la informacion de contacto a continuación para ponerse en contacto con nosotros ..
      </div>

      <div class="flex items-center justify-center bg-[#222530] rounded-lg p-4 mt-4">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">Customer service</div>
        </div>
        <a :href="info?.chats_link_cs ?? ''" class="a-nostyle">
          <q-btn
            color="primary"
            text-color="black"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            label="Ir ahora"
          />
        </a>
      </div>

      <div class="flex items-center justify-center bg-[#222530] rounded-lg p-4 mt-4">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">Telegram</div>
        </div>
        <a :href="info?.chats_link_telegram ?? ''" class="a-nostyle">
          <q-btn
            color="primary"
            text-color="black"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            label="Ir ahora"
          />
        </a>
      </div>

      <div class="flex items-center justify-center bg-[#222530] rounded-lg p-4 mt-4">
        <div class="flex-1 w-20 flex items-center">
          <div class="center mr-2">
            <img src="~/assets/images/public/WhatsApp.png" alt="TG.png" width="36px" height="36px" />
          </div>
          <div class="flex-1 w-10">WhatsApp</div>
        </div>
        <a :href="info?.chats_link_whatsapp ?? ''" class="a-nostyle">
          <q-btn
            color="primary"
            text-color="black"
            size="sm"
            no-caps
            unelevated
            style="border-radius: 6px"
            label="Ir ahora"
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
