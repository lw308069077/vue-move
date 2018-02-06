/**
 * Created by liwen on 2018/01/05.
 */

import {BASE_URL} from 'tool/tool'

export default {
    methods: {
      /* 获取资产报修进度 */
      async getRepair(repairId) {
        try {
          let res = await this.$http.get(`${BASE_URL}/repair/${repairId}`)
          console.log(res.data.data)
          return res.data.data
        } catch (res) {
          console.log(res)
        }
      },
      /* 提交满意度调查 */
      async postSatisfaction(repairId, Satisfaction) {
        console.log(repairId)
        console.log(111111111)
        try {
          let res = await this.$http.post(`${BASE_URL}/repair/${repairId}/satisfaction`, Satisfaction)
          console.log(res.data.data)
          return res.data.data
        } catch (res) {
          console.log(res)
        }
      },
    }
  }
  