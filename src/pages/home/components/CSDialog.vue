<template>
  <q-dialog v-model="dialog">
    <div class="full-width bg-[#222530] pb-4 px-2" style="border-radius: 12px !important">
      <div class="text-center q-mt-md text-lg font-bold">Notificar</div>
      <div class="px-2 mt-2 text-[13px]" v-html="groupmsg"></div>

      <div class="flex justify-between mt-4">
        <div class="flex column items-center justify-center bg-[#222530] rounded-lg px-2 py-1">
          <!-- <div class="flex-1 w-20 flex items-center"> -->
            <!-- <div class="text-center">Customer service</div> -->
            <div class="center my-2">
              <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
            </div>
          <!-- </div> -->
          <a :href="info?.chats_link_cs ?? ''" class="a-nostyle">
            <q-btn
              size="md"
              no-caps
              unelevated
              style="border-radius: 6px;background: #14643D;color: #FFD33C;padding: 0 10px;margin-top: 10px;"
              label="Service"
            />
          </a>
        </div>

        <div class="flex column items-center justify-center bg-[#222530] rounded-lg px-2 py-1">
          <!-- <div class="flex-1 w-20 flex items-center"> -->
            <!-- <div class="text-center">Telegram</div> -->
            <div class="center my-2">
              <img src="~/assets/images/public/TG.png" alt="TG.png" width="36px" height="36px" />
            </div>

          <!-- </div> -->
          <a :href="info?.chats_link_telegram ?? ''" class="a-nostyle">
            <q-btn
              size="md"
              no-caps
              unelevated
              style="border-radius: 6px;background: #14643D;color: #FFD33C;padding: 0 10px;margin-top: 10px;"
              label="Telegram"
            />
          </a>
        </div>

        <div class="flex column items-center justify-center bg-[#222530] rounded-lg px-2 py-1">
          <!-- <div class="flex-1 w-20 flex items-center"> -->
            <!-- <div class="text-center">WhatsApp</div> -->
            <div class="center my-2">
              <img src="~/assets/images/public/WhatsApp.png" alt="TG.png" width="36px" height="36px" />
            </div>
          <!-- </div> -->
          <a :href="info?.chats_link_whatsapp ?? ''" class="a-nostyle">
            <q-btn
              size="md"
              no-caps
              unelevated
              style="border-radius: 6px;background: #14643D;color: #FFD33C;padding: 0 10px;margin-top: 10px;"
              label="WhatsApp"
            />
          </a>
        </div>
      </div>

      <div class="px-2 mt-4 mb-1">
        <q-btn
          class="full-width"
          style="border-radius: 6px;background: #14643D;color: #FFD33C;"
          label="Cerrar el menú"
          unelevated
          no-caps
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
const dialog = ref(false)

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

<style lang="scss" scoped></style>
