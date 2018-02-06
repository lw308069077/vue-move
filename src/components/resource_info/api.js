/**
 * Created by liwen on 2018/01/05.
 */

import {BASE_URL} from 'tool/tool'

export default {
  methods: {
    /* 基本信息 */
    async getBaseinfo (zcId, emplNo) {
      try {
        let res = await this.$http.get(`${BASE_URL}/empl/${emplNo}/resource/${zcId}/baseinfo`)
        // console.log(res.data.data)
        return res.data.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 购置记录 */
    async getBuysLog (zcId) {
      try {
        let res = await this.$http.get(`${BASE_URL}/resource/${zcId}/buyslog`)
        // console.log(res.data.data)
        return res.data.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 使用记录 */
    async getUseLogs (zcId) {
      try {
        let res = await this.$http.get(`${BASE_URL}/resources/${zcId}/uselogs`)
        // console.log(res)
        return res.data
      } catch (res) {
        console.log(res)
      }
    },
    /* 维修记录 */
    async getRepairesLogs (zcId) {
      try {
        let res = await this.$http.get(`${BASE_URL}/resources/${zcId}/repaireslogs`)
        if (res.data.data.length) {
          res.data.data.forEach(item => {
            let arr = item.repaireTime.split('~')
            let str1 = ''
            let str2 = ''
            arr.forEach((item1, key) => {
              let index = item1.indexOf(' ')
              key ? str2 = item1.slice(0, index) : str1 = item1.slice(0, index)
            })
            item.repaireTime = str1 + '~' + str2
          })
        }
        return res.data
      } catch (err) {
        console.log(err.response)
        // return err.response
      }
    },
    /* 故障描述选择项 */
    async getErrordescriptions (bxClassId) {
      try {
        let res = await this.$http.get(`${BASE_URL}/errordescriptions/${bxClassId}`)
        // console.log(res.data.data)
        let arr = []
        res.data.data.forEach((item) => {
          arr.push(item.gzText)
        })
        console.log('ttttt',arr)
        return arr
      } catch (res) {
        console.log(res)
      }
    },
    /* 提交资产报修 */
    async postSatisfaction (emplNo, zcId, Repair) {
      try {
        let res = await this.$http.post(`${BASE_URL}/empl/${emplNo}/resource/${zcId}/repair`, Repair)
        // console.log(res.data.data)
        return res.data.data
      } catch (res) {
        console.log(res)
      }
    }
  }
}
