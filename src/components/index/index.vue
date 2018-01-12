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
        <group title="维修中" class="first-group">
          <cell v-for="(item,index) in repairingList" :key="index" :title="item.zcName" is-link @click.native="$router.push({path:'repairplan',query: { zcId:item.id, status:item.status }})">
            {{formatDateTime(item.createDate,'yyyy-mm-dd')}}
          </cell>
        </group>
        <group title="维修完成待评价" class="other-group">
          <cell v-for="(item,index) in repairedList" :key="index" :title="item.zcName" is-link @click.native="$router.push({path:'repairplan',query: { zcId:item.id, status:item.status }})">
            {{formatDateTime(item.finishDate,'yyyy-mm-dd')}}
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
      emplNo: '15726',
      total: 0,
      pageNo: 1, // 当前页码
      pageSize: 10, // 每页记录数
      datas: {},
      repairingList: [],
      repairedList: []
    }
  },
  async created () {
    this.refresh()
    console.log()
  },
  methods: {
    formatDateTime,
    // 获取所有的维修资产状态
    async refresh () {
      this.datas = await this.getRepaires(this.emplNo)
    },
    richScan () {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxf04356047e9220da', // 必填，公众号的唯一标识
        timestamp: '1515654478', // 必填，生成签名的时间戳
        nonceStr: 'b831f961-2f13-4628-b942-dea1ef1b1e18', // 必填，生成签名的随机串
        signature: 'b986535bcf5b2c015dd7f7bafc9c2343df6f07d1', // 必填，签名，见附录1
        jsApiList: [
          'scanQRCode'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
