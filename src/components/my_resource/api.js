/**
 * Created by liwen on 2018/01/05.
 */

export default {
  methods: {
      /* 获取我的资产 */
    async getMyResources (emplNo, pageNo, pageSize) {
      try {
        let res = await this.$http.get(`/cmp/v1/empl/${emplNo}/resources?pageNo=${pageNo}&pageSize=${pageSize}`)
        console.log(res)
        return res.data
      } catch (res) {
        console.log(res)
      }
    }
  }
}
