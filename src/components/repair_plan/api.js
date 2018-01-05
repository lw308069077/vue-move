/**
 * Created by liwen on 2018/01/05.
 */

export default {
    methods: {
      /* 获取资产报修进度 */
      async getRepair(repairId) {
        try {
          let res = await this.$http.get(`/cmp/v1/repair/${repairId}`)
          console.log(res.data.data)
          return res.data.data
        } catch (res) {
          console.log(res)
        }
      },
      /* 提交满意度调查 */
      async postSatisfaction(repairId, Satisfaction) {
        try {
          let res = await this.$http.post(`/cmp/v1/repair/${repairId}/satisfaction`, Satisfaction)
          console.log(res.data.data)
          return res.data.data
        } catch (res) {
          console.log(res)
        }
      },
    }
  }
  