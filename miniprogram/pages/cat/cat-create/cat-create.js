//catCreate.js
const app = getApp()
const router = require('../../../router/index')
import {createCat, deleteCat, updateCat, uploadCatImage} from '../../../api/index'

Page({
  data: {
    avatarUrl: '',
    catId: '',
    name: '',
    gender: 0,
    area: '',
    description: '',
    relationship: '',
    isEdit: 0,
    nativeAvatarUrl: '',
    radio: {
      male: false,
      female: false,
      unknown: true
    }
  },

  onLoad: function(options) {
    const optionsData = router.extract(options);
    console.log('catCreate.onLoad',optionsData)
    if(optionsData != null){
      this.setData({
        avatarUrl: optionsData.avatarUrl,
        catId: optionsData.catId,
        name: optionsData.name,
        gender: optionsData.gender,
        area: optionsData.area,
        description: optionsData.description,
        relationship: optionsData.relationship,
        isEdit: 1,
        nativeAvatarUrl: optionsData.avatarUrl,
      })
      if(optionsData.gender == 1){
        this.setData({
          radio: {
            male: true,
            female: false,
            unknown: false
          }
        })
      }else if(optionsData.gender == 2){
        this.setData({
          radio: {
            male: false,
            female: true,
            unknown: false
          }
        })
      }
    }
  },

  onShow() {
  },

  onRadioChange: function(e){
    this.setData({
      gender: parseInt(e.detail.value)
    })

  },

  bindInput: function(){},

  onTapSubmit: function(){

    //check
    if(this.submitCheck() != 1) {
      return
    }
    //submit
    if(this.data.isEdit == 1){
      this.update()
    }else{
      this.create()
    }
  },

  create: async function(){
    //insert数据库记录
    var id = ''
    id = await createCat({
      avatarUrl: '',
      name: this.data.name,
      gender: parseInt(this.data.gender),
      description: this.data.description,
      area: this.data.area,
      relationship: this.data.relationship,
      isPrivate: 0
    })
    await this.setData({
      catId: id
    })

    //上传avatar
    let fileId = await uploadCatImage(this.data.catId, this.data.avatarUrl)

    //将图片地址插入到刚刚的记录中
    await updateCat(this.data.catId, {avatarUrl: fileId})

    router.replace({
      name: 'catDetail',
      data: {
        isFromList: 0,
        catId: this.data.catId
      }
    })
    
  },

  update: async function(){
    if(this.data.avatarUrl != this.data.nativeAvatarUrl){
      let fileId = await uploadCatImage(this.data.catId, this.data.avatarUrl)
      this.setData({
        avatarUrl: fileId
      })
    }

    await updateCat(this.data.catId, {
      avatarUrl: this.data.avatarUrl,
      name: this.data.name,
      gender: parseInt(this.data.gender),
      description: this.data.description,
      area: this.data.area,
      relationship: this.data.relationship
    })

    router.replace({
      name: 'catDetail',
      data: {
        isFromList: 0,
        catId: this.data.catId
      }
    })

  },

  submitCheck: function() {
    if(this.data.avatarUrl == '') {
      wx.showToast({
        title: '必须上传猫猫照片',
        icon: 'none',
        duration: 2000
      })
      return 0
    }

    if(this.data.name == '') {
      wx.showToast({
        title: '猫猫名字不能为空',
        icon: 'none',
        duration: 3000
      })
      return 0
    }

    if(this.data.area == '') {
      wx.showToast({
        title: '猫猫出没地点不能为空',
        icon: 'none',
        duration: 3000
      })
      return 0
    }

    return 1

  },

  onTapUploadAvatar: function() {
    wx.chooseImage({
      success: chooseResult => {
        const path = chooseResult.tempFilePaths[0];

        app.globalData.imageUrl = ''

        router.push({
          name: 'imageCropper',
          data: {
            imageUrl: path,
          },
        })
      }
    })
  },

  onTapCancel: function() {
    router.pop()
  }

})
