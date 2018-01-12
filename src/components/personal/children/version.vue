<template>
    <div id="version">
        <group class="first-group">
            <div v-for="(item,index) in versionList" class="versionBox" :key="index">
                <cell class="versionInfo" 
                :border-intent="false"
                :arrow-direction="(show===index) ? 'up' : 'down'"
                @click.native="clickShow(index)">
                    <template slot="title">
                        <span class="label">版本号:</span>
                        <a class="versionNum">{{item}}</a>
                    </template>
                </cell>
                <template v-if="show===index">
                    <cell class="versionInfo">
                        <template slot="title">
                            <div v-for="(content,count) in versionStateList[index]" :key="count">
                                <span class="label">{{count?'':'版本说明:'}}</span>
                                <a class="versionContent">{{count+1}}、{{content}}</a>
                            </div>
                        </template>
                    </cell>
                </template>
            </div>
        </group>
    </div>
</template>
<script>
import { Group, Cell, Loading, Toast, CellFormPreview } from "vux";
import api from "./../api";
export default {
  mixins: [api],
  components: {
    Group,
    Cell,
    Loading,
    Toast,
    CellFormPreview
  },
  data() {
    return {
      versionStateList: [],
      versionList: [],
      show: -1,
      list: [
        {
          label: "Apple",
          value: "3.29"
        },
        {
          label: "Banana",
          value: "1.04"
        },
        {
          label: "Fish",
          value: "8.00"
        }
      ]
    };
  },
  methods: {
    clickShow(index) {
      if (this.show === index) {
        this.show = -1;
      } else {
        this.show = index;
      }
    }
  },
  async created() {
    let array = await this.getVersions();
    array.forEach(item => {
      this.versionList.push(item.versionName);
      let arr = [];
      let arr1 = item.content.split("|");
      arr1.forEach(str => {
        arr.push(str);
      });
      this.versionStateList.push(arr);
    });
  }
};
</script>
<style lang="less">
#version {
  .vux-label {
    width: 100%;
  }
  .versionBorder {
    .weui-cell:before {
      display: none !important;
    }
  }
  .versionInfo {
    width: 100%;
    .label {
      display: inline-block;
      width: 60px;
      color: #8492a6;
      text-align: right;
      margin-right: 20px;
      vertical-align: top;
    }
    .versionNum {
      color: #20a0ff;
      display: inline-block;
      width: 68%;
    }
    .versionContent {
      display: inline-block;
      width: 68%;
    }
    .versionTime {
      font-style: normal;
      color: #333;
    }
  }
}
</style>