/**
 * Created by liwen on 2018/01/04.
 */

import {BASE_URL} from 'tool/tool'

export default {
  methods: {
    /* 获取所有的维修资产状态 */
    async getRepaires (emplNo,pageNo,pageSize) {
      try {
        let res = await this.$http.get(`${BASE_URL}/empl/${emplNo}/repaires?pageNo=${pageNo}&pageSize=${pageSize}`)
        // let signMap = window.sessionStorage.getItem('signMap')
        // if(!signMap){
        //   window.sessionStorage.setItem('signMap',JSON.stringify(res.data.data.signMap))
        // }
        let obj = {}
        obj.repairingList = []
        obj.repairedList = []
        obj.page = res.data.page
        console.log('ddddd',res.data.data)
        res.data.data.forEach(item => {
          if (item.status !== '3' && item.status !== '4') {
            obj.repairingList.push(item)
          } else if(item.status === '3'){
            obj.repairedList.push(item)
          }
        })
        console.log('fffff',obj)
        return obj
      } catch (res) {
        console.log(res)
      }
    },
    async getRichScan (emplNo, tdId) {
      try {
        let res = await this.$http.get(`${BASE_URL}/empl/${emplNo}/resource/${tdId}/baseinfobytdid`)
        console.log(res)
        return res
      } catch (res) {
        console.log(res)
      }
    },
    async getSign(url){
      try{
        let res = await this.$http.get(`${BASE_URL}/getSign/${url}`)
        return res.data.data
      }catch(err){
        console.log(err)
      }  
    }
  }
}
