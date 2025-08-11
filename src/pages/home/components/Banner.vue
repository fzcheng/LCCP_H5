<template>
  <section class="full-width">
    <swiper :space-between="16"   :modules="swiperModules">
      <swiper-slide class=" " style="height: 140px;" >
        <div class="h-[140px] rounded-xl bg-red-200 headbg"></div>
      </swiper-slide>
       <!-- <swiper-slide class="" style="height: 140px;" >
        <div class="h-[140px] rounded-xl bg-red-200"></div>
      </swiper-slide> -->
    </swiper>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import type { SwiperModule } from 'swiper/types';

const swiperModules: SwiperModule[] = [];
</script>

<style lang="scss" scoped>
.headbg{
  background: url(src/assets/images/index/headbg.png) no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
