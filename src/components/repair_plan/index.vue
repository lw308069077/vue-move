<template>
    <div class="repair-plan">
        <group class="first-group">
          <cell title="资产编码" value-align="left">{{repairsInfo.tId}}</cell>
          <cell title="资产名称" value-align="left">{{repairsInfo.zcName}}</cell>
          <cell title="品牌" value-align="left">{{repairsInfo.model}}</cell>
          <cell title="规格配置" value-align="left">{{repairsInfo.config}}</cell>
        </group>

        <group title="维修处理信息" class="other-group">
          <cell title="报修时间" value-align="left">{{repairsLog.createDate}}</cell>
          <cell title="处理进度" value-align="left">{{statusMap[repairsLog.status-1]}}</cell>
          <cell title="处理人" v-if="repairsLog.status===REPAIREDUNCOMMENT" value-align="left">{{repairsLog.conductorName+"["+repairsLog.conductor+"]"}}</cell>

          <cell title="故障描述" value-align="left">{{repairsLog.conductorDesc}}</cell>
          <cell title="故障类型" v-if="repairsLog.status===REPAIREDUNCOMMENT" value-align="left">{{repairsLog.conductorType==="其他"?repairsLog.conductorTypeOther:repairsLog.conductorType}}</cell>
          <cell title="故障原因" v-if="repairsLog.status===REPAIREDUNCOMMENT" value-align="left">{{repairsLog.conductorCause==="其他"?repairsLog.conductorCauseOther:repairsLog.conductorCause}}</cell>
          <cell title="处理结果" v-if="repairsLog.status===REPAIREDUNCOMMENT" value-align="left">{{repairsLog.conductorResult==="其他"?repairsLog.conductorResultOther:repairsLog.conductorResult}}</cell>
        </group>

        <group title="满意度评价" class="other-group" v-if="repairsLog.status==='3'">
          <cell value-align="left">
            <template slot="title">
              <span style="color:red">*</span>
              <span>满意度</span>
            </template>
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
            <x-textarea  v-if="params.commentType==='2'" v-model="params.commentDesc"  :max="200" placeholder="请输入引起您不满的原因，后续将作为我们改善服务的参考" :show-counter="false" :height="200" :rows="8" :cols="30">   
              <template slot="label">
                <span style="color:red">*</span>
                <span>原因说明</span>
              </template>
            </x-textarea>
        </group>
        <toast v-model="showPositionValue" :text="info" :position="toast_position" type="text" :time="2000" width="auto"></toast>

        <box class="btnBox" v-if="repairsLog.status===REPAIREDUNCOMMENT">
          <x-button action-type="button" @click.native="subEvaluate">提交评价</x-button>
        </box>
    </div>
</template>
<script>
import { XHeader, Group, Cell, Box, XTextarea, CheckIcon, XButton, AlertModule, Toast } from 'vux'
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
    XButton,
    AlertModule,
    Toast
  },
  data () {
    return {
      datas: {},
      repairsInfo: {},
      repairsLog: {},
      params: {
        commentType: '1',
        commentDesc: ''
      },
      showPositionValue: false,
      REPAIREDUNCOMMENT:'3', //维修完成待评价
      info: '',
      toast_position: 'middle',
      statusMap:['一级处理中','二级处理中','维修完成待评价','已完成']
    }
  },
  async created () {
    this.refresh()
  },
  methods: {
    // 获取资产报修进度
    async refresh () {
      this.datas = await this.getRepair(this.$route.query.zcId)
      console.log('ppppp',this.datas)
    },
    verify () {
      if (!this.params.commentType) { return '请选择满意度情况' }
      if (this.params.commentType === '2' && !this.params.commentDesc) { return '请输入不满意的原因' }
      return ''
    },
    // 提交评价
    async subEvaluate () {
      console.log(this.params)
      let result = this.verify()
      if (result) {
        this.showPositionValue = true
        this.info = result
      } else {
        let str = await this.postSatisfaction(this.$route.query.zcId, this.params)
        if (str === 1) {
          AlertModule.show({
            title: '提交满意度成功'
          // content: `<div class="content">维修人员将会在1个工作日内进行处理</div><div class="ps">提示：如遇紧急故障情况，请拨打IT运维热线[<a class="a-style" href="tel:13888888888">13888888888</a>]与IT人员沟通详细情况以及时获取反馈</div>`
          })
        }
      }
    }
  },
  watch: {
    datas: function () {
      this.repairsInfo = this.datas.repairsInfo
      this.repairsLog = this.datas.repairsLog
    }
  }
}
</script>
<style lang="less">
.repair-plan {
  margin-bottom: 70px;
  margin-top: -21px;
  .weui-cell__ft.vux-cell-align-left {
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
