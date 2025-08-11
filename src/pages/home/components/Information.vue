<template>
  <div class="q-py-xs   panel-bg  flex no-wrap items-center">
    <div class="center q-mr-xs">
      <img src="~/assets/images/home/trumpet.png" style="width: 19px;height: 16.55px;" />
    </div>
    <Marquee
      class="flex-1"
      :loading="false"
      ref="MarqueeRef"
      style="width: 100px"
    >
      <div  >
        {{ msg }}
      </div>
    </Marquee>
  </div>
</template>

<script setup lang="ts">
import Marquee from 'src/components/marquee/Marquee.vue';
defineProps<{
  msg: string
}>()
</script>

<style lang="scss" scoped>
.panel-bg{
  background: linear-gradient(90deg, #181a20 0%, #313237 20%);;
}
</style>
