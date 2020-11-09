//获取应用实例
const app = getApp()
const router = require('../../router/index')
Page({
  data: {
    imageUrl:'',
    sourcePageName: '',
    width: 250,//宽度
    height: 250,//高度
    max_width: 400,
    max_height: 400,
    disable_rotate: true,//是否禁用旋转
    disable_ratio: true,//锁定比例
    limit_move: true,//是否限制移动
  },
  onLoad: function (options) {
    this.cropper = this.selectComponent("#image-cropper");
    let optionsData = router.extract(options)
    console.log('optionsData',optionsData)
    this.setData({
      imageUrl: optionsData.imageUrl,
      sourcePageName: optionsData.sourcePageName
    })
  },
  cropperload(e) {
    console.log('cropper加载完成');
  },
  loadimage(e){
    wx.hideLoading();
    console.log('图片');
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //图片预览
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  setWidth(e){
    this.setData({
      width: e.detail.value < 10 ? 10 : e.detail.value
    });
    this.setData({
      cut_left: this.cropper.data.cut_left
    });
  },
  setHeight(e){
    this.setData({
      height: e.detail.value < 10 ? 10 : e.detail.value
    });
    this.setData({
      cut_top: this.cropper.data.cut_top
    });
  },

  submit(){
    this.cropper.getImg((obj)=>{
      console.log('obj.url', obj.url)
      app.globalData.imgUrl = obj.url
      router.pop()
    })
  },

  cancel() {
    app.globalData.imgUrl = ''
    router.pop()
  }

})

