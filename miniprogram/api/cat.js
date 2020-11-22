import {getOpenid} from './privilege'
import {deleteCatImage} from './file'

export const getCatList = async function(isPrivate) {
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

export const getCat = async function(id) {
  var cat
  const db = wx.cloud.database();
  await db.collection('cat').doc(id).get()
  .then(res => {
    cat = res.data
  })
  return cat
}

export const deleteCat = async function(id) {
  const db = wx.cloud.database();
  await db.collection('cat').doc(id).remove()
  await deleteCatImage(id)
}

export const createCat = async function(cat) {
  var catId = ''
  const db = wx.cloud.database();
  await db.collection('cat').add({
    data: {
      avatarUrl: cat.avataUrl,
      name: cat.name,
      gender: cat.gender,
      description: cat.description,
      area: cat.area,
      relationship: cat.relationship,
      isPrivate: cat.isPrivate
    }
  }).then(res => {
    catId = res._id
  })
  return catId
}

export const updateCat = async function(id, cat) {
  const db = wx.cloud.database()
  await db.collection('cat').doc(id).update({
    data: cat
  })
}
