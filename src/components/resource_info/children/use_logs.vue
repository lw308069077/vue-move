<template>
    <div class="use-logs">
      <Scroller lock-x height="1"
        @on-scroll-bottom="onScrollBottom"
        ref="scrollerBottom">
        <div>
          <group v-for="(item,index) in dataList" :key="index" :class="!index?'first-group':'other-group'">
              <cell title="使用时间" value-align="left">{{item.startTime + '~'+item.endTime}}</cell>
              <cell title="使 用 人" value-align="left">{{item.emplName}}</cell>
              <cell title="所属部门" value-align="left">{{item.depName}}</cell>
              <cell title="存放位置" value-align="left">{{item.place}}</cell>
              <cell title="归属账套" value-align="left">{{item.ownaccountName}}</cell>
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
          this.datas = await this.getUseLogs(this.$route.query.zcId)
          this.totalCount = this.datas.page
          this.isShow = false
          this.$vux.loading.hide()
          if (this.datas.data.length) {
            let middleArr = this.datas.data
            this.dataList.push(...middleArr)
            console.log(this.dataList)
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
