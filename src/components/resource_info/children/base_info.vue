<template>
    <div class="base-info">
        <group class="first-group">
            <cell title="资产编码" value-align="left">{{datas.tId}}</cell>
            <cell title="资产名称" value-align="left">{{datas.zcName}}</cell>
            <cell title="品　　牌" value-align="left">{{datas.model}}</cell>
            <cell title="规格配置" value-align="left">{{datas.config}}</cell>
            <cell title="一级类型" value-align="left">{{datas.oneClass}}</cell>
            <cell title="二级类型" value-align="left">{{datas.twoClass}}</cell>
          </group>
          
          <box class="btnBox" v-if="!showTextarea">
            <x-button action-type="button" @click.native="repairs">报修</x-button>
          </box>
          <div v-if="showTextarea">
            <group title="报修信息" label-width="80px" class="other-group">
              <popup-picker :data="selectList" value-text-align="left" v-model="position" placeholder="点击选择问题描述">
                <template slot="title">
                  <span style="color:red">*</span>
                  <span>故障描述</span>
                </template>
              </popup-picker>
              <x-textarea  v-if="position=='其他'" :max="200" v-model="repair.userOther" placeholder="请输入故障内容" :show-counter="false" :height="200" :rows="8" :cols="30">
                <template slot="label">
                  <span style="color:red">*</span>
                  <span>说明</span>
                </template>
              </x-textarea>
            </group>
            <toast v-model="showPositionValue" :text="info" :position="toast_position" type="text" :time="2000" width="auto"></toast>

            <box class="btnBox">
              <flexbox>
                <flexbox-item>
                  <x-button @click.native="showPlugin">确定报修</x-button>
                </flexbox-item>
                <flexbox-item>
                  <x-button @click.native="cancel" class="cancel">取消</x-button>
                </flexbox-item>
              </flexbox>
            </box>
          </div>
    </div>
</template>

<script>
import {
  Group,
  Cell,
  XButton,
  Box,
  XTextarea,
  PopupPicker,
  AlertModule,
  Alert,
  Flexbox,
  FlexboxItem,
  TransferDomDirective as TransferDom,
  Toast
} from 'vux'
import api from './../api'

export default {
  mixins: [api],
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    XButton,
    Box,
    XTextarea,
    PopupPicker,
    AlertModule,
    Alert,
    Flexbox,
    FlexboxItem,
    TransferDom,
    Toast
  },
  props: {
    datas: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      emplNo: '15726',
      selectList: [],
      position: [],
      showTextarea: false,
      repair: {
        userId: '',
        classId: '',
        userDesc: '',
        userOther: ''
      },
      showPositionValue: false,
      info: '',
      toast_position: 'middle'
    }
  },
  async created () {},
  methods: {
    /* 获取基本信息 */
    async refresh () {
      // this.datas = await this.getBaseinfo(this.$route.query.zcId)
      // console.log(this.datas);
    },
    /* 故障描述选择项 */
    async getSelectList () {
      this.selectList = []
      this.selectList.push(
        await this.getErrordescriptions(this.datas.bxClassId)
      )
    },
    verify () {
      console.log(1111)
      console.log(this.position)
      if (!this.position.length) { return '请选择故障描述' }

      if (this.position[0] === '其他' && !this.repair.userOther) {
        return '问题描述不能为空'
      }
      return ''
    },
    cancel () {
      this.showTextarea = false
      this.position = []
      this.repair.userOther = ''
    },
    async showPlugin () {
      let result = this.verify()
      if (result) {
        this.showPositionValue = true
        this.info = result
      } else {
        this.repair.userId = this.emplNo
        this.repair.classId = this.datas.bxClassId
        this.repair.userDesc = this.position.toString()
        console.log(this.repair)

        let obj = await this.postSatisfaction(this.emplNo, this.$route.query.zcId, this.repair)
        if (obj === 1) {
          AlertModule.show({
            title: '报修成功',
            content: `<div class="content">维修人员将会在1个工作日内进行处理</div><div class="ps">提示：如遇紧急故障情况，请拨打IT运维热线[<a class="a-style" href="tel:13888888888">13888888888</a>]与IT人员沟通详细情况以及时获取反馈</div>`
          })
        }
      }
    },
    // 报修
    repairs () {
      this.showTextarea = !this.showTextarea
      this.getSelectList()
    }
  }
}
</script>
<style lang="less">
.base-info {
  .resource-info-content .weui-cells__title {
    border-bottom: 0;
  }
  .weui-cells__title {
    margin-top: 0;
    margin-bottom: 0;
  }
  .vux-popup-picker-select {
    padding-left: 30px;
  }
  .vux-cell-value {
    color: #8492a6;
  }
  .weui-cell__bd {
    padding-left: 30px;
  }
  .weui-label {
    padding-left: 8px;
  }
  .weui-textarea {
    color: #8492a6;
  }
  textarea::-webkit-input-placeholder {
    color: #8492a6;
  }
}
.content {
  margin-bottom: 20px;
}
.ps {
  font-size: 10px;
}
.a-style {
  color: #20a0ff;
}
</style>
