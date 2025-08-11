<template>
  <div class="flex items-center justify-around">
    <router-link to="/recargar" class="a-nostyle flex flex-col justify-center items-center">
      <q-btn color="secondary" padding="14px 14px" style="border-radius: 6px" outline unelevated>
        <q-img
          src="~/assets/images/home/action1.png"
          width="24px"
          height="24px"
          fit="contain"
          no-spinner
          no-transition
          alt="action1"
        />
      </q-btn>
      <div class="mt-0.5">Recargar</div>
    </router-link>
    <router-link to="/retirar" class="a-nostyle flex flex-col justify-center items-center">
      <q-btn color="secondary" padding="14px 14px" style="border-radius: 6px" outline unelevated>
        <q-img
          src="~/assets/images/home/action2.png"
          width="24px"
          height="24px"
          fit="contain"
          no-spinner
          no-transition
          alt="action2"
        />
      </q-btn>
      <div class="mt-0.5">Retirar</div>
    </router-link>
    <router-link to="/factura" class="a-nostyle flex flex-col justify-center items-center">
      <q-btn color="secondary" padding="14px 14px" style="border-radius: 6px" outline unelevated>
        <q-img
          src="~/assets/images/home/action3.png"
          width="24px"
          height="24px"
          fit="contain"
          no-spinner
          no-transition
          alt="action3"
        />
      </q-btn>
      <div class="mt-0.5">Factura</div>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
