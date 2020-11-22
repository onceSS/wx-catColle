import {getOpenid} from './privilege'

const getCatList = async function(isPrivate) {
  var catList = []
  var whereObject  = null
  if(isPrivate == 0) {
    whereObject = {isPrivate: 0}
  } else if(isPrivate == 1) {
    var openid = await getOpenid()
    whereObject = {
      isPrivate: 1,
      _openid: openid
    }
  }
  const db = wx.cloud.database();
  await db.collection('cat').where(whereObject).get()
  .then(res => {
    catList = res.data;
  })
  return catList
}

export {getCatList}