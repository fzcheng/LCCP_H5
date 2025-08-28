<template>
  <q-dialog v-model="dialog">
    <div class="full-width bg-[#669D5A] py-4 px-2" style="border-radius: 12px !important">
      <div class="header-container">
        <div class="text-white text-center text-bold">Salario diario</div>
        <!-- 使用图片作为关闭按钮 -->
        <img 
          src="~/assets/images/public/close.png"
          alt="Close" 
          class="close-btn"
          @click="dialog = false"
        />
      </div>
      <div class="grid grid-cols-4 mt-4">
        <div class="col-span-1 text-center border-[#FFC31A] border-t-[2px] border-r-[1px] border-b-[1px] border-l-[2px] py-1 rounded-tl-xl">
            Puesto
        </div>
        <div class="col-span-3 text-center border-[#FFC31A] border-t-[2px] border-r-[2px] border-b-[1px] border-l-[1px] py-1 rounded-tr-xl">
            Sueldo diario
        </div>
        <div class="col-span-2 text-center ">
            <div v-for="(item,index) in gList" class="grid grid-cols-2">
                <div class="border-[#FFC31A] border-t-[1px] border-r-[1px] border-l-[2px] py-1 flex flex-col items-center" :class="index == gList.length - 1 ? 'border-b-[2px] rounded-bl-xl' : 'border-b-[1px]'">
                    <q-img
                        :src="item.goods_pic"
                        :ratio="1"
                        spinner-color="primary"
                        spinner-size="20px"
                        width="40px"
                        height="40px"
                        class=""
                        style="border-radius: 6px"
                    />
                    {{ item.goods_name }}
                </div>
                <div class="flex items-center justify-center border-[#FFC31A] border-t-[1px] border-r-[1px] border-l-[1px] py-1" :class="index == gList.length - 1 ? 'border-b-[2px]' : 'border-b-[1px]'">
                    M${{ item.day_income ?? '0' }}
                </div>
            </div>
        </div>
        <div class="col-span-2 text-center flex items-center justify-center border-[#FFC31A] border-t-[1px] border-r-[2px] border-b-[2px] border-l-[1px] rounded-br-xl">
            Todos los dias a las 12:30
        </div>
      </div>
      <!-- 添加表格 -->
      <!-- <div class="box-container">
        <div class="bottom text-center">
             {{ gInfo?.goods_name }}
        </div>
        <div class="grid grid-cols-2 text-center">
            <div class="bottom mid ">Ganancia diaria</div>
            <div class="bottom">M${{ gInfo?.day_send_money ?? '0' }}</div>
            <div class="bottom mid">Desbloqueo diario</div>
            <div class="bottom">M${{ gInfo?.day_income ?? '0' }}</div>
            <div class="bottom mid">Comisión 1er nivel</div>
            <div class="bottom">{{ !gInfo?.site_y_rebate ? '0%' : gInfo.site_y_rebate+ '%' }}</div>
            <div class="bottom mid">Comisión 2do nivel</div>
            <div class="bottom">{{ !gInfo?.site_e_rebate ? '0%' : gInfo.site_e_rebate+ '%' }}</div>
            <div class="mid">Comisión 3er nivel</div>
            <div class="">{{ !gInfo?.site_s_rebate ? '0%' : gInfo.site_s_rebate+ '%' }}</div>
        </div>
      </div> -->
        <q-btn
            color="primary"
            text-color="black"
            unelevated
            class="full-width q-mt-lg q-mb-xs"
            no-caps
            style="font-size: 16px; border-radius: 8px; font-weight: bold"
            @click="go"
        >
            Quiero actualizarme
         <img 
          src="~/assets/images/home/up.png"
          alt="" 
          style="width: 12px;margin-left: 5px;"
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
const gList = ref<GInfoItem[]>([]);
const router = useRouter()
const show = (_gList: GInfoItem[]) => {
    gList.value = _gList;
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