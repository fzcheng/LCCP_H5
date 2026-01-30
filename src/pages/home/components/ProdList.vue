<template>
  <div>
    <!-- <img src="~/assets/images/home/list_text.png" alt="list_text" class="block" style="width: 154px; height: 15.75px" /> -->
    <!-- <div>Lista de productos</div> -->
    <div class="title">
      <span :data-text="t('homeprodlist1')">{{ t('homeprodlist1') }}</span>
    </div>
    <div v-for="item in data" :key="item.id" class="box p-3 mt-3">
      <div class="flex items-center justify-between">
        <div class="font-bold text-base text-[#370000]">{{ item.goods_name }}</div>
        <div class="text-lg font-bold text-red-500">{{ `${t('symbol')} ${item.goods_price}` }}</div>
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
          <div class="flex-1 w-5 text-[13px] text-[#250700]">
            <!-- <div>Ingreso diario: EGP{{ item.day_income }}</div>
            <div>Ingreso total: EGP{{ item.total_income }}</div>
            <div>Días de inversión: {{ item.effective_time }} días</div> -->
            <div> {{ `${t('homeprodlist2')} ${t('symbol')}${item.day_income}` }} </div>
            <div> {{ `${t('homeprodlist3')} ${t('symbol')}${item.total_income}` }} </div>
            <div> {{ t('homeprodlist4',{num:item.effective_time}) }} </div>
          </div>
        </div>
        <q-btn
          color="primary"
          @click="$router.push({ path: '/detalledebienes', query: { id: item.id } })"
          no-caps
          size="sm"
          padding="xs sm"
          :label="t('homeprodlist5')"
          text-color="white"
          unelevated
          style="border-radius: 12px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { GInfoItem } from '../typings'
const { t } = useI18n()
defineProps<{
  data: GInfoItem[]
}>()
</script>

<style lang="scss" scoped>
.title {
  span {
    background: linear-gradient(
      to right,
      #885600 0%,
      #885600 25%,
      #C17100 50%,
      #C17100 75%,
      #633800 100%
    ); /* 设置渐变色 */
    -webkit-background-clip: text; /* 仅应用背景于文字 */
    background-clip: text; /* 文字渐变 */
    color: transparent; /* 文字颜色设置为透明 */
    font-weight: 500;
    font-size: 18px;
    position: relative;
    border: 1px solid transparent;
    background-repeat: no-repeat;
    margin: -1px;
    &::after {
      content: attr(data-text);
      position: absolute;
      top: -1px;
      font-weight: 500;
      font-size: 18px;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0px 1px #681e04;
    }
  }
}

.box{
  background: url(src/assets/images/home/bg3.png) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
</style>
