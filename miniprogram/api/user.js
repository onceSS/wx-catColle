import {getBaseRole} from './privilege'

export const getUser = async function(openid) {
  var user = {}
  const db = wx.cloud.database()
  await db.collection('user').where({
    _openid: openid
  }).get().then(res => {
    if(res.data.length == 0) {
      user = getBaseRole()
      db.collection('user').add({
        data: user
      })
    } else {
      user.role = res.data[0].role
      user.roleName = res.data[0].roleName
      user.privilege = res.data[0].privilege
    }
  })
  return user
}