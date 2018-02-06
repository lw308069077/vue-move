<template>
    <div class="my-resource-content">
      <Scroller lock-x
            @on-scroll-bottom="onScrollBottom"
            ref="scrollerBottom">
          <div>
            <group v-for="(item,index) in dataList" :key="index" :class="!index?'first-group':'other-group'">
              <cell title="资产名称" value-align="left" @click.native="$router.push({path: '/resourceInfo',query: { zcId:item.zcId }})" is-link>{{item.zcName}}</cell>
              <cell title="领用日期" value-align="left">{{item.receiveDate}}</cell>
            </group>
            <load-more class="load" :tip="dataList.length < totalCount? '↑ 往上滑加载更多' : '没有更多数据了' ">
            </load-more>
          </div>
      </Scroller>
      <div class="empty-info" v-if="!totalCount">
        您目前暂时还没有领用中的资产
      </div>
      <div>
          <loading :show="$root.$data._loading.status" :text="text"></loading>
      </div>
    </div>
</template>
<script>
import { Group, Cell, Scroller, LoadMore, Loading} from 'vux'
import api from './api'

export default {
  mixins: [api],
  components: {
    Group,
    Cell,
    Scroller,
    LoadMore,
    Loading
  },
  data () {
    return {
      emplNo: '',
      pageNo: 1, // 当前页码
      pageSize: 10, // 每页记录数
      totalCount: 0,
      isShow: false,
      text: '',
      datas: {},
      dataList: [],
      isScroll: false   // 判断是否已经没有数据了
    }
  },
  async created () {
    this.emplNo = window.sessionStorage.getItem('emplNo')
    this.refresh()
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.$refs.scrollerBottom.reset({top: 0})
    // })
  },
  methods: {
    async refresh () {
      console.log(1111111111)
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.datas = await this.getMyResources(this.emplNo, this.pageNo, this.pageSize)
      this.totalCount = this.datas.page
      this.isShow = false
      this.$vux.loading.hide()
      if (this.datas.data.length) {
        let middleArr = this.datas.data
        this.dataList.push(...middleArr)
        console.log('xxxxx', this.dataList)
        this.$nextTick(() => {
          this.$refs.scrollerBottom.reset()
        })
        this.isScroll = this.dataList.length === this.totalCount
      }
    },
    async onScrollBottom () {
      if (!this.isScroll) {
        this.isScroll = true
        if (this.dataList.length < this.totalCount) {
          this.pageNo++
          await this.refresh()
        }
      }
    }
    // async pulldownEvent(){
    //   console.log('pulldown')
    //   if(this.pageNo > 1){
    //     this.pageNo--
    //     await this.refresh()
    //   }
    // }
  },
  watch: {
    datas: function () {
      // this.dataList = this.datas.data
      this.totalCount = this.datas.page
    }
  }
}
</script>
<style lang="less">
.my-resource-content {
  margin-top: -21px;
    .weui-cell__ft.vux-cell-align-left {
        padding-left: 30px;
    }
}
</style>
