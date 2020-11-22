import Cat from '../database/cat'

const getCatList = async function() {
  let cat = new Cat()
  let catList = await cat.getList()
  return catList
}

exports.module = {getCatList}