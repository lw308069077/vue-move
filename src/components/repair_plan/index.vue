<template>
    <div class="repair-plan">
        <!-- <x-header :left-options="{backText: ''}">我的资产</x-header> -->
        <group class="first-group">
          <cell title="资产编码" value-align="left" @click.native="link">{{repairsInfo.tId}}</cell>
          <cell title="资产名称" value-align="left">{{repairsInfo.zcName}}</cell>
          <cell title="品牌" value-align="left">{{repairsInfo.model}}</cell>
          <cell title="规格配置" value-align="left">{{repairsInfo.config}}</cell>
        </group>

        <group title="维修处理信息" class="other-group">
          <cell title="报修时间" value-align="left">{{repairsLog.createDate}}</cell>
          <cell title="处理进度" value-align="left">{{repairsLog.status}}</cell>
          <cell title="处理人" v-if="repairsLog.status==='4'" value-align="left">{{repairsLog.conductor}}</cell>

          <cell title="故障描述" value-align="left">{{repairsLog.conductorDesc}}</cell>
          <cell title="故障类型" v-if="repairsLog.status==='4'" value-align="left">{{repairsLog.conductorType}}</cell>
          <cell title="故障原因" v-if="repairsLog.status==='4'" value-align="left">{{repairsLog.conductorCause}}</cell>
          <cell title="处理结果" v-if="repairsLog.status==='4'" value-align="left">{{repairsLog.conductorResult}}</cell>
        </group>

        <group title="满意度评价" class="other-group" v-if="repairsLog.status==='4'">
          <cell title="满意度" value-align="left">
            <span class="radio-box">
              <input type="radio" id="item1" name="item" v-model="params.commentType" checked value="1">
              <label for="item1"></label>
              <span>满意</span>
            </span>
            <span class="radio-box">
              <input type="radio" id="item2" name="item" v-model="params.commentType" value="2">
              <label for="item2"></label>
              <span>不满意</span>
            </span>
          </cell>
            <x-textarea  v-if="params.commentType==='2'" v-model="params.commentDesc" title="原因说明" :max="200" placeholder="请输入引起您不满的原因，后续将作为我们改善服务的参考" :show-counter="false" :height="200" :rows="8" :cols="30"></x-textarea>
        </group>

        <box class="btnBox" v-if="repairsLog.status==='4'">
          <x-button action-type="button" @click.native="subEvaluate">提交评价</x-button>
        </box>
    </div>
</template>
<script>
import { XHeader, Group, Cell, Box, XTextarea, CheckIcon, XButton } from "vux"
import api from './api'

export default {
  mixins: [api],
  components: {
    XHeader,
    Group,
    Cell,
    Box,
    XTextarea,
    CheckIcon,
    XButton
  },
  data() {
    return {
      datas:{},
      repairsInfo: {},
      repairsLog: {},
      params: {
        commentType:	'1',
        commentDesc: ''
      }
    };
  },
  async created(){
    this.refresh()
  },
  methods: {
    // 获取资产报修进度
    async refresh () {
      this.datas = await this.getRepair(this.$route.query.zcId)
    },
    link() {
      this.$router.push({ path: "/resourceInfo" });
    },
    // 提交评价
    async subEvaluate() {
        try {
          await this.postSatisfaction(this.$route.query.zcId, this.params)
          console.log('提交成功')
        } catch (err) {
          console.log(err)
        }
    },
  },
  watch: {
    datas: function () {
      this.repairsInfo = this.datas.repairsInfo
      this.repairsLog = this.datas.repairsLog
    }
  }
};
</script>
<style lang="less">
.repair-plan {
  margin-bottom: 70px;
  margin-top: -21px;
  s .weui-cell__ft.vux-cell-align-left {
    padding-left: 30px;
  }
  .vux-cell-value {
    color: #8492a6;
  }
  .weui-cell__bd {
    padding-left: 30px;
  }
  .weui-cell__ft span {
    color: #8492a6;
  }
  .weui-textarea {
    color: #8492a6;
  }
  textarea::-webkit-input-placeholder {
    color: #8492a6;
  }

  .btnBox {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    padding: 10px 0;
    button {
      width: 90%;
      margin-left: 5%;
    }
  }

  .radio-box {
    position: relative;
    height: 30px;
    line-height: 30px;
    display: inline-block;

    input[type="radio"] {
      width: 20px;
      height: 20px;
      opacity: 0;
    }

    label {
      position: absolute;
      left: 5px;
      top: 3px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #999;
    }

    /*设置选中的input的样式*/
    /* + 是兄弟选择器,获取选中后的label元素*/
    input:checked + label {
      background-color: #20a0ff;
      border: 1px solid #20a0ff;
    }

    input:checked + label::after {
      position: absolute;
      content: "";
      width: 5px;
      height: 10px;
      top: 3px;
      left: 6px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg);
    }

    span {
      margin: 0 10px;
    }
  }
}
</style>
