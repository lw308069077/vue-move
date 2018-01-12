/**
 * Created by liwen on 2018/01/05.
 */

export default {
    methods: {
      /* 获取个人信息 */
      async getUserInfo (userId) {
        try {
          let res = await this.$http.get(`/cmp/v1/user/${userId}`)
        //   console.log(res.data.data)
          return res.data.data
        } catch (res) {
          console.log(res)
        }
      },
      /* 获取最新版本信息 */
      async getVersion () {
        try {
          let res = await this.$http.get(`/cmp/v1/version/last`)
          // console.log(res.data.data)
          return res.data.data.versionName
        } catch (res) {
          console.log(res)
        }
      },
      /* 获取版本列表 */
      async getVersions () {
        try {
          let res = await this.$http.get(`/cmp/v1/versions`)
        //   console.log(res.data.data)
          return res.data.data
        } catch (res) {
          console.log(res)
        }
      },
      /* 根据Id获取版本信息 */
      async getVersionById (id) {
        try {
          let res = await this.$http.get(`/cmp/v1/version/${id}`)
        //   console.log(res.data.data)
          return res.data.data
        } catch (res) {
          console.log(res)
        }
      }
    }
  }
  