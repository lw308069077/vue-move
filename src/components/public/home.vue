<template>
  <div id="home">
    <div class="home" @click="goHome">
      <span><img src="static/home.PNG" alt=""></span>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goHome () {
        this.$router.push('/index')
      }
    }
  }
</script>

<style lang='less'>
    .home{
    position: fixed;
    bottom: 15%;
    right:12px;
    z-index: 11122;
    span{
        display: block;
        width:50px;
        height:50px;
        background-color: #20a0ff;
        border-radius: 50%;
        opacity: 0.55;
    }
    img{
        width:26px;
        height:26px;
        position: relative;
        top: 25%;
        left:25%;
    }
}
</style>
