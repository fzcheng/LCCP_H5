<template>
  <div  ref="marquee" class="flex no-wrap overflow-hidden">
    <div ref="content" class="content-marquee flex no-wrap">
      <slot></slot>
    </div>
    <div class="content-marquee q-ml-md flex no-wrap" v-for="(item, index) in nums" :key="index">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onActivated, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue';
import { AdoptedStyleItem, useAdoptedStyle } from 'src/hooks/adoptedStyle';
import { useIncrementId, IdKey } from 'src/hooks/incrementId';

const content = ref<HTMLElement>();
const marquee = ref<HTMLElement>();
const props = defineProps<{
  loading: boolean
}>()
const width = ref(0)

watch(() =>props.loading, (val) => {
  if (val) {
    nextTick(init)
  }
})
const nums = ref(0)
let style: AdoptedStyleItem

const init = () => {
  if (props.loading) return;
  if (!content.value || !marquee.value) return;
  const contentWidth = content.value.scrollWidth;
  const marqueeBoxWidth = marquee.value.getBoundingClientRect().width;
  width.value = marqueeBoxWidth;
  const MaxNum = contentWidth ? (Math.ceil(marqueeBoxWidth / contentWidth) * 2) - 1 : 0
  nums.value = marqueeBoxWidth > contentWidth ? MaxNum : 1
  // marquee.value.appendChild(content.value.cloneNode(true));
  const idStr = useIncrementId(IdKey.marqueeKey).getId().toString();
  if (style) useAdoptedStyle().removeSheet(style)
  const speedTemp =  contentWidth / 800 > 1 ? 14000 * (contentWidth / 800) : 1400
  const speed = speedTemp / (nums.value > 0 ? nums.value : 1)
  const anmTime = speed > 500 ? speed : 500
  style = useAdoptedStyle().createSheet(`
    @keyframes sroll-marquee-${idStr} {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(-${content.value.scrollWidth + (nums.value > 0 ? 16 : 0)}px, 0);
      }
    }
  `).insertRule(`
    .content-marquee {
      animation: sroll-marquee-${idStr} ${anmTime}ms linear 0s infinite;
    }
  `).toSheet();
  useAdoptedStyle().addSheet(style);
};

onUpdated(init);

onMounted(init);

onActivated(()=>{
  init();
})

onUnmounted(() => {
  if (style) useAdoptedStyle().removeSheet(style)
})
defineExpose({
  width
})

</script>

<style lang="scss" scoped>
.content-marquee {
  white-space: nowrap;
}
</style>
