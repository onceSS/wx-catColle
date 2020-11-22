# database

直接使用小驼峰命名

is_deleted ❌  
isDeleted  ⭕️

## general

isDeleted: 逻辑删除  
  0: 未删除  
  1: 已删除

## cat

catStatus: 表示猫猫本身的状态，如仍在，一离开，已去世

checkStatus: 表示审核状态  
  1: 初始状态  
  2: 提交审核  
  3: 审核不通过  
  4: 审核通过

isPrivate: 是否为私人猫猫, 当为私人时，使用_openid甄别  
  0: 否  
  1: 是

## user



