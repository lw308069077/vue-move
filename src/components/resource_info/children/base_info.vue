<template>
    <div class="base-info">
        <group class="first-group">
            <cell title="资产编码" value-align="left">{{datas.tdId}}</cell>
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
              <popup-picker title="故障描述" :data="list1" value-text-align="left" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="点击选择问题描述"></popup-picker>
              <x-textarea  v-if="value1=='其他'" title="说明" :max="200" placeholder="请输入故障内容" :show-counter="false" :height="200" :rows="8" :cols="30"></x-textarea>
            </group>

            <box class="btnBox">
              <flexbox>
                <flexbox-item>
                  <x-button @click.native="showPlugin">确定报修</x-button>
                </flexbox-item>
                <flexbox-item>
                  <x-button @click.native="showTextarea=false" class="cancel">取消</x-button>
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
  TransferDomDirective as TransferDom
} from "vux";
export default {
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
    TransferDom
  },
  props: {
    datas: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value1: ["点击选择问题描述"],
      list1: [["小米", "iPhone", "华为", "情怀", "三星", "其他", "不告诉你"]],
      showTextarea: false,
      showToast: false,
      list: [{ key: "gd", value: "点击选择问题描述" }, { key: "gx", value: "描述一" }],
      defaultValue: "gd"
    };
  },
  methods: {
    doShowToast() {
      this.showToast = true;
      // this.$vux.toast.show({
      //   text: 'toast'
      // })
    },
    showPlugin() {
      AlertModule.show({
        title: "报修成功",
        content:
          '<p class="content">维修人员将会在1个工作日内进行处理</p><p class="ps">提示：如遇紧急故障情况，请拨打IT运维热线[66666]与IT人员沟通详细情况以及时获取反馈</p>',
        onShow() {
          console.log("Module: I'm showing");
        },
        onHide() {
          console.log("Module: I'm hiding now");
        }
      });
    },
    // 报修
    repairs() {
      // console.log(this.showTextarea)
      this.showTextarea = !this.showTextarea;
      console.log(this.showTextarea);
    },
    //问题描述选择
    onChange(val) {
      console.log("val change", val);
    },
    onShow() {
      console.log("on show");
    },
    onHide(type) {
      console.log("on hide", type);
    }
  }
};
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
</style>
