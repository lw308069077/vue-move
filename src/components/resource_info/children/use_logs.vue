<template>
    <div class="use-logs">
        <group v-for="(item,index) in dataList" :key="index" :class="!index?'first-group':'other-group'">
            <cell title="使用时间" value-align="left">{{item.useTime}}</cell>
            <cell title="使 用 人" value-align="left">{{item.emplName}}</cell>
            <cell title="所属部门" value-align="left">{{item.deptName}}</cell>
            <cell title="存放位置" value-align="left">{{item.place}}</cell>
            <cell title="归属账套" value-align="left">{{item.ownAccount}}</cell>
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
            useTime: 'G002-01732',
            emplName: '台式电脑—主机',
            deptName: '联想',
            place: 'Y450 4G+500G',
            ownAccount: '2017.11.11'
          }, {
            useTime: '外星人',
            emplName: '游戏本',
            deptName: 'Dell',
            place: '32G+500G',
            ownAccount: '2017.12.11'
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
