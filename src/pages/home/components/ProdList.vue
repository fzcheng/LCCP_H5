<template>
  <div>
    <img src="~/assets/images/home/list_text.png" alt="list_text" class="block" style="width: 154px; height: 15.75px" />
    <div v-for="item in data" :key="item.id" class="p-3 rounded-lg mt-3" style="border: 1px solid #fcd33c">
      <div class="flex items-center justify-between">
        <div class="font-bold text-base">{{ item.goods_name }}</div>
        <div class="text-lg font-bold text-primary">M$ {{ item.goods_price }}</div>
      </div>
      <div class="flex items-center q-mr-xs">
        <div class="flex-1 w-10 flex items-center no-wrap">
          <q-img
            :src="item.goods_pic"
            :ratio="1"
            spinner-color="primary"
            spinner-size="20px"
            width="65px"
            height="65px"
            class="mr-2"
            style="border-radius: 6px"
          />
          <div class="flex-1 w-5 text-[13px]">
            <div>Ingreso diario: M${{ item.day_income }}</div>
            <div>Ingreso total: M${{ item.total_income }}</div>
            <div>Días de inversión: {{ item.effective_time }} días</div>
          </div>
        </div>
        <q-btn
          color="primary"
          @click="$router.push({ path: '/detalledebienes', query: { id: item.id } })"
          no-caps
          size="sm"
          padding="xs sm"
          label="Invertir"
          text-color="black"
          unelevated
          style="border-radius: 6px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GInfoItem } from '../typings'

defineProps<{
  data: GInfoItem[]
}>()
</script>

<style lang="scss" scoped></style>
