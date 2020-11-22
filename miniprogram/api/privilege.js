const app = getApp()
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

const getOpenid = async function() {
  var openid = ''
  if(app.globalData.userOpenid != '' ) {
    openid = app.globalData.userOpenid
  } else {
    await wx.cloud.callFunction({
      name: 'getOpenData'
    }).then(res => {
      openid = res.result.openid
      app.globalData.userOpenid = openid
    })
  }
  return openid
}

const getRole = async function () {
  var thisRole = {}
  if(app.globalData.userRole != '') {
    thisRole = {
      role: app.globalData.userRole,
      roleName: app.globalData.userRoleName,
      privilege: app.globalData.userPrivilege
    }
    return thisRole
  } else {
    var openid = getOpenid()
    const db = wx.cloud.database()
    await db.collection('user').where({
      _openid: openid
    }).get().then(res => {
      var targetRole = ''
      if(res.data.length == 0) {
        targetRole = 'guest'
      } else {
        targetRole = res.data[0].role
      }
      let i
      for(i = 0; i < ROLE.length; i ++) {
        if(targetRole == ROLE[i].role) {
          thisRole = ROLE[i]
          break
        }
      }
    })
    app.globalData.userRole = thisRole.role
    app.globalData.userRoleName = thisRole.roleName
    app.globalData.userPrivilege = thisRole.privilege
    return thisRole
  }
}

const checkPrivilege = async function(code) {
  var thisRole = await getRole()
  let i, j
  for(i = 0; i < ROLE.length; i ++) {
    if(thisRole.role == ROLE[i].role) {
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

const initPrivilege = function() {
}

export {
  getOpenid, getRole, checkPrivilege, showPrivilege
}
