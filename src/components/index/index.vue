<template>
    <div class="index-content">
        <grid>
          <grid-item link="/myResource">
            <div class="iconBox">
              <i class="iconfont">&#xe790;</i>
            </div>
            <span class="grid-center">我的资产</span>
          </grid-item>
          
          <grid-item  @click.native="richScan">
            <div class="iconBox">
              <i class="iconfont">&#xe7da;</i>
            </div>
            <span class="grid-center">扫一扫</span>
          </grid-item>

          <grid-item link="/personal">
            <div class="iconBox">
              <i class="iconfont">&#xe612;</i>
            </div>
            <span class="grid-center">个人中心</span>
          </grid-item>
        </grid>
        <group title="维修中" class="first-group" v-if="repairingList.length>0">
          <cell v-for="(item,index) in repairingList" :key="index" :title="item.zcName" is-link @click.native="$router.push({path:'repairplan',query: { zcId:item.id, status:item.status }})">
            {{formatDateTime(item.createDate,'yyyy-mm-dd')}}
          </cell>
        </group>
        <group title="维修完成待评价" class="other-group" v-if="repairedList.length>0">
          <cell v-for="(item,index) in repairedList" :key="index" :title="item.zcName" is-link @click.native="$router.push({path:'repairplan',query: { zcId:item.id, status:item.status }})">
            {{formatDateTime(item.createDate,'yyyy-mm-dd')}}
          </cell>
        </group>
  </div>
</template>

<script>
import { XHeader, Grid, GridItem, GroupTitle, Icon, Group, Cell } from 'vux'
import api from './api'
import {formatDateTime} from 'tool/tool'

export default {
  mixins: [api],
  components: {
    XHeader,
    Grid,
    GridItem,
    GroupTitle,
    Icon,
    Group,
    Cell
  },
  data () {
    return {
      emplNo: '',
      total: 0,
      pageNo: 1, // 当前页码
      pageSize: 10, // 每页记录数
      datas: {},
      repairingList: [],
      repairedList: []
    }
  },
  async created () {
    this.emplNo = window.sessionStorage.getItem('emplNo')
    await this.refresh()
    console.log(this.emplNo)
  },
  methods: {
    formatDateTime,
    // 获取所有的维修资产状态
    async refresh () {
      this.datas = await this.getRepaires(this.emplNo,this.pageNo,this.pageSize)
    },
    async richScan () {
      let vm = this
      // var signMap = JSON.parse(window.sessionStorage.getItem('signMap'))
      let url = window.location.href.split('#')[0]
      let sign = await this.getSign(url)
        // console.log('aaaaaaa',res)
        console.log('sign',sign)
        wx.config({
          beta: true,
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: sign.appId, // 必填，公众号的唯一标识
          timestamp: sign.timestamp, // 必填，生成签名的时间戳
          nonceStr: sign.nonceStr, // 必填，生成签名的随机串
          signature: sign.signature, // 必填，签名，见附录1
          jsApiList: [
            'scanQRCode'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function () {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          console.log('验证成功')
          wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                // 回调
              console.log(res)
              alert(res)
              let result = res.resultStr
              vm.getRichScan(vm.emplNo,result)
            },
            error: function (res) {
              if (res.errMsg.indexOf('function_not_exist') > 0) {
                console.log('版本过低请升级')
              }
            }
          })
        })
        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          console.log('验证失败',res)
        })
    }
  },
  watch: {
    datas: function () {
      this.total = this.datas.page
      this.repairingList = this.datas.repairingList
      this.repairedList = this.datas.repairedList
    }
  }
}
</script>

<style lang="less">
.index-content {
  .iconBox {
    text-align: center
  }
  .vux-label{
    width:120px !important;
  }
  .vux-x-icon {
    fill: #1AAD19;
  }
  a {
    text-decoration: none;
  }
  .weui-grid:before {
    border:0;
  }
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .iconfont {
    font-size:40px;
    color:#20a0ff;
  }
}
</style>
