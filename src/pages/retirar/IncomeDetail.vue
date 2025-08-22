<template>
  <q-dialog v-model="dialog">
    <div class="full-width bg-[#669D5A] py-4 px-2" style="border-radius: 12px !important">
      <div class="header-container">
        <div class="text-white text-center text-bold">Ganancia prod</div>
        <!-- 使用图片作为关闭按钮 -->
        <img 
          src="~/assets/images/public/close.png"
          alt="Close" 
          class="close-btn"
          @click="dialog = false"
        />
      </div>
      <!-- 添加表格 -->
      <div class="box-container">
        <div class="bottom text-center">
             {{ gInfo?.goods_name }}
        </div>
        <div class="grid grid-cols-2 text-center">
            <div class="bottom mid ">Ganancia diaria</div>
            <div class="bottom">M${{ gInfo?.day_send_money ?? '0' }}</div>
            <div class="bottom mid">Desbloqueo diario</div>
            <div class="bottom">M${{ gInfo?.day_income ?? '0' }}</div>
            <!-- <div class="bottom mid">Restante</div>
            <div class="bottom">{{ gInfo?.surplus_time ?? '' }}</div> -->
            <div class="bottom mid">Comisión 1er nivel</div>
            <div class="bottom">{{ !gInfo?.site_y_rebate ? '0%' : gInfo.site_y_rebate+ '%' }}</div>
            <div class="bottom mid">Comisión 2do nivel</div>
            <div class="bottom">{{ !gInfo?.site_e_rebate ? '0%' : gInfo.site_e_rebate+ '%' }}</div>
            <div class="mid">Comisión 3er nivel</div>
            <div class="">{{ !gInfo?.site_s_rebate ? '0%' : gInfo.site_s_rebate+ '%' }}</div>
        </div>
      </div>
        <q-btn
            color="primary"
            text-color="black"
            unelevated
            class="full-width q-mt-lg q-mb-xs"
            no-caps
            style="font-size: 16px; border-radius: 8px; font-weight: bold"
            @click="go"
        >
            UP
         <img 
          src="~/assets/images/home/up.png"
          alt="" 
          style="width: 12px;"
        />
        </q-btn>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { BigNumber } from 'bignumber.js';
import { ref, watch } from 'vue';
import { GInfoItem } from '../home/typings';
import { useRouter } from 'vue-router';

const dialog = ref(false);
const gInfo = ref<GInfoItem>();
const router = useRouter()
const show = (_gInfo: GInfoItem) => {
    gInfo.value = _gInfo;
    dialog.value = true;
};

const close = () => {
  dialog.value = false;
};

const go = () => {
  dialog.value = false;
  router.push('/')
};

defineExpose({ show });
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  padding: 0 8px;

  .text-white.text-center.text-bold {
    flex: 1; // 使文字部分占据剩余空间，实现整行居中
    text-align: center;
  }

  .close-btn {
    cursor: pointer;
    width: 20px; // 根据实际图片大小调整
    height: 20px; // 根据实际图片大小调整
    margin-left: auto; // 将按钮推到右侧
  }
}

.box-container { 
    border: 2px solid yellow;
    border-radius: 8px;
    margin-top: 20px;
    .bottom{
        border-bottom: 2px solid yellow;
    }
    .top{
        border-top: 2px solid yellow;
    }
    .mid{
        border-right: 2px solid yellow;
    }
}

.income-table {
  width: 100%;
  /* 移除 border-collapse: collapse */
  margin-top: 20px;
  // 表格外边框设置为黄色
  border: 1px solid yellow;
  // 添加圆角
  border-radius: 8px;
  // 隐藏表格在圆角处的边框冲突
  overflow: hidden;
  border-spacing: 0; /* 确保单元格之间没有间距 */
  
  tr{
    text-align: center;
  }
  th, td {
    padding:3px;
    text-align: center;
    font-size: 12px;
    // 单元格边框设置为黄色
    border: 1px solid yellow;
  }
  
  th {
    // background-color: #2d303e;
    font-weight: bold;
  }
  
  tr:hover {
    // background-color: #2d303e;
  }
  
  /* 特别处理表头第一列和最后一列的圆角 */
  thead tr:first-child th:first-child {
    border-top-left-radius: 8px;
  }
  
  thead tr:first-child th:last-child {
    border-top-right-radius: 8px;
  }
  
  /* 特别处理表体最后一行单元格的圆角 */
  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
  }
  
  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
  }
}
</style>