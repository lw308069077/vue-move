<template>
    <div class="resource-info-content">
        <!-- <x-header :left-options="{backText: ''}">资产信息</x-header> -->
        <tab>
          <tab-item selected @on-item-click="onItemClick">基本信息</tab-item>
          <tab-item @on-item-click="onItemClick"  v-if="baseInfoDatas.isZcAdmin">使用记录</tab-item>
          <tab-item @on-item-click="onItemClick"  v-if="baseInfoDatas.isZcAdmin">购置记录</tab-item>
          <tab-item @on-item-click="onItemClick"  v-if="baseInfoDatas.isZcAdmin">维修记录</tab-item>
        </tab>

        <div v-if="index == 0">
          <base-info :datas="baseInfoDatas"></base-info>
        </div>
        <div v-if="index == 1">
          <use-logs></use-logs>
        </div>
        <div v-if="index == 2">
          <buys-log></buys-log>
        </div>
        <div v-if="index == 3">
          <repair-logs></repair-logs>
        </div>
    </div>
</template>
<script>
import BaseInfo from './children/base_info'
import BuysLog from './children/buys_log'
import RepairLogs from './children/repair_logs'
import UseLogs from './children/use_logs'
import {Tab, TabItem} from 'vux'

export default {
  components: {
    Tab,
    TabItem,
    BaseInfo,
    BuysLog,
    RepairLogs,
    UseLogs
  },
  data () {
    return {
      index: 0,
      baseInfoDatas: {
        tdId: 'G002-01732',
        zcName: '台式电脑—主机',
        model: '联想',
        config: 'Y450 4G+500G',
        oneClass: '电子产品',
        twoClass: '电脑',
        isZcAdmin: 1,
        bxClassId: '2343'
      }
    }
  },
  methods: {
    // tab切换
    onItemClick (index) {
      this.index = index
    }
  }
}
</script>
<style lang="less">
.resource-info-content {
  .weui-cell__ft.vux-cell-align-left {
    padding-left: 30px;
  }
  .btnBox {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    button {
      width: 90%;
      margin-left: 5%;
      margin-bottom: 10px;
    }
  }
  .weui-cells {
    margin-top: 0;
  }
  .weui-cells:before {
    border-top: none;
  }
  .weui-cells__title {
    border-bottom: 1px solid #d9d9d9;
  }
  .texTareaBox {
    margin-top: 20px;
  }
  .title {
    padding: 15px;
  }
  .content {
      font-size:20px;
      margin-bottom: 10px;
    }
    .msg {
      font-size: 10px;
    }
}
</style>
