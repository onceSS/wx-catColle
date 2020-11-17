const app = getApp()
Component({
  data: {
    selected: 0,
    color: "#9e9e9e",
    selectedColor: "#ff9800",
    backgroundColor: "#fff",
    borderStyle: "white",
    list: [],
    tabBarType: 0,
    tabBarList:[
      {
        pagePath: "/pages/cat/cat-list/cat-list",
        text: "名册",
        iconPath: "../images/tabIcon/viewlist.png",
        selectedIconPath: "../images/tabIcon/viewlist_selected.png"
      },
      {
        pagePath: "/pages/cat/favorite/favorite",
        text: "收藏",
        iconPath: "../images/tabIcon/favorites.png",
        selectedIconPath: "../images/tabIcon/favorites_selected.png"
      },
      {
        pagePath: "/pages/admin/admin",
        text: "管理",
        iconPath: "../images/tabIcon/admin.png",
        selectedIconPath: "../images/tabIcon/admin_selected.png"
      },
      {
        pagePath: "/pages/user/user",
        text: "用户",
        iconPath: "../images/tabIcon/user.png",
        selectedIconPath: "../images/tabIcon/user_selected.png"
      }
    ]
  },
  attached() {
    this.setTabBar()
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log('new tab data: ', data)
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    },
    setTabBar() {
      var type = app.globalData.tabBarType
      if(type == 0) {return}
      if(this.data.tabBarType == type) {return}
      console.log('real set tabBar, new type:', type)
      var list = []
      if(type == 1) {
        list = [
          this.data.tabBarList[0], 
          this.data.tabBarList[1], 
          this.data.tabBarList[3]
        ]
      } else if(type == 2) {
        list = this.data.tabBarList
      }
      this.setData({
        list: list,
        tabBarType: type
      })
    }
  }
})