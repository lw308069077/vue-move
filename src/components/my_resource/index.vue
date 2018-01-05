<template>
    <div class="my-resource-content">
      <Scroller lock-x height="1"
            @on-scroll-bottom="onScrollBottom"
            ref="scrollerBottom">
          <div>
            <group v-for="(item,index) in dataList" :key="index" :class="!index?'first-group':'other-group'">
              <cell title="资产名称" value-align="left" @click.native="link">{{item.zcName}}</cell>
              <cell title="领用日期" value-align="left">{{item.receiveDate}}</cell>
            </group>
            <load-more v-show="dataList.length" class="load" :tip="dataList.length < totalCount? '↑ 往上滑加载更多' : '没有更多数据了' "
                :show-loading="dataList.length < totalCount" v-if=" totalCount > 10">
            </load-more>
          </div>
      </Scroller>
      <div class="empty-info" v-if="!totalCount">
        暂时还没有资产信息记录
      </div>
    </div>
</template>
<script>
import { XHeader, Group, Cell, Scroller, LoadMore } from 'vux'

export default {
  components: {
    XHeader,
    Group,
    Cell,
    Scroller,
    LoadMore
  },
  data () {
    return {
      dataList: [{
        zcName: '笔记本',
        receiveDate: '2017-12-12'
      }, {
        zcName: '台式机',
        receiveDate: '2017-12-12'
      }, {
        zcName: '打印机',
        receiveDate: '2017-12-12'
      }],
      totalCount: 3
    }
  },
  methods: {
    link () {
      this.$router.push({path: '/resourceInfo'})
    },
    onScrollBottom () {
      console.log('onScroll')
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
