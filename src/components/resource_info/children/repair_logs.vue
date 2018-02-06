<template>
    <div class="repair-logs">
      <Scroller lock-x height="1"
        @on-scroll-bottom="onScrollBottom"
        ref="scrollerBottom">
        <div>
          <group v-for="(item,index) in dataList" :key="index" :class="!index?'first-group':'other-group'">
            <cell title="维修时间" value-align="left">{{item.repaireTime}}</cell>
            <cell title="报 修 人" value-align="left">{{item.userName}}</cell>
            <cell title="处 理 人" value-align="left">{{item.conductorName?(item.conductorName+"["+item.conductor+"]"):"暂无"}}</cell>
            <cell title="故障描述" value-align="left">{{item.conductorDesc}}</cell>
            <cell title="故障类型" value-align="left">{{item.conductorType==="其他"?item.conductorTypeOther:item.conductorType}}</cell>
            <cell title="故障原因" value-align="left">{{item.conductorCause==="其他"?item.conductorCauseOther:item.conductorCause}}</cell>
            <cell title="处理结果" value-align="left">{{item.conductorResult==="其他"?item.conductorResultOther:item.conductorResult}}</cell>
          </group>
          <load-more v-show="dataList.length" class="load" :tip="dataList.length < totalCount? '↑ 往上滑加载更多' : '没有更多数据了' "
              :show-loading="dataList.length < totalCount">
          </load-more>
        </div>
      </Scroller>
      <div class="empty-info" v-if="!totalCount">
        暂时还没有资产维修记录
      </div>
      <div>
          <loading :show="isShow" :text="text"></loading>
      </div>
    </div>
</template>
<script>
    import api from '../api'
    import { Group, Cell, Scroller, LoadMore, Loading} from 'vux'
    export default{
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
          totalCount: 1,
          isShow: false,
          text: '',
          datas: {},
          dataList: [],
          isScroll: false,
          pageNo: 1,
          pageSize: 10
        }
      },
      created () {
        this.refresh()
      },
      computed: {

      },
      methods: {
        async refresh () {
          this.$vux.loading.show({
            text: '加载中...'
          })
          this.datas = await this.getRepairesLogs(this.$route.query.zcId)
          this.totalCount = this.datas.page
          this.isShow = false
          this.$vux.loading.hide()
          if (this.datas.data.length) {
            let middleArr = this.datas.data
            this.dataList.push(...middleArr)
            this.isScroll = this.dataList.length === this.totalCount
          }
        },
        async onScrollBottom () {
          if (!this.isScroll) {
            this.isScroll = true
            if (this.totalCount > 10 || this.dataList.length < this.totalCount) {
              this.pageNo++
              this.refresh()
            }
          }
        }
      }
    }
</script>
<style lang="less">

</style>
