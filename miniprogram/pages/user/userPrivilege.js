const app = require('../../app')

const ROLE = [
  {
    role: 'guest',
    roleName: '游客',
    privilege: ['read','apply']
  },
  {
    role: 'worker',
    roleName: '工作人员',
    privilege: ['read','apply', 'review']
  },
  {
    role: 'admin',
    roleName: '管理员',
    privilege: ['read','apply', 'review', 'grant']
  },
]

const PRIVILEGE = [
  {code: 'ban', name: '封禁'},
  {code: 'read', name: '查询'},
  {code: 'apply', name: '申请添加/编辑猫猫'},
  {code: 'review', name: '审核申请'},
  {code: 'grant', name: '赋予权限'},
  {code: 'private', name: '私人猫猫'},
]

const getRole = function () {
  const db = wx.cloud.database()
  db.collection('user').where()

}

const checkPrivilege = function(code) {
  if(app.globalData.userRole == '') {getRole()}
  let i, j
  for(i = 0; i < ROLE.length; i ++) {
    if(app.globalDta.userRole == ROLE[i].role) {
      for(j = 0; j < ROLE[i].privilege.length; j ++) {
        if(code == ROLE[i].privilege[j]) {
          return 1
        }
      }
      return 0
    }
  }
  return 0
}

const showPrivilege = function(thisRole) {
  let thisRoleName = ''
  let thisPrivilegeCode = []
  let i, j
  for(i = 0; i < ROLE.length; i ++) {
    if(ROLE[i].role == thisRole) {
      thisRoleName = ele.roleName
      thisPrivilegeCode = ele.privilege
      break
    }
  }
  if(thisRoleName == '') {
    return {}
  }
  let thisPrivilege = []
  for(i = 0; i < thisPrivilegeCode.length; i ++) {
    for(j = 0; j < PRIVILEGE.length; j ++) {
      if(thisPrivilegeCode[i] == PRIVILEGE[j].code) {
        thisPrivilege.push(PRIVILEGE[j])
        break
      }
    }
  }
  return {
    role: thisRole,
    roleName: thisRoleName,
    privilege: thisPrivilege
  }
}

module.exports = {
  checkPrivilege, showPrivilege
}
