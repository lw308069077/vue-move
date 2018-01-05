/**
 * Created by liwen on 2018/01/04.
 */

export default {
  methods: {
    /* 获取所有的维修资产状态 */
    async getRepaires(emplNo) {
      try {
        let res = await this.$http.get(`/cmp/v1/empl/${emplNo}/repaires`)
        let obj = {}
        obj.repairingList = []
        obj.repairedList = []
        obj.page = res.data.page
        res.data.data.forEach(item => {
          if (item.status !== '4') {
            obj.repairingList.push(item)
          } else {
            obj.repairedList.push(item)
          }
        })
        console.log(res)
        return obj
      } catch (res) {
        console.log(res)
      }
    },
  }
}
