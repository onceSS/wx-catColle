// const app = getapp()

export default class{
  
  id = ''
  name = ''
  gender = 0
  db = null

  constructor() {
    this.db = wx.cloud.database()
  }

  async getList() {
    let res = await this.db.collection('cat').get()
    return res.data
  }


}
