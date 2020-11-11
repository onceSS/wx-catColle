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
    userOpenid: ''
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

  onTapOpenid: function () {
    const cloud = require('wx-server-sdk')
    cloud.init()
    let data = exports.main = (event, context) => {
      // 这里获取到的 openId、 appId 和 unionId 是可信的，注意 unionId 仅在满足 unionId 获取条件时返回
      let { OPENID, APPID, UNIONID } = cloud.getWXContext()

      return {
        OPENID,
        APPID,
        UNIONID,
      }
    }
    console.log('openiddata', data.OPENID)
  },

  setUserInfo(userInfo) {
    this.setData({
      userName: userInfo.nickName,
      userAvatarUrl: userInfo.avatarUrl,
      userGender: userInfo.gender,
      isAuthed: true
    })
  }
})