// pages/user/user.js
Page({

  /**
   * Page initial data
   */
  data: {
    isAuthed: false,
    userName: '',
    userAvatarUrl: '',
    userGender: 0,
    userOpenid: '',
    role: '',
    roleName: '',
    openid: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let self = this
    wx.getSetting({
      success (res) {
        console.log('authSetting: ', res.authSetting)
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log('getUserInfo: ', res.userInfo)
              self.setUserInfo(res.userInfo)
            },
            fail: function(res) {
              console.log('getUserInfo fail: ', res)
            }
          })
        }
      }
    })

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onGetUserInfo: function (e) {
    let userInfo = e.detail.userInfo
    this.setUserInfo(userInfo)
  },
  onTapBtn() {
    wx.cloud.callFunction({
      name: 'getOpenData',
      success(res) {
        console.log('res', res.result.openid)
      }
    })
  },

  async setUserInfo(userInfo) {
    var role = ''
    var roleName = ''
    var openid = ''
    await wx.cloud.callFunction({
      name: 'getOpenData'
    }).then(res => {
      openid = res.result.openid
    })
    const db = wx.cloud.database()
    await db.collection('user').where({
      _openid: openid
    }).get().then(res => {
      if(res.data.length == 0) {
        db.collection('user').add({
          data: {
            role: 'guest',
            roleName: '游客'
          }
        })
        role = 'guest'
        roleName = '游客'
      } else {
        role = res.data[0].role
        roleName = res.data[0].roleName
      }
    })

    this.setData({
      userName: userInfo.nickName,
      userAvatarUrl: userInfo.avatarUrl,
      userGender: userInfo.gender,
      isAuthed: true,
      role: role,
      roleName: roleName
    })
  }
})