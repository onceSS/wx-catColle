export const uploadCatImage = async function(catId, imageUrl){
  //获取md5
  let imageMd5 = ''
  await wx.getFileInfo({
    filePath: imageUrl,
    digestAlgorithm: 'md5'
  }).then(res => {
    imageMd5 = res.digest
  })

  //获取后缀名
  let ext = imageUrl.substr(imageUrl.indexOf('.')+1);
  //拼接云端storage地址
  let cloudpath = 'cat/' + catId + '/' + imageMd5 + ext
  let fileId = ''
  await wx.cloud.uploadFile({
    cloudPath: cloudpath,
    filePath: imageUrl
  }).then(res => {
    fileId = res.fileID
  })
  return fileId
}

export const deleteCatImage = async function(catId) {
  await wx.cloud.deleteDirectory(`cat/${catId}`)
}