module.exports = {
  // 主页
  catList: {
    path: '/pages/cat/cat-list/cat-list',
  },
  catCreate: {
    path: '/pages/cat/cat-create/cat-create',
  },
  catDetail: {
    path: '/pages/cat/cat-detail/cat-detail',
  },
  imageCropper: {
    path: '/pages/image-cropper/image-cropper',
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