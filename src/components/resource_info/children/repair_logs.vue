<template>
    <div class="repair-logs">
        <group v-for="(item,index) in dataList" :key="index" :class="!index?'first-group':'other-group'">
          <cell title="维修时间" value-align="left">{{item.repaireTime}}</cell>
          <cell title="报 修 人" value-align="left">{{item.userName}}</cell>
          <cell title="处 理 人" value-align="left">{{item.conductor}}</cell>
          <cell title="故障描述" value-align="left">{{item.conductorDesc}}</cell>
          <cell title="故障类型" value-align="left">{{item.conductorType}}</cell>
          <cell title="故障原因" value-align="left">{{item.conductorCause}}</cell>
          <cell title="处理结果" value-align="left">{{item.conductorResult}}</cell>
        </group>

        <div class="empty-info" v-if="!totalCount">
          暂时还没有资产维修记录
        </div>
    </div>
</template>
<script>
    import { Group, Cell} from 'vux'
    export default{
      components: {
        Group,
        Cell
      },
      data () {
        return {
          totalCount: 1,
          dataList: [{
            repaireTime: '2017.5.24 - 2017.5.27',
            userId: '13726',
            userName: '张三 [13726]',
            conductor: '李四 [12324]',
            conductorDesc: '投影无显示',
            conductorType: '投影无显示',
            conductorCause: '人为损坏',
            conductorResult: '维修完成'
          }, {
            repaireTime: '2017.5.24 - 2017.5.27',
            userId: '13726',
            userName: '王五 [132726]',
            conductor: '赵六 [123324]',
            conductorDesc: '显卡坏了',
            conductorType: '显卡坏了',
            conductorCause: '自然老化',
            conductorResult: '维修完成'
          }]
        }
      },
      created () {

      },
      computed: {

      },
      methods: {
    
      }
    }
</script>
<style lang="less">

</style>
