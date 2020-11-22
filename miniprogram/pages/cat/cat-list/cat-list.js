//catList.js
const app = getApp()
const router = require('../../../router/index')
const privilege = require('../../../privilege/index')

import {getCatList} from '../../../api/index'

Page({
  data: {
    catList: []
  },


  onLoad: async function() {
    console.log('cat-list onLoad()')
    let {role} = await privilege.getRole()
    console.log('current user is ', role)
    if(role == 'guest') {
      app.globalData.tabBarType = 1
    } else {
      app.globalData.tabBarType = 2
    }
    this.getTabBar().setTabBar()
  },

  onShow: function() {
    console.log('cat-list onShow')
    this.getTabBar().setTabBar()
    this.getTabBar().setData({selected: 0})

    this.getCatList();
  },

  onTapCreate: function() {
    router.push({name: 'catCreate'})
  },

  getCatList: async function() {
    let nativeCatList = [];
    const db = wx.cloud.database();
    await db.collection('cat').get()
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
  },

  onTapBtn() {
    console.log(getCatList())
  }

})
