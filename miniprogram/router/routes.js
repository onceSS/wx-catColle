module.exports = {
  // 主页
  catList: {
    path: '/pages/cat/catList/catList',
  },
  catCreate: {
    path: '/pages/cat/catCreate/catCreate',
  },
  catDetail: {
    path: '/pages/cat/catDetail/catDetail',
  },
  imageCropper: {
    path: '/pages/imageCropper/imageCropper',
  },
};

/*
router.push => wx.navigateTo
router.replace => wx.redirectTo
router.pop => wx.navigateBack
router.relaunch => wx.reLaunch

Page({
  onLoad(options) {
    const data = router.extract(options);
    console.log(this.data); // { id: '123', type: 1 }
  },
});

*/