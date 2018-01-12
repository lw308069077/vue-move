<template>
    <div class="buy-log">
        <group class="first-group">
          <cell title="采购时间" value-align="left">{{datas.purchaseDate}}</cell>
          <cell title="供 应 商" value-align="left">{{datas.provider}}</cell>
          <cell title="保 修 期" value-align="left">{{datas.guaranteeDate}}个月</cell>
          <cell title="使用时间" value-align="left">{{datas.useTime}}个月</cell>
          <cell title="单　　价" value-align="left">{{datas.price}}</cell>
        </group>
    </div>
</template>
<script>
    import api from '../api'
    import { Group, Cell} from 'vux'
    export default{
      mixins: [api],
      components: {
        Group,
        Cell
      },
      data () {
        return {
          datas: {}
        }
      },
      created () {
        this.refrech()
      },
      methods: {
        async refrech () {
          this.datas = await this.getBuysLog(this.$route.query.zcId)
          console.log(this.datas)
        }
      }
    }
</script>
<style lang="less">

</style>
