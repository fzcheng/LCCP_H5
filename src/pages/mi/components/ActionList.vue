<template>
  <!-- <div >
    <router-link to="/securitypassword"  class="a-nostyle flex items-center justify-between py-4 font-bold">
      <div class="flex mr-2 items-center flex-1 w-20">
        <div class="flex items-center flex-1 w-10">
          <div class="center mr-3">
            <img src="~/assets/images/mi/btn1.png" alt="btn" width="24px" height="12px" />
          </div>
          <div class="flex-1 w-5 ">Cambiar contraseña</div>
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
          <div class="flex-1 w-5 ">Registro de recarga</div>
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
          <div class="flex-1 w-5 ">Registros de retiro</div>
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
          <div class="flex-1 w-5 ">Descargar</div>
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
          <div class="flex-1 w-5 ">Salir</div>
        </div>
      </div>
      <div class="center">
        <q-icon name="arrow_forward_ios" />
      </div>
    </div>
  </div> -->
    <div class="q-mt-md q-px-sm py-2 rounded-md">
      <div class="grid grid-flow-row grid-cols-4 mt-3 gap-x-8 gap-y-4">
        <router-link to="/securitypassword" class="a-nostyle">
          <q-responsive :ratio="1">
            <div class="bg-[#25432B] rounded-md center">
              <img src="~/assets/images/mi/btn1.png" style="width: 70%; max-width: 60px; margin: auto" alt="icon1" />
            </div>
          </q-responsive>
          <div class="text-center text-[13px] leading-4 mt-1">Cambiar contraseña</div>
        </router-link>
        <router-link to="/recargarlog" class="a-nostyle">
          <q-responsive :ratio="1">
            <div class="bg-[#25432B] rounded-md center">
              <img
                src="~/assets/images/mi/btn2.png"
                style="width: 70%; max-width: 60px; margin: auto"
                alt="icon1"
              />
            </div>
          </q-responsive>
          <div class="text-center text-[13px] leading-4 mt-1">Registro de recarga</div>
        </router-link>
        <router-link to="/retirarlog" class="a-nostyle">
          <q-responsive :ratio="1">
            <div class="bg-[#25432B] rounded-md center">
              <img src="~/assets/images/mi/btn3.png" style="width: 70%; max-width: 60px; margin: auto" alt="icon1" />
            </div>
          </q-responsive>
          <div class="text-center text-[13px] leading-4 mt-1">Registros de retiro</div>
        </router-link>
        <a :href="downLink" class="a-nostyle">
          <q-responsive :ratio="1">
            <div class="bg-[#25432B] rounded-md center">
              <img src="~/assets/images/mi/btn4.png" style="width: 70%; max-width: 60px; margin: auto" alt="icon1" />
            </div>
          </q-responsive>
          <div class="text-center text-[13px] leading-4 mt-1">Descargar</div>
        </a>
        <div @click="logout" class="a-nostyle">
          <q-responsive :ratio="1">
            <div class="bg-[#25432B] rounded-md center">
              <img src="~/assets/images/mi/btn5.png" style="width: 70%; max-width: 60px; margin: auto" alt="icon1" />
            </div>
          </q-responsive>
          <div class="text-center text-[13px] leading-4 mt-1">Salir</div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { downLink } from 'src/config/env.config';
import { useUserStore } from 'src/stores/user';
import { useRouter } from 'vue-router';
const router = useRouter()

const logout = () => {
  useUserStore().logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>

</style>
