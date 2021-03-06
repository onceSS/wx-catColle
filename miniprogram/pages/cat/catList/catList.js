//catList.js
const app = getApp()
const router = require('../../../router/index');

Page({
  data: {
    catList: []
  },

  onLoad: function() {
    console.log('catList onLoad()')
  },

  onShow: function(options) {
    this.getCatList();
    console.log('catList onShow()', options)

  },

  onTapCreate: function() {
    router.push({name: 'catCreate'})
  },

  getCatList: function() {
    let nativeCatList = [];
    const db = wx.cloud.database();
    db.collection('cat').get()
    .then(res => {
      nativeCatList = res.data;
    })
    console.log('nativeCatList', nativeCatList)

    let length = nativeCatList.length
    for(let i=0; i<length; i++) {
      if(nativeCatList[i].gender==1) {
        nativeCatList[i].genderIconUrl= '../../../images/baseIcon/gender/male.svg'
      }else if(nativeCatList[i].gender==2) {
        nativeCatList[i].genderIconUrl= '../../../images/baseIcon/gender/female.svg'
      }else {
        nativeCatList[i].genderIconUrl= ''
      }
    }

    this.setData({
      catList: nativeCatList
    })
    console.log('this.data.catList', this.data.catList)
    
  },

  onTapCat(e) {
    console.log('e.currentTarget', e.currentTarget)
    router.push({
      name: 'catDetail',
      data: {
        cat_id: e.currentTarget.dataset.catid
      }
    })
  }

})
