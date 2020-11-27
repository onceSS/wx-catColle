const app = getApp()

//base role privilege
const ROLE = [
  {
    role: 'guest',
    roleName: '游客',
    privilege: ['read','apply']
  },
  {
    role: 'member',
    roleName: '会员',
    privilege: ['read','apply', 'private']
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

export const getBaseRole = function(role) {
  var i
  for(i = 0; i < ROLE.length; i ++) {
    if(ROLE[i].role == role) {
      return ROLE[i]
    }
  }
}

export const getOpenid = async function() {
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

export const getRole = async function () {
  var thisRole = {}
  if(app.globalData.userRole != '') {
    thisRole = {
      role: app.globalData.userRole,
      roleName: app.globalData.userRoleName,
      privilege: app.globalData.userPrivilege
    }
    return thisRole
  } else {
    var openid = await getOpenid()
    const db = wx.cloud.database()
    await db.collection('user').where({
      _openid: openid
    }).get().then(res => {
      if(res.data.length == 0) {
        thisRole = ROLE[0]
      } else {
        thisRole = {
          role: res.data[0].role,
          roleName: res.data[0].roleName,
          privilege: res.data[0].privilege
        }
      }
    })
    app.globalData.userRole = thisRole.role
    app.globalData.userRoleName = thisRole.roleName
    app.globalData.userPrivilege = thisRole.privilege
    return thisRole
  }
}

export const checkPrivilege = async function(privilege) {
  var thisRole = await getRole()
  for(var i = 0; i < thisRole.privilege.length; i ++) {
    if(thisRole.privilege[i] == privilege) {
      return 1
    }
  }
  return 0
}

export const showPrivilege = function(thisRole) {
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

