<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="">
      <q-tabs
        no-caps
        active-class="tabcolor"
        indicator-color="transparent"
        style="background-color: #191a1f; color: #747682"
        class=""
      >
        <q-route-tab v-for="item in tabs" :key="item.path"  class="q-py-xs "   :to="item.path" replace >
          <div>
            <q-img
              :src="activeTab === item.name ? item.activeIcon : item.icon"
              style="width: 22px; height: 22px;"
              class="q-mb-xs"
              no-spinner
              fit="contain"
              no-transition
            />
            <div class="text-center">{{ item.label }}</div>
          </div>
         </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import tab1Png from "src/assets/images/index/tab1.png";
import tab1ActivePng from "src/assets/images/index/tab1_active.png";
import tab2Png from "src/assets/images/index/tab2.png";
import tab2ActivePng from "src/assets/images/index/tab2_active.png";
import tab3Png from "src/assets/images/index/tab3.png";
import tab3ActivePng from "src/assets/images/index/tab3_active.png";
import tab4Png from "src/assets/images/index/tab4.png";
import tab4ActivePng from "src/assets/images/index/tab4_active.png";


const router = useRouter();

const tabs = [
  {
    path: "/",
    icon: tab1Png,
    activeIcon: tab1ActivePng,
    label: "Inicio",
    name: "IndexPage"
  },
  {
    path: "/orden",
    icon: tab2Png,
    activeIcon: tab2ActivePng,
    label: "Orden",
    name: "OrdenPage"
  },
  {
    path: "/eqipo",
    icon: tab3Png,
    activeIcon: tab3ActivePng,
    label: "Equipo",
    name: "EqipoPage"
  },
  {
    path: "/mi",
    icon: tab4Png,
    activeIcon: tab4ActivePng,
    label: "Mi",
    name: "MiPage"
  }
]


const activeTab = computed(() => {
  return tabs.find(tab => tab.path === router.currentRoute.value.path)?.name || "IndexPage";
});






</script>


<style lang="scss" scoped>
.tabcolor {
  color: #fb931e;
}
</style>
