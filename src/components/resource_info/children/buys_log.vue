<template>
    <div class="buy-log">
        <group class="first-group">
          <cell title="采购时间" value-align="left">{{datas.purchaseDate}}</cell>
          <cell title="供 应 商" value-align="left">{{datas.provider}}</cell>
          <cell title="保 修 期" value-align="left">{{datas.guaranteeTime}}</cell>
          <cell title="使用时间" value-align="left">{{datas.useTime}}</cell>
          <cell title="单　　价" value-align="left">{{datas.price}}</cell>
        </group>
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
          datas: {
            purchaseDate: '2017.5.24',
            provider: '鼎折覆餗的',
            guaranteeTime: '36个月 [剩余30个月]',
            useTime: '6个月',
            price: '3531.00元'
          }
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
