//catCreate.js
const app = getApp()
const router = require('../../../router/index')

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
    console.log('catList.onLoad',options)
    const optionsData = router.extract(options);
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
    console.log('imageUrl',app.globalData.imageUrl)
    this.setData({
      avatarUrl: app.globalData.imageUrl
    })
  },

  onRadioChange: function(e){
    console.log('catCreate.onRaioChange.e:', e.detail.value)
    this.setData({
      gender: parseInt(e.detail.value)
    })

  },

  bindInput: function(){},

  onTapSubmit: async function(){

    //check
    if(this.submitCheck() != 1) {
      return
    }
    //submit
    if(this.data.isEdit == 1){
      updateCat()
    }else{
      createCat()
    }
  },

  createCat: async function(){
    //insert数据库记录
    const db = await wx.cloud.database();
    await db.collection('cat').add({
      data: {
        avatarUrl: '',
        name: this.data.name,
        gender: parseInt(this.data.gender),
        description: this.data.description,
        area: this.data.area,
        relationship: this.data.relationship 
      }
    }).then(res => {
      this.setData({
        catId: res._id
      })
      console.log('insert success', res._id)
    })

    //上传avatar
    let fileId = this.uploadImage(this.data.catId, this.data.avatarUrl)
    
    console.log('catId', this.data.catId)
    //将图片地址插入到刚刚的记录中
    await db.collection('cat').doc(this.data.catId).update({
      data:{
        avatarUrl: fileId
      }
    }).then(res => {
      console.log('cat record updated', res)
    })

    console.log('完成')

    router.replace({
      name: 'catDetail',
      data: {
        is_from_list: 0,
        cat_id: this.data.catId
      }
    })
    
  },

  updateCat: async function(){
    const db = wx.cloud.database()
    db.collection('cat').doc(this.data.catId).update({
      data:{
        avatarUrl: this.data.avatarUrl,
        name: this.data.name,
        gender: parseInt(this.data.gender),
        description: this.data.description,
        area: this.data.area,
        relationship: this.data.relationship 
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
  uploadImage: async function(catId, imageUrl){
    //获取md5
    let imageMd5 = ''
    await wx.getFileInfo({
      filePath: imageUrl,
      digestAlgorithm: 'md5'
    }).then(res => {
      imageMd5 = res.digest
      //console.log('md5 got', avataimageMd5)
    })

    //获取后缀名
    let ext = imageUrl.substr(position);
    //拼接云端storage地址
    let cloudpath = 'cat/' + catId + '/' + imageMd5 + ext
    //console.log('cloudpath', cloudpath)
    let fileId = ''
    await wx.cloud.uploadFile({
      cloudPath: cloudpath,
      filePath: imageUrl
    }).then(res => {
      fileId = res.fileID
      console.log('avatar uploaded, fileID = ', res.fileID)
    })
    return fileId
  },

  onTapUploadAvatar: function() {
    wx.chooseImage({
      success: async chooseResult => {
        const path = chooseResult.tempFilePaths[0];

        app.globalData.imgUrl = ''

        await router.push({
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
