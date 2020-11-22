//catDetail.js
const app = getApp()
const router = require('../../../router/index')
import {deleteCat, getCat} from '../../../api/index'

Page({
  data: {
    isFromList: 1,
    catId: '',
    name: '',
    avatarUrl: '',
    gender: null,
    area: '',
    description: '',
    relationship: ''
  },

  onLoad: function(options) {
    const optionsData = router.extract(options);
    console.log('optionsData', optionsData);
    if(optionsData.isFromList == 0) {
      this.setData({
        isFromList: 0
      })
    }

    getCat(optionsData.catId).
    then(res => {
      this.setData({
        catId: res._id,
        name: res.name,
        avatarUrl: res.avatarUrl,
        gender: res.gender,
        area: res.area,
        description: res.description,
        relationship: res.relationship
      })
    })

    
  },

  onTapBack() {
    if(this.data.isFromList==1) {
      router.pop()
    } else {
      router.relaunch({
        name: 'catList'
      })
    }
    
  },
  onTapDelete: function() {
    let catId = this.data.catId;
    wx.showModal({
      title: '删除确认',
      content: '确定删除"'+this.data.name+'"吗？',
      success (res) {
        if (res.confirm) {
          deleteCat(catId)
          .then(res => {
            router.relaunch({
              name: 'catList',
              data: {
                deletedCatId: catId
              }
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onTapEdit: function(){
    router.replace({
      name: 'catCreate',
      data: this.data
    })
  }

})
