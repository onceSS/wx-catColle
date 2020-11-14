//catDetail.js
const app = getApp()
const router = require('../../../router/index')

Page({
  data: {
    isFromList: 1,
    catId: '',
    name: '',
    avatarUrl: '',
    gender: null,
    genderIconUrl: '',
    area: '',
    description: '',
    relationship: ''
  },

  onLoad: function(options) {
    const optionsData = router.extract(options);
    console.log('optionsData', optionsData);
    if(optionsData.is_from_list == 0) {
      this.setData({
        isFromList: 0
      })
    }

    const db = wx.cloud.database();
    db.collection('cat').doc(optionsData.cat_id).get()
    .then(res => {
      let genderIconUrl = '';
      if(res.data.gender==1) {
        genderIconUrl= '../../../images/baseIcon/gender/male.svg'
      }else if(res.data.gender==2) {
        genderIconUrl= '../../../images/baseIcon/gender/female.svg'
      }else {
        genderIconUrl= ''
      }
      this.setData({
        catId: res.data._id,
        name: res.data.name,
        avatarUrl: res.data.avatarUrl,
        genderIconUrl: genderIconUrl,
        gender: res.data.gender,
        area: res.data.area,
        description: res.data.description,
        relationship: res.data.relationship
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
          console.log('用户点击确定')
          const db = wx.cloud.database();
          db.collection('cat').doc(catId).remove()
          .then(res => {
            console.log(res.data)
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
