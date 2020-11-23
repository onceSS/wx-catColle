//catList.js
const app = getApp()
const router = require('../../../router/index')
import {getCatList,getRole} from '../../../api/index'

Page({
  data: {
    catList: []
  },

  onLoad: async function() {
    console.log('cat-list onLoad()')
    let {role} = await getRole()
    console.log('current user is ', role)
    if(role == 'worker' || role == 'admin') {
      app.globalData.tabBarType = 2
    } else {
      app.globalData.tabBarType = 1
    }
    this.getTabBar().setTabBar()
  },

  onShow: function() {
    console.log('cat-list onShow()')
    this.getTabBar().setTabBar()
    this.getTabBar().setData({selected: 0})

    this.setList();
  },

  onPullDownRefresh: function () {
    this.setList()
    wx.stopPullDownRefresh()
  },

  onTapCreate: function() {
    router.push({name: 'catCreate'})
  },

  setList: async function() {
    let catList = await getCatList(0)
    this.setData({
      catList: catList
    })
  },

  onTapCat(e) {
    router.push({
      name: 'catDetail',
      data: {
        catId: e.currentTarget.dataset.catid
      }
    })
  },

  onTapBtn() {
    console.log(getCatList())
  }

})
