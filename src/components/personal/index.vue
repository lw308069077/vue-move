<template>
  <div id="personal">
      <group class="first-group">
        <cell title="头像">
          <template slot="child">
            <img src="./avatar.png" alt="" width="40">
          </template>
        </cell>
        <cell title="姓名">{{personalData.realName}}</cell>
        <cell title="部门">{{personalData.deptName}}</cell>
        <cell title="工号">{{personalData.emplNo}}</cell>
      </group>
      <!-- <div  @click="submit">
          <x-button class="btn-logout">退出登录</x-button>
      </div> -->
      <div class="versionInfo">
        <span>{{lastVersion}}</span>
        <a @click="versionInfo">版本说明</a>
      </div>
    <div>
      <loading :show="show" :text="text"></loading>
    </div>
    <toast v-model="showPositionValue" type="text"
        :time="2000"  :text="info" :position="position" width="auto">
    </toast>
        
  </div>
</template>
<script>
import api from "./api";
import { Group, Cell, XButton, Toast, Loading } from "vux";
export default {
  mixins:[api],
  components: {
    Group,
    Cell,
    XButton,
    Toast,
    Loading
  },
  data() {
    return {
      emplNo: "",
      personalData: {},
      showPositionValue: false,
      position: "bottom",
      info: "",
      show: false,
      text: "Processing",
      lastVersion: ""
    };
  },
  methods: {
    versionInfo() {
      this.$router.push({ path: "version" });
    },
    async fetchData() {
      this.$vux.loading.show({
        text: "加载中..."
      });
      this.personalData = await this.getUserInfo(this.emplNo)
      if(this.personalData){
        this.show = false;
        this.$vux.loading.hide();
      }
    },
    async getLastVersion() {
      this.lastVersion = await this.getVersion()
      console.log(this.lastVersion)
      // this.$http.get(api.newVersion()).then(res => {
      //   console.log(res);
      //   this.lastVersion = res.body.returnValue.VersionName;
      // });
    },
    // submit() {
    //   this.$vux.loading.show({
    //     text: "加载中..."
    //   });
    //   this.$http
    //     .delete(api.logout())
    //     .then(res => {
    //       this.show = false;
    //       this.$vux.loading.hide();
    //       this.showPositionValue = true;
    //       this.position = "middle";
    //       if (!res.body.resultCode) {
    //         this.info = "退出登录成功";
    //         setTimeout(() => {
    //           this.$router.push("/login");
    //         }, 2000);
    //       } else {
    //         this.info = res.body.resultMessage;
    //         if (res.body.resultCode === 401) {
    //           setTimeout(() => {
    //             this.$router.push("/login");
    //           }, 2000);
    //         }
    //       }
    //     })
    //     .catch(res => {
    //       console.error(res);
    //     });
    // }
  },
  created() {
    this.emplNo = window.sessionStorage.getItem('emplNo')
    this.fetchData();
    this.getLastVersion();
    // console.log(this.emplNo)
  }
};
</script>
<style lang="less">
#personal {
  .weui-cell__ft {
    color: #1f2d3d;
  }
  .btn-logout {
    width: 80%;
    border: 1px solid #20a0ff;
    color: #20a0ff;
    font-size: 14px;
    height: 40px;
    margin-top: 20px;
  }
  .versionInfo {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 20px;
    a {
      color: #20a0ff;
    }
  }
}
</style>
